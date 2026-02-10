import { NextRequest, NextResponse } from "next/server";
import { buildSdkParams, getRuleId, isUiRule, UI_RULES } from "@/lib/zk";
import { z } from "zod";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 32_000;
const JSON_HEADERS = {
  "Content-Type": "application/json",
};
const NON_ELIGIBLE_REASONS = new Set([
  "PROOF_OUTPUT_FALSE",
  "NO_ACTIVITY",
  "PARAM_OUT_OF_RANGE",
]);
const BAD_INPUT_REASONS = new Set(["INVALID_WALLET", "INVALID_PARAMS"]);
const OPERATIONAL_FAILURE_REASONS = new Set([
  "RPC_ERROR",
  "PROOF_GENERATION_FAILED",
  "INTERNAL_ERROR",
]);

function circuitDirFromRule(ruleId: string): string {
  switch (ruleId) {
    case "WALLET_AGE":
      return "walletAge";
    case "MIN_ACTIVITY":
      return "minActivity";
    case "COOLDOWN":
      return "cooldown";
    case "TOKEN_HOLD":
      return "tokenHold";
    case "ACTIVITY_CLASS":
      return "activityClass";
    default:
      return "";
  }
}

function getSdkDiagnostics(ruleId: string) {
  try {
    const entryPath = require.resolve("zk-eligibility-sdk");
    const distRoot = path.resolve(path.dirname(entryPath), "circuits");
    const ruleDir = circuitDirFromRule(ruleId);
    const lower = ruleDir.toLowerCase();

    const manifestPath = path.join(distRoot, "manifest.json");
    const wasmPath = path.join(distRoot, ruleDir, `${lower}_js`, `${lower}.wasm`);
    const zkeyPath = path.join(distRoot, ruleDir, `${lower}_final.zkey`);
    const vkeyPath = path.join(distRoot, ruleDir, "verification_key.json");

    return {
      sdkEntryPath: entryPath,
      manifestExists: fs.existsSync(manifestPath),
      wasmExists: ruleDir ? fs.existsSync(wasmPath) : false,
      zkeyExists: ruleDir ? fs.existsSync(zkeyPath) : false,
      verificationKeyExists: ruleDir ? fs.existsSync(vkeyPath) : false,
      zkWorkDir: process.env.ZK_WORK_DIR || null,
      cwd: process.cwd(),
    };
  } catch (error) {
    return {
      sdkResolveError: error instanceof Error ? error.message : "unknown",
      zkWorkDir: process.env.ZK_WORK_DIR || null,
      cwd: process.cwd(),
    };
  }
}

function getClientIp(request: NextRequest) {
  const platformIp = request.ip;
  if (platformIp) return platformIp;
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

const proveSchema = z.object({
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  rule: z.string(),
  params: z.record(z.string(), z.any()).optional(),
});

async function handleProve(
  ip: string,
  payload: z.infer<typeof proveSchema>
) {
  try {
    try {
      const { getRateLimit } = await import("@/lib/rate-limit");
      const limiter = getRateLimit();
      if (limiter) {
        const { success } = await limiter.limit(`prove:${ip}`);
        if (!success) {
          return NextResponse.json(
            { success: false, error: "Rate limit exceeded. Try again shortly." },
            { status: 429 }
          );
        }
      }
    } catch (rateError) {
      console.error("[v0] Rate-limit initialization error:", rateError);
    }

    const { walletAddress, rule, params } = payload;

    // Validate inputs
    if (!isUiRule(rule)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid rule. Valid rules: ${Object.keys(UI_RULES).join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Validate token address for TOKEN_HOLD rule
    if (rule === "token-hold" && !params?.tokenAddress) {
      return NextResponse.json(
        {
          success: false,
          error: "Token address is required for TOKEN_HOLD",
        },
        { status: 400 }
      );
    }

    if (
      rule === "token-hold" &&
      params?.tokenAddress &&
      !String(params.tokenAddress).match(/^0x[a-fA-F0-9]{40}$/)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid token address format",
        },
        { status: 400 }
      );
    }

    const alchemyKey = process.env.ALCHEMY_API_KEY;
    if (!alchemyKey) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Proof generation is temporarily unavailable. Please try again later.",
        },
        { status: 400 }
      );
    }

    if (!process.env.ZK_WORK_DIR) {
      process.env.ZK_WORK_DIR = "/tmp/zk";
    }

    const ruleId = getRuleId(rule);
    const sdkParams = buildSdkParams(rule, params ?? {});
    const { ZKEligibilitySDK } = await import("zk-eligibility-sdk");

    let lastError: unknown = null;
    let result: Awaited<ReturnType<typeof ZKEligibilitySDK.prove>> | null = null;

    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        result = await ZKEligibilitySDK.prove(ruleId, walletAddress, sdkParams);
        break;
      } catch (sdkError) {
        lastError = sdkError;
        if (attempt < 3) {
          await new Promise((resolve) => setTimeout(resolve, 350 * attempt));
        }
      }
    }

    if (!result) {
      throw lastError instanceof Error
        ? lastError
        : new Error("Proof generation failed after retries");
    }

    const reasonCode = result?.isValid ? undefined : String(result?.reason ?? "");
    const hasValidResult = !!result && result.isValid === true;
    let isValid = hasValidResult;
    let classId: number | undefined;
    let errorMessage: string | undefined;

    if (hasValidResult && ruleId === "ACTIVITY_CLASS") {
      classId = (result as { classId?: number }).classId;
      const minActivityClassRaw = params?.minActivityClass;
      const minActivityClass = Number.parseInt(
        String(minActivityClassRaw ?? ""),
        10
      );

      if (Number.isFinite(minActivityClass) && classId !== undefined) {
        isValid = classId >= minActivityClass;
        if (!isValid) {
          errorMessage = `Wallet activity class ${classId} is below required ${minActivityClass}.`;
        }
      }
    }

    if (!hasValidResult) {
      errorMessage = reasonCode || "Proof generation failed";
    }

    if (!hasValidResult && reasonCode && BAD_INPUT_REASONS.has(reasonCode)) {
      return NextResponse.json(
        {
          success: false,
          isValid: false,
          error: errorMessage,
          reasonCode,
        },
        { status: 400 }
      );
    }

    if (
      !hasValidResult &&
      reasonCode &&
      OPERATIONAL_FAILURE_REASONS.has(reasonCode)
    ) {
      const diagnostics =
        reasonCode === "PROOF_GENERATION_FAILED"
          ? getSdkDiagnostics(ruleId)
          : undefined;
      return NextResponse.json(
        {
          success: false,
          isValid: false,
          error: errorMessage,
          reasonCode,
          diagnostics,
        },
        { status: 503 }
      );
    }

    if (!hasValidResult && reasonCode && !NON_ELIGIBLE_REASONS.has(reasonCode)) {
      return NextResponse.json(
        {
          success: false,
          isValid: false,
          error: errorMessage || "Proof generation failed",
          reasonCode,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      isValid,
      isSimulated: false,
      error: errorMessage,
      reasonCode: hasValidResult ? undefined : reasonCode,
      proof: {
        isValid,
        proof: hasValidResult ? result.proof : null,
        publicSignals: hasValidResult ? result.publicSignals : null,
        rule: ruleId,
        ruleId,
        classId,
        timestamp: new Date().toISOString(),
        walletAddress,
      },
    });
  } catch (error) {
    console.error("[v0] Proof generation error:", error);
    const message =
      error instanceof Error
        ? error.message
        : (error as { code?: string; error?: { message?: string } })?.error
            ?.message ||
          (error as { code?: string })?.code ||
          "Unknown error";
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 503 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength && contentLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { success: false, error: "Request too large." },
        { status: 413 }
      );
    }

    const body = await request.json();
    const parsed = proveSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid request payload" },
        { status: 400 }
      );
    }

    return handleProve(getClientIp(request), parsed.data);
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams;
  let params: Record<string, unknown> = {};

  try {
    const rawParams = search.get("params");
    if (rawParams) {
      params = JSON.parse(rawParams) as Record<string, unknown>;
    }
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid params encoding" },
      { status: 400 }
    );
  }

  const parsed = proveSchema.safeParse({
    walletAddress: search.get("walletAddress") ?? "",
    rule: search.get("rule") ?? "",
    params,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Invalid request payload" },
      { status: 400 }
    );
  }

  return handleProve(getClientIp(request), parsed.data);
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      ...JSON_HEADERS,
      Allow: "GET, POST, OPTIONS",
    },
  });
}

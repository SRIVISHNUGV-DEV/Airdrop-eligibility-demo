import { NextRequest, NextResponse } from "next/server";
import { ZKEligibilitySDK } from "zk-eligibility-sdk";
import { buildSdkParams, getRuleId, isUiRule, UI_RULES } from "@/lib/zk";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 32_000;

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

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const { success } = await rateLimit.limit(`prove:${ip}`);
    if (!success) {
      return NextResponse.json(
        { success: false, error: "Rate limit exceeded. Try again shortly." },
        { status: 429 }
      );
    }

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

    const { walletAddress, rule, params } = parsed.data;

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

    const ruleId = getRuleId(rule);
    const sdkParams = buildSdkParams(rule, params ?? {});

    const result = await ZKEligibilitySDK.prove(
      ruleId,
      walletAddress,
      sdkParams
    );

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
      errorMessage = result?.reason || "Proof generation failed";
    }

    return NextResponse.json({
      success: true,
      isValid,
      isSimulated: false,
      error: errorMessage,
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
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

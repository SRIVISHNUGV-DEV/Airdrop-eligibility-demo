import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 64_000;
const JSON_HEADERS = {
  "Content-Type": "application/json",
};

function getClientIp(request: NextRequest) {
  const platformIp = request.ip;
  if (platformIp) return platformIp;
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

const verifySchema = z.object({
  rule: z.string(),
  proof: z.any(),
  publicSignals: z.any().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    try {
      const { getRateLimit } = await import("@/lib/rate-limit");
      const limiter = getRateLimit();
      if (limiter) {
        const { success } = await limiter.limit(`verify:${ip}`);
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

    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength && contentLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { success: false, error: "Request too large." },
        { status: 413 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, verified: false, error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const parsed = verifySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid request payload" },
        { status: 400 }
      );
    }

    const { proof, rule, publicSignals } = parsed.data;

    // Validate proof structure
    const signals = publicSignals ?? proof?.publicSignals ?? proof?.signals;
    if (!proof || !signals) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          error: "Invalid proof structure",
        },
        { status: 400 }
      );
    }

    const { verifyProof } = await import("zk-eligibility-sdk");
    const verifyResult = await verifyProof(
      rule,
      proof.proof ?? proof,
      signals
    );
    const isVerified = verifyResult.isValid === true;

    return NextResponse.json({
      success: true,
      verified: isVerified,
      rule,
      timestamp: new Date().toISOString(),
      message: isVerified
        ? "Proof is cryptographically valid"
        : "Proof verification failed",
    });
  } catch (error) {
    console.error("[v0] Verification error:", error);
    return NextResponse.json(
      {
        success: false,
        verified: false,
        error:
          error instanceof Error ? error.message : "Verification failed",
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      ...JSON_HEADERS,
      Allow: "POST, OPTIONS",
    },
  });
}

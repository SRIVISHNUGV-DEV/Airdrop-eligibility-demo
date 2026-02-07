import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const hasAlchemy = Boolean(process.env.ALCHEMY_API_KEY);
  const hasUpstash =
    Boolean(process.env.UPSTASH_REDIS_REST_URL) &&
    Boolean(process.env.UPSTASH_REDIS_REST_TOKEN);
  const commitSha = process.env.VERCEL_GIT_COMMIT_SHA || null;
  const envName = process.env.VERCEL_ENV || process.env.NODE_ENV || "unknown";

  return NextResponse.json(
    {
      ok: true,
      envName,
      commitSha,
      env: {
        alchemy: hasAlchemy,
        upstash: hasUpstash,
      },
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}

import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const hasAlchemy = Boolean(process.env.ALCHEMY_API_KEY);
  const hasUpstash =
    Boolean(process.env.UPSTASH_REDIS_REST_URL) &&
    Boolean(process.env.UPSTASH_REDIS_REST_TOKEN);

  return NextResponse.json(
    {
      ok: true,
      env: {
        alchemy: hasAlchemy,
        upstash: hasUpstash,
      },
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}

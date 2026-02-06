import { NextResponse } from "next/server";

export async function GET() {
  const rules = [
    {
      id: "WALLET_AGE",
      name: "Wallet Age",
      description: "Prove wallet existed before a specific block",
      useCase: "Sybil resistance, legacy user access, loyalty tiers",
      privacy: "Exact age hidden, only proves eligibility",
      params: [
        {
          name: "thresholdBlock",
          type: "number",
          description: "Wallet's first outbound transaction must be before this block",
          default: 18000000,
        },
      ],
    },
    {
      id: "MIN_ACTIVITY",
      name: "Minimum Activity",
      description: "Prove at least N outbound transactions",
      useCase: "Active user filtering, engagement gates, bot detection",
      privacy: "Exact count hidden, only proves threshold",
      params: [
        {
          name: "minTx",
          type: "number",
          description: "Minimum number of transactions",
          default: 10,
        },
      ],
    },
    {
      id: "COOLDOWN",
      name: "Cooldown Period",
      description: "Prove inactive for N+ blocks",
      useCase: "Rate limiting, anti-spam, sequential access control",
      privacy: "Last activity block hidden",
      params: [
        {
          name: "cooldownBlocks",
          type: "number",
          description: "Minimum blocks since last outbound activity",
          default: 100000,
        },
      ],
    },
    {
      id: "TOKEN_HOLD",
      name: "Token Hold Duration",
      description: "Prove held token X for N+ blocks",
      useCase: "Holder privileges, loyalty programs, time-weighted access",
      privacy: "Balances and transfer history hidden",
      params: [
        {
          name: "tokenAddress",
          type: "address",
          description: "ERC-20 token contract address",
          default: "0x0000000000000000000000000000000000000000",
        },
        {
          name: "minHoldBlocks",
          type: "number",
          description: "Minimum token hold duration in blocks",
          default: 1000,
        },
      ],
    },
    {
      id: "ACTIVITY_CLASS",
      name: "Activity Classification",
      description: "Prove wallet falls into activity band (0-3)",
      useCase: "Fair distribution, tier-based rewards, heuristic filtering",
      privacy: "Exact metrics hidden, only rough band revealed",
      params: [],
    },
  ];

  return NextResponse.json({ rules });
}

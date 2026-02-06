import type { RuleId } from "zk-eligibility-sdk";

export type UIRule =
  | "wallet-age"
  | "min-activity"
  | "cooldown"
  | "token-hold"
  | "activity-class";

export type ParamSpec = {
  name: string;
  label: string;
  placeholder: string;
};

export const UI_RULES: Record<
  UIRule,
  {
    id: RuleId;
    name: string;
    params: ParamSpec[];
    requiresTokenAddress?: boolean;
  }
> = {
  "wallet-age": {
    id: "WALLET_AGE",
    name: "Wallet Age",
    params: [
      {
        name: "thresholdBlock",
        label: "Threshold Block",
        placeholder: "18000000",
      },
    ],
  },
  "min-activity": {
    id: "MIN_ACTIVITY",
    name: "Minimum Activity",
    params: [
      {
        name: "minTx",
        label: "Minimum Transactions",
        placeholder: "10",
      },
    ],
  },
  cooldown: {
    id: "COOLDOWN",
    name: "Cooldown Period",
    params: [
      {
        name: "cooldownBlocks",
        label: "Cooldown Blocks",
        placeholder: "100000",
      },
    ],
  },
  "token-hold": {
    id: "TOKEN_HOLD",
    name: "Token Hold Duration",
    params: [
      {
        name: "minHoldBlocks",
        label: "Min Hold Blocks",
        placeholder: "1000",
      },
    ],
    requiresTokenAddress: true,
  },
  "activity-class": {
    id: "ACTIVITY_CLASS",
    name: "Activity Classification",
    params: [
      {
        name: "minActivityClass",
        label: "Min Activity Class (0-3)",
        placeholder: "1",
      },
    ],
  },
};

export function isUiRule(rule: string): rule is UIRule {
  return Object.prototype.hasOwnProperty.call(UI_RULES, rule);
}

function toInt(value: unknown, fallback: number) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(0, parsed);
}

export function getRuleId(rule: UIRule): RuleId {
  return UI_RULES[rule].id;
}

export function buildSdkParams(rule: UIRule, params: Record<string, any>) {
  switch (rule) {
    case "wallet-age": {
      const thresholdBlock = toInt(
        params?.thresholdBlock ?? params?.minBlocksAge,
        18_000_000
      );
      return { thresholdBlock };
    }
    case "min-activity": {
      const minTx = toInt(params?.minTx ?? params?.minTransactions, 10);
      return { minTx };
    }
    case "cooldown": {
      const cooldownBlocks = toInt(
        params?.cooldownBlocks ?? params?.lastActivityMaxAge,
        100_000
      );
      return { cooldownBlocks };
    }
    case "token-hold": {
      const tokenAddress = String(params?.tokenAddress ?? "");
      const minHoldBlocks = toInt(params?.minHoldBlocks, 1000);
      return { tokenAddress, minHoldBlocks };
    }
    case "activity-class":
      return undefined;
    default:
      return undefined;
  }
}

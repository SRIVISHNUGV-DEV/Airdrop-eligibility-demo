"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, XCircle, Loader2, Lock, Copy, Check } from "lucide-react";
import { ZKLogo } from "@/components/zk-logo";
import { ClickSpark, StarBorder, CryptoPulse } from "@/components/reactbits-lite";

type EligibilityRule =
  | "wallet-age"
  | "min-activity"
  | "cooldown"
  | "token-hold"
  | "activity-class";

interface RuleConfig {
  label: string;
  sdkRule: string;
  description: string;
  useCase: string;
  privacy: string;
  params: { name: string; label: string; placeholder: string; sdkName: string }[];
}

const ruleConfigs: Record<EligibilityRule, RuleConfig> = {
  "wallet-age": {
    label: "Wallet Age",
    sdkRule: "WALLET_AGE",
    description: "Prove wallet existed before a specific block",
    useCase: "Sybil resistance, legacy user access, loyalty tiers",
    privacy: "Exact age hidden, only proves eligibility",
    params: [{ name: "thresholdBlock", label: "Threshold Block", placeholder: "18000000", sdkName: "thresholdBlock" }],
  },
  "min-activity": {
    label: "Min Activity",
    sdkRule: "MIN_ACTIVITY",
    description: "Prove at least N outbound transactions",
    useCase: "Active user filtering, engagement gates, bot detection",
    privacy: "Exact count hidden, only proves threshold",
    params: [
      { name: "minTx", label: "Minimum Transactions", placeholder: "10", sdkName: "minTx" },
    ],
  },
  cooldown: {
    label: "Cooldown Period",
    sdkRule: "COOLDOWN",
    description: "Prove inactive for N+ blocks",
    useCase: "Rate limiting, anti-spam, sequential access control",
    privacy: "Last activity block hidden",
    params: [{ name: "cooldownBlocks", label: "Cooldown Blocks", placeholder: "100000", sdkName: "cooldownBlocks" }],
  },
  "token-hold": {
    label: "Token Hold Duration",
    sdkRule: "TOKEN_HOLD",
    description: "Prove held token for N+ blocks",
    useCase: "Holder privileges, loyalty programs, time-weighted access",
    privacy: "Balances and transfer history hidden",
    params: [
      { name: "minHoldBlocks", label: "Min Hold Blocks", placeholder: "1000", sdkName: "minHoldBlocks" },
    ],
  },
  "activity-class": {
    label: "Activity Classification",
    sdkRule: "ACTIVITY_CLASS",
    description: "Prove wallet falls into activity band (0-3)",
    useCase: "Fair distribution, tier-based rewards, heuristic filtering",
    privacy: "Exact metrics hidden, only rough band revealed",
    params: [
      { name: "minActivityClass", label: "Min Activity Class (0-3)", placeholder: "1", sdkName: "minActivityClass" },
    ],
  },
};

type ProofStatus = "idle" | "generating" | "success" | "failure";

interface ProofResult {
  isValid: boolean;
  proof: any;
  publicSignals: any;
  rule: string;
  ruleId?: string;
  timestamp: string;
  walletAddress: string;
  classId?: number;
}

export function ZKDemo() {
  const [walletAddress, setWalletAddress] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [selectedRule, setSelectedRule] = useState<EligibilityRule>("wallet-age");
  const [params, setParams] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<ProofStatus>("idle");
  const [proofResult, setProofResult] = useState<ProofResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [isSimulated, setIsSimulated] = useState(false);

  const currentConfig = ruleConfigs[selectedRule];

  const handleParamChange = (name: string, value: string) => {
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  const copyProof = async () => {
    if (proofResult) {
      await navigator.clipboard.writeText(JSON.stringify(proofResult, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const generateProof = async () => {
    if (!walletAddress) return;

    // Validate wallet address format
    if (!walletAddress.startsWith("0x") || walletAddress.length !== 42) {
      setStatus("failure");
      setErrorMessage("Invalid wallet address format. Please enter a valid Ethereum address starting with 0x (42 characters).");
      return;
    }

    // Validate token address for token-hold rule
    if (selectedRule === "token-hold" && (!tokenAddress || !tokenAddress.startsWith("0x") || tokenAddress.length !== 42)) {
      setStatus("failure");
      setErrorMessage("Invalid token address format. Please enter a valid ERC-20 token contract address.");
      return;
    }

    setStatus("generating");
    setProofResult(null);
    setErrorMessage("");
    setIsSimulated(false);

    try {
      // Build params for API call
      const apiParams = { ...params };
      if (selectedRule === "token-hold") {
        apiParams.tokenAddress = tokenAddress;
      }

      const response = await fetch("/api/prove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rule: selectedRule,
          walletAddress,
          params: apiParams,
        }),
      });

      const contentType = response.headers.get("content-type") || "";
      const rawBody = await response.text();
      let data: any = null;
      if (contentType.includes("application/json")) {
        data = JSON.parse(rawBody);
      } else {
        throw new Error(
          `Non-JSON response (${response.status}). ${rawBody.slice(0, 200)}`
        );
      }

      if (data.success) {
        setProofResult(data.proof);
        setIsSimulated(data.isSimulated || false);
        if (data.isValid) {
          setStatus("success");
        } else {
          setStatus("failure");
          setErrorMessage(
            data.error || "Wallet does not meet eligibility criteria for this rule."
          );
        }
      } else {
        setStatus("failure");
        setErrorMessage(
          data.error || "Wallet does not meet eligibility criteria for this rule."
        );
      }
    } catch (error) {
      setStatus("failure");
      setErrorMessage(error instanceof Error ? error.message : "Failed to generate proof. Please try again.");
    }
  };

  const reset = () => {
    setStatus("idle");
    setProofResult(null);
    setErrorMessage("");
    setIsSimulated(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl opacity-50" />

        <StarBorder color="hsl(var(--primary))" speed="7s">
          <div className="relative bg-card border border-border rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ZKLogo size={20} />
            </div>
            <div>
              <CryptoPulse>
                <h3 className="font-semibold text-foreground">ZK Proof Generator</h3>
              </CryptoPulse>
              <p className="text-sm text-muted-foreground">
                Generate cryptographic proofs for wallet eligibility
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Wallet Address Input */}
            <div className="space-y-2">
              <Label htmlFor="wallet" className="text-sm text-muted-foreground">
                Wallet Address
              </Label>
              <Input
                id="wallet"
                placeholder="0x..."
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="bg-input border-border focus:border-primary focus:ring-primary/20 font-mono text-sm"
              />
            </div>

            {/* Rule Selection */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">
                Eligibility Rule
              </Label>
              <Select
                value={selectedRule}
                onValueChange={(val) => {
                  setSelectedRule(val as EligibilityRule);
                  setParams({});
                  setTokenAddress("");
                  reset();
                }}
              >
                <SelectTrigger className="bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(ruleConfigs).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  {currentConfig.description}
                </p>
                <p className="text-xs text-primary/70">
                  Use case: {currentConfig.useCase}
                </p>
                <p className="text-xs text-accent/70">
                  Privacy: {currentConfig.privacy}
                </p>
              </div>
            </div>

            {/* Token Address Input - Only for Token Hold rule */}
            {selectedRule === "token-hold" && (
              <div className="space-y-2">
                <Label htmlFor="token" className="text-sm text-muted-foreground">
                  Token Contract Address
                </Label>
                <Input
                  id="token"
                  placeholder="0x... (ERC-20 token address)"
                  value={tokenAddress}
                  onChange={(e) => setTokenAddress(e.target.value)}
                  className="bg-input border-border focus:border-primary focus:ring-primary/20 font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Enter the contract address of the token to verify holdings
                </p>
              </div>
            )}

            {/* Dynamic Parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentConfig.params.map((param) => (
                <div key={param.name} className="space-y-2">
                  <Label
                    htmlFor={param.name}
                    className="text-sm text-muted-foreground"
                  >
                    {param.label}
                  </Label>
                  <Input
                    id={param.name}
                    type="number"
                    placeholder={param.placeholder}
                    value={params[param.name] || ""}
                    onChange={(e) => handleParamChange(param.name, e.target.value)}
                    className="bg-input border-border focus:border-primary"
                  />
                </div>
              ))}
            </div>

            {/* Generate Button */}
            <ClickSpark sparkColor="hsl(var(--primary))" sparkCount={12}>
              <Button
                onClick={status === "idle" || status === "failure" ? generateProof : reset}
                disabled={status === "generating" || !walletAddress}
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-medium h-11"
              >
                {status === "generating" ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating ZK Proof...
                  </>
                ) : status === "success" || status === "failure" ? (
                  "Generate New Proof"
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Generate Proof
                  </>
                )}
              </Button>
            </ClickSpark>

            {/* Result Display */}
            {status === "generating" && (
              <div className="mt-6 p-4 bg-secondary/50 rounded-xl border border-border">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      Computing ZK Circuit...
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Generating Groth16 proof without revealing wallet data
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    Fetching blockchain data via RPC
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
                    Computing witness
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-2 h-2 bg-primary/70 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
                    Generating cryptographic proof
                  </div>
                </div>
              </div>
            )}

            {(status === "success" || status === "failure") && proofResult && (
              <div className="mt-6 space-y-4">
                {isSimulated && (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                    <p className="text-xs text-amber-400">
                      <strong>Simulation Mode:</strong> Proof generation is currently in demo mode.
                    </p>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div
                    className={`flex items-center gap-2 ${
                      proofResult.isValid ? "text-emerald-400" : "text-destructive"
                    }`}
                  >
                    {proofResult.isValid ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <XCircle className="w-5 h-5" />
                    )}
                    <span className="font-medium">
                      {proofResult.isValid
                        ? isSimulated
                          ? "Simulated Proof Generated"
                          : "Proof Generated Successfully"
                        : "Proof Generated (Not Eligible)"}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyProof}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <div className="p-4 bg-secondary/50 rounded-xl border border-border space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">isValid</p>
                    <p className="font-mono text-xs text-foreground">
                      {String(proofResult.isValid)}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Rule</p>
                      <p className="font-mono text-xs text-foreground">
                        {proofResult.rule}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Timestamp</p>
                      <p className="font-mono text-xs text-foreground">
                        {new Date(proofResult.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  {typeof proofResult.classId === "number" && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Activity Class</p>
                      <p className="font-mono text-xs text-foreground">
                        {proofResult.classId}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Proof</p>
                    <pre className="font-mono text-xs text-foreground whitespace-pre-wrap break-all">
                      {JSON.stringify(proofResult.proof, null, 2)}
                    </pre>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Public Signals</p>
                    <pre className="font-mono text-xs text-foreground whitespace-pre-wrap break-all">
                      {JSON.stringify(proofResult.publicSignals, null, 2)}
                    </pre>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-emerald-400/80">
                      This proof can be verified on-chain or off-chain using the Groth16 verifier.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {status === "failure" && (
              <div className="mt-6 p-4 bg-destructive/10 rounded-xl border border-destructive/20">
                <div className="flex items-center gap-2 text-destructive">
                  <XCircle className="w-5 h-5" />
                  <span className="font-medium">Proof Generation Failed</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {errorMessage}
                </p>
              </div>
            )}
          </div>
          </div>
        </StarBorder>
      </div>
    </div>
  );
}

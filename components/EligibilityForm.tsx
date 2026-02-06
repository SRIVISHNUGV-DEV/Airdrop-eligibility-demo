"use client";

import { useState } from "react";

export default function EligibilityForm() {
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function runProof() {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/prove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        walletAddress: wallet,
        rule: "wallet-age",
        params: { thresholdBlock: 18000000 }
      })
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div className="max-w-md space-y-4">
      <input
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        placeholder="Wallet address"
        className="border p-2 w-full"
      />

      <button
        onClick={runProof}
        disabled={loading}
        className="bg-black text-white px-4 py-2 w-full"
      >
        {loading ? "Proving..." : "Check Eligibility"}
      </button>

      {result && (
        <pre className="bg-gray-100 p-3 text-sm">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}

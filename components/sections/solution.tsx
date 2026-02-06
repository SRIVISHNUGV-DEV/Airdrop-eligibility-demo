import { Lock, Zap } from "lucide-react";
import { ZKLogo } from "@/components/zk-logo";

export function SolutionSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <ZKLogo size={16} />
            <span className="text-sm text-primary font-medium">The Solution</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Zero-knowledge proofs verify eligibility without revealing wallet
            history
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Prove what matters without exposing sensitive data. Our ZK circuits
            enable trustless verification with complete privacy.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-b from-card to-card/50 border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Complete Privacy
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Wallet history stays private. Only the eligibility proof is
              shared, protecting sensitive transaction data.
            </p>
          </div>

          <div className="bg-gradient-to-b from-card to-card/50 border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Fast Verification
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Sub-second proof verification on-chain. No complex computations
              required from verifiers, keeping gas costs minimal.
            </p>
          </div>

          <div className="bg-gradient-to-b from-card to-card/50 border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <ZKLogo size={24} />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Sybil Resistant
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Nullifiers prevent double-claiming. Each wallet can only generate
              one valid proof per airdrop campaign.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Users, Eye, AlertTriangle } from "lucide-react";

export function ProblemSection() {
  return (
    <section className="py-20 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Traditional airdrops lose millions to sybil attacks
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Farmers create thousands of wallets to exploit eligibility criteria,
            while legitimate users lose out on fair distribution.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-destructive" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Sybil Attacks
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Bad actors create thousands of fake wallets to claim multiple
              airdrops, diluting rewards for genuine community members.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-destructive" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Privacy Exposure
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Current verification methods require exposing complete wallet
              history, creating security risks and privacy concerns.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Lost Value
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Projects lose millions in token value to farmers, while community
              trust erodes from unfair distribution outcomes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

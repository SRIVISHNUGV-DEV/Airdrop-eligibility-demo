import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProblemSection } from "@/components/sections/problem";
import { CTASection } from "@/components/sections/cta";
import { Users, Eye, AlertTriangle, TrendingDown, Skull, Ban } from "lucide-react";

export default function ProblemPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-destructive/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-destructive/10 to-primary/10 rounded-full blur-3xl opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6 text-balance">
              The Airdrop{" "}
              <span className="text-destructive">Problem</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
              Sybil attacks have cost Web3 projects hundreds of millions in unfair
              token distributions, eroding community trust.
            </p>
          </div>
        </div>
      </section>

      <ProblemSection />

      {/* Extended Problem Details */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The Real Cost of Sybil Attacks
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Beyond financial losses, sybil attacks damage the entire ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center mb-4">
                <TrendingDown className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Price Dumps
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Farmers immediately sell tokens, crashing prices and hurting
                long-term holders who believed in the project.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center mb-4">
                <Skull className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Dead Communities
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                When fake accounts dominate, genuine community members leave,
                killing organic growth and engagement.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center mb-4">
                <Ban className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Regulatory Risk
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Token concentration in few hands raises regulatory concerns and
                can trigger compliance issues.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Unfair Distribution
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Loyal community members receive diluted rewards while farmers
                walk away with disproportionate shares.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Privacy Violations
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Current anti-sybil methods require exposing wallet history,
                creating honeypots for hackers.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Trust Erosion
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Failed airdrops damage the reputation of legitimate projects and
                make users skeptical of future launches.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}

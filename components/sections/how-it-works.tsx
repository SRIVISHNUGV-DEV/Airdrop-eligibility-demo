import { Database, Cpu, FileCheck, ArrowRight } from "lucide-react";

export function HowItWorksSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to verify wallet eligibility with complete privacy
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="relative">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-2xl flex items-center justify-center mb-6">
                <Database className="w-10 h-10 text-primary" />
              </div>
              <div className="absolute top-10 -right-4 hidden md:block">
                <ArrowRight className="w-8 h-8 text-border" />
              </div>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
                Step 1
              </span>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Wallet Data
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your wallet data is fetched locally and never leaves your device.
                All computation happens client-side.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 rounded-2xl flex items-center justify-center mb-6">
                <Cpu className="w-10 h-10 text-accent" />
              </div>
              <div className="absolute top-10 -right-4 hidden md:block">
                <ArrowRight className="w-8 h-8 text-border" />
              </div>
              <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full mb-3">
                Step 2
              </span>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                ZK Circuit
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Our ZK circuit processes your data and generates a cryptographic
                proof of eligibility without exposing details.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 rounded-2xl flex items-center justify-center mb-6">
                <FileCheck className="w-10 h-10 text-primary" />
              </div>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
                Step 3
              </span>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Cryptographic Proof
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Submit the proof on-chain. Verifiers confirm eligibility without
                ever seeing your wallet history.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

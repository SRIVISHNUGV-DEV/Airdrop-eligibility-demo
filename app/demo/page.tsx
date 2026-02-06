import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ZKDemo } from "@/components/zk-demo";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { CTASection } from "@/components/sections/cta";
import { Cpu } from "lucide-react";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-3xl opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-8">
              <Cpu className="w-4 h-4 text-accent" />
              <span className="text-sm text-accent font-medium">
                Interactive Demo
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6 text-balance">
              Try It{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Yourself
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
              Enter a wallet address and select an eligibility rule to generate
              a zero-knowledge proof in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ZKDemo />
        </div>
      </section>

      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
}

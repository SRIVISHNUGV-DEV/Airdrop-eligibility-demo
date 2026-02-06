import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/gvsrivishnu/30min";

export function CTASection() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-3xl opacity-30" />

          <div className="relative bg-card border border-border rounded-3xl p-8 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Ready to protect your airdrop?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
              Join leading Web3 projects using zero-knowledge proofs to ensure
              fair token distribution while preserving user privacy.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-medium px-10 h-12"
            >
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Book a Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

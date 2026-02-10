import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/gvsrivishnu/30min";

export function PricingSection() {
  return (
    <section className="py-20 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pricing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Flexible plans for projects of all sizes. Start protecting your
            airdrop today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Starter */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Starter
              </h3>
              <p className="text-sm text-muted-foreground">
                For early-stage projects
              </p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-foreground">$500</span>
              <span className="text-muted-foreground ml-2">one-time</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary shrink-0" />
                Up to 10,000 proofs
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary shrink-0" />
                Core eligibility rules
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary shrink-0" />
                SDK + CLI support
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary shrink-0" />
                Email support
              </li>
            </ul>
            <Button
              asChild
              variant="outline"
              className="w-full border-border hover:bg-secondary/50 bg-transparent"
            >
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Get Started
              </a>
            </Button>
          </div>

          {/* Growth */}
          <div className="relative bg-gradient-to-b from-card to-card/50 border-2 border-primary rounded-2xl p-8">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                Popular
              </span>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Growth
              </h3>
              <p className="text-sm text-muted-foreground">
                For scaling projects
              </p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-foreground">$2.5k</span>
              <span className="text-muted-foreground ml-2">one-time</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary shrink-0" />
                Up to 100,000 proofs
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary shrink-0" />
                All eligibility rules
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary shrink-0" />
                Priority support
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary shrink-0" />
                Advanced analytics
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary shrink-0" />
                Custom branding
              </li>
            </ul>
            <Button
              asChild
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
            >
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Get Started
              </a>
            </Button>
          </div>

          {/* Enterprise */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Enterprise
              </h3>
              <p className="text-sm text-muted-foreground">
                For large-scale launches
              </p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-foreground">Custom</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary shrink-0" />
                Unlimited proofs
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary shrink-0" />
                Custom rules & circuits
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary shrink-0" />
                Dedicated support
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary shrink-0" />
                SLA guarantee
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary shrink-0" />
                On-premise deployment
              </li>
            </ul>
            <Button
              asChild
              variant="outline"
              className="w-full border-border hover:bg-secondary/50 bg-transparent"
            >
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Contact Sales
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

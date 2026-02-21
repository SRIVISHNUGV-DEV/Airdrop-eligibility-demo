import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PricingSection } from "@/components/sections/pricing";
import { CTASection } from "@/components/sections/cta";
import { Check, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What counts as a proof?",
    answer:
      "Each time a wallet generates a ZK proof to verify eligibility, it counts as one proof. Proofs are used once per wallet per campaign.",
  },
  {
    question: "Can I upgrade my plan later?",
    answer:
      "Yes, you can upgrade at any time. We'll prorate your existing plan and apply the difference to your new plan.",
  },
  {
    question: "What eligibility rules are included?",
    answer:
      "SDK includes Wallet Age, Min Activity, and Cooldown. Growth and Enterprise include Token Hold and Activity Class as well.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "We offer a testnet demo environment where you can test proof generation. Contact us for access.",
  },
  {
    question: "How long does integration take?",
    answer:
      "Most teams integrate within 1-2 hours using our SDK. Enterprise customers receive dedicated integration support.",
  },
  {
    question: "What chains do you support?",
    answer:
      "We support Ethereum mainnet, Polygon, Arbitrum, Optimism, Base, and other major EVM-compatible chains.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6 text-balance">
              Simple, Transparent{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
              Choose the plan that fits your project. All plans include core ZK
              verification features.
            </p>
          </div>
        </div>
      </section>

      <PricingSection />

      {/* Feature Comparison */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Feature Comparison
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All the details to help you choose the right plan
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-foreground font-semibold">
                    Feature
                  </th>
                  <th className="text-center py-4 px-4 text-foreground font-semibold">
                    Starter
                  </th>
                  <th className="text-center py-4 px-4 text-foreground font-semibold">
                    Growth
                  </th>
                  <th className="text-center py-4 px-4 text-foreground font-semibold">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-border/50">
                  <td className="py-4 px-4 text-muted-foreground">
                    Proof Limit
                  </td>
                  <td className="py-4 px-4 text-center text-foreground">
                    10,000
                  </td>
                  <td className="py-4 px-4 text-center text-foreground">
                    100,000
                  </td>
                  <td className="py-4 px-4 text-center text-foreground">
                    Unlimited
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-4 px-4 text-muted-foreground">
                    Eligibility Rules
                  </td>
                  <td className="py-4 px-4 text-center text-foreground">3</td>
                  <td className="py-4 px-4 text-center text-foreground">5</td>
                  <td className="py-4 px-4 text-center text-foreground">
                    Custom
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-4 px-4 text-muted-foreground">Support</td>
                  <td className="py-4 px-4 text-center text-foreground">
                    Email
                  </td>
                  <td className="py-4 px-4 text-center text-foreground">
                    Priority
                  </td>
                  <td className="py-4 px-4 text-center text-foreground">
                    Dedicated
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-4 px-4 text-muted-foreground">Analytics</td>
                  <td className="py-4 px-4 text-center text-foreground">
                    Basic
                  </td>
                  <td className="py-4 px-4 text-center text-foreground">
                    Advanced
                  </td>
                  <td className="py-4 px-4 text-center text-foreground">
                    Custom
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-4 px-4 text-muted-foreground">
                    Custom Branding
                  </td>
                  <td className="py-4 px-4 text-center">-</td>
                  <td className="py-4 px-4 text-center">
                    <Check className="w-5 h-5 text-primary mx-auto" />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Check className="w-5 h-5 text-primary mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-4 px-4 text-muted-foreground">
                    Custom Circuits
                  </td>
                  <td className="py-4 px-4 text-center">-</td>
                  <td className="py-4 px-4 text-center">-</td>
                  <td className="py-4 px-4 text-center">
                    <Check className="w-5 h-5 text-primary mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-4 px-4 text-muted-foreground">
                    SLA Guarantee
                  </td>
                  <td className="py-4 px-4 text-center">-</td>
                  <td className="py-4 px-4 text-center">-</td>
                  <td className="py-4 px-4 text-center">
                    <Check className="w-5 h-5 text-primary mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-muted-foreground">
                    On-Premise
                  </td>
                  <td className="py-4 px-4 text-center">-</td>
                  <td className="py-4 px-4 text-center">-</td>
                  <td className="py-4 px-4 text-center">
                    <Check className="w-5 h-5 text-primary mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">FAQ</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}

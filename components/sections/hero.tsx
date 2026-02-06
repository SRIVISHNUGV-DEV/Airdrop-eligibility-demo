"use client";

import { Button } from "@/components/ui/button";
import { Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { CryptoPulse, StarBorder } from "@/components/reactbits-lite";

const CALENDLY_URL = "https://calendly.com/gvsrivishnu/30min";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8">
            <Lock className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">
              Zero-Knowledge Proof Technology
            </span>
          </div>

          <CryptoPulse>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-6 text-balance">
              Stop Airdrop Farmers.{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Preserve Privacy.
              </span>
            </h1>
          </CryptoPulse>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
            Cryptographic proof of wallet eligibility. Zero data leakage.
            Verify without revealing sensitive wallet history.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <StarBorder color="hsl(var(--primary))" speed="8s">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-medium px-8 h-12"
              >
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  Book a Demo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </StarBorder>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border hover:bg-secondary/50 h-12 px-8 bg-transparent"
            >
              <Link href="/demo">Try the Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Calendar, Clock, Video } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/gvsrivishnu/30min";

export default function BookDemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">
                Schedule a Call
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6 text-balance">
              Book a{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Demo
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
              See how ZKProof can protect your airdrop from sybil attacks while
              preserving user privacy.
            </p>
          </div>
        </div>
      </section>

      {/* Meeting Info + Calendly */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Info Cards */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  30 Minutes
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  A focused session to understand your needs and show you how
                  our ZK solution works.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                  <Video className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Video Call
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We will meet over Google Meet to discuss your airdrop
                  requirements and demonstrate our platform.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  What to expect
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">1.</span>
                    <span>Understanding your airdrop goals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">2.</span>
                    <span>Live demo of ZK proof generation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">3.</span>
                    <span>Custom eligibility rules discussion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">4.</span>
                    <span>Integration and timeline overview</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Calendly Embed */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-2xl overflow-hidden h-[700px]">
                <iframe
                  src={CALENDLY_URL}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Schedule a demo"
                  className="bg-background"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

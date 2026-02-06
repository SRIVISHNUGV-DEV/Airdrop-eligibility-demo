"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ZKLogo } from "@/components/zk-logo";

const CALENDLY_URL = "https://calendly.com/gvsrivishnu/30min";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-primary/90 to-accent/90 rounded-lg flex items-center justify-center shadow-md shadow-black/20">
              <ZKLogo size={22} priority />
            </div>
            <span className="font-bold text-lg text-foreground">ZKAC</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/problem"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Problem
            </Link>
            <Link
              href="/solution"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Solution
            </Link>
            <Link
              href="/demo"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Demo
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
          </div>
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              Book a Demo
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
}

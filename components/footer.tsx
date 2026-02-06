import Link from "next/link";
import { ZKLogo } from "@/components/zk-logo";

export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <ZKLogo size={20} className="brightness-0 invert" />
            </div>
            <span className="font-bold text-lg text-foreground">ZKProof</span>
          </Link>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/problem" className="hover:text-foreground transition-colors">
              Problem
            </Link>
            <Link href="/solution" className="hover:text-foreground transition-colors">
              Solution
            </Link>
            <Link href="/demo" className="hover:text-foreground transition-colors">
              Demo
            </Link>
            <Link href="/pricing" className="hover:text-foreground transition-colors">
              Pricing
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            2026 ZKProof. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React from "react";

type WrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export function Bounce({ children, className = "" }: WrapperProps) {
  return (
    <div className={`motion-safe:animate-bounce ${className}`}>{children}</div>
  );
}

export function CryptoPulse({ children, className = "" }: WrapperProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="pointer-events-none absolute -inset-x-4 -bottom-3 h-px bg-[linear-gradient(90deg,transparent,rgba(110,231,183,0.0),rgba(110,231,183,0.9),transparent)] animate-[hash_3s_linear_infinite]" />
      <div className="pointer-events-none absolute -inset-x-10 -bottom-6 h-px bg-[linear-gradient(90deg,transparent,rgba(59,130,246,0.0),rgba(59,130,246,0.7),transparent)] animate-[hash_4s_linear_infinite]" />
      <style jsx>{`
        @keyframes hash {
          0% { transform: translateX(-30%); opacity: 0.2; }
          50% { opacity: 1; }
          100% { transform: translateX(30%); opacity: 0.2; }
        }
      `}</style>
      {children}
    </div>
  );
}

type StarBorderProps = WrapperProps & {
  color?: string;
  speed?: string;
};

export function StarBorder({
  children,
  className = "",
  color = "hsl(var(--primary))",
  speed = "8s",
}: StarBorderProps) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="pointer-events-none absolute -inset-1 rounded-2xl blur-sm opacity-60"
        style={{
          background: `conic-gradient(from 90deg, transparent, ${color}, transparent)`,
          animation: `spin ${speed} linear infinite`,
        }}
      />
      <div className="relative rounded-2xl">{children}</div>
    </div>
  );
}

type ClickSparkProps = WrapperProps & {
  sparkColor?: string;
  sparkCount?: number;
};

export function ClickSpark({
  children,
  className = "",
  sparkColor = "hsl(var(--primary))",
}: ClickSparkProps) {
  return (
    <div className={`relative inline-block group ${className}`}>
      <span
        className="pointer-events-none absolute -inset-1 rounded-xl opacity-0 group-active:opacity-100 group-active:animate-ping"
        style={{ backgroundColor: sparkColor }}
      />
      {children}
    </div>
  );
}

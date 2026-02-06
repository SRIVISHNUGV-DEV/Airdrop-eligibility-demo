"use client";

import { useEffect } from "react";

export function ClientErrorSuppressor() {
  useEffect(() => {
    const handler = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      if (
        reason &&
        typeof reason === "object" &&
        (reason.message?.includes("MetaMask") ||
          reason.message?.includes("Failed to connect"))
      ) {
        event.preventDefault();
        console.log(
          "[v0] Suppressed MetaMask connection error - using simulation mode"
        );
      }
    };

    window.addEventListener("unhandledrejection", handler);
    return () => window.removeEventListener("unhandledrejection", handler);
  }, []);

  return null;
}

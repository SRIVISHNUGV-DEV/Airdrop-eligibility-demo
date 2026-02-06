import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ClientErrorSuppressor } from "@/components/client-error-suppressor"

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'ZKProof - Airdrop Eligibility Checker',
  description: 'Cryptographic proof of wallet eligibility with zero data leakage. Stop airdrop farmers and preserve privacy with zero-knowledge proofs.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/zk-logo.png',
      },
    ],
    apple: '/zk-logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
        <Analytics />
        <ClientErrorSuppressor />
      </body>
    </html>
  )
}

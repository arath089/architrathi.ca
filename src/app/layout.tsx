// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import ParticleBackdrop from "@/components/ParticleBackdrop";

import TopNav from "@/components/TopNav";

export const metadata: Metadata = {
  title: "Archit Rathi | Frontend Engineer",
  description:
    "Frontend engineer building fast, accessible, high-converting web experiences with React, TypeScript, and Shopify.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0A1220] text-zinc-100 antialiased selection:bg-cyan-400/20 overflow-x-hidden">
        <ParticleBackdrop
          particleCountDesktop={60000}
          particleCountMobile={24000}
          intensity={0.4}
        />
        <TopNav />
        <main className="relative">{children}</main>
      </body>
    </html>
  );
}

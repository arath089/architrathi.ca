"use client";
import { motion } from "motion/react";

const items = [
  {
    title: "Shopify Architecture",
    body: "Custom themes, Liquid engineering, scalable sections, metafields & metaobjects, and structured content systems built for long-term maintainability.",
  },
  {
    title: "Advanced Frontend Interactions",
    body: "Barba.js transitions, seamless PDP state switching, refined micro-interactions, and elevated UX patterns without sacrificing performance.",
  },
  {
    title: "Performance & Core Web Vitals",
    body: "Lighthouse optimization, advanced image strategies, script orchestration, reduced layout shift, and performance-first storefront builds.",
  },
  {
    title: "Conversion & Revenue Systems",
    body: "Cart optimization, subscription flows, dynamic upsells, A/B testing (Intelligems), and data-driven UI improvements focused on measurable impact.",
  },
  {
    title: "Accessibility & Compliance",
    body: "WCAG-focused semantic refactors, screen reader optimization, audit remediation (AudioEye / a360), and OneTrust consent implementations.",
  },
  {
    title: "Launch & Scale Support",
    body: "High-traffic celebrity launches, bundle systems, international expansion, and complex Shopify implementations built to scale.",
  },
];

export default function WhatIDo() {
  return (
    <section id="shopify" className="max-w-6xl px-4 pb-40 mx-auto pt-84">
      <div className="mb-12">
        <h3 className="text-sm uppercase tracking-[0.2em] text-zinc-400">
          What I do
        </h3>

        <p className="mt-3 text-2xl font-medium leading-snug md:text-3xl">
          I build and scale high-performance Shopify storefronts for ambitious
          DTC brands combining clean architecture, polished UX, and measurable
          business impact.
        </p>
      </div>

      <ul className="grid gap-8 md:grid-cols-2">
        {items.map((it, i) => (
          <motion.li
            key={it.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:bg-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
          >
            {/* subtle glass light reflection */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-60" />

            <div className="relative z-10">
              <h4 className="text-lg font-semibold">{it.title}</h4>
              <p className="mt-3 leading-relaxed text-zinc-300">{it.body}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

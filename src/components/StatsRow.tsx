"use client";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

function useCountUp(to: number, startWhen: boolean, duration = 1200) {
  const [value, set] = useState(0);
  useEffect(() => {
    if (!startWhen) return;
    let raf = 0,
      start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      set(Math.round(to * (1 - Math.pow(1 - p, 3)))); // easeOutCubic
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, startWhen, duration]);
  return value;
}

const items = [
  { to: 5, suffix: "+", label: "years building Shopify UIs" },
  { to: 18, suffix: "+", label: "experiments shipped" },
  { to: 1, suffix: "s", label: "LCP target on PDPs" },
  { to: 6, suffix: "+", label: "flagship brands" },
];

export default function StatsRow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  return (
    <section ref={ref} className="max-w-6xl px-4 pt-10 mx-auto">
      <div className="grid gap-3 md:grid-cols-4">
        {items.map((it, i) => {
          const n = useCountUp(it.to, inView);
          return (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="p-4 border rounded-2xl border-zinc-200 bg-white/80 backdrop-blur"
            >
              <div className="text-3xl font-semibold tracking-tight">
                {n}
                {it.suffix}
              </div>
              <div className="mt-1 text-sm text-zinc-600">{it.label}</div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

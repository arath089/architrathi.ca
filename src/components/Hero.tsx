"use client";
import { motion } from "motion/react";
import Image from "next/image";
import AnimatedName from "@/components/AnimatedName";
import Sparkle from "@/components/Sparkle";
import { Great_Vibes } from "next/font/google";
const script = Great_Vibes({ subsets: ["latin"], weight: "400" });

import { useMemo } from "react";

// soft ambient floats
const floatAnim = (duration = 18) => ({
  x: [0, 12, -8, 0],
  y: [0, -10, 8, 0],
  transition: { duration, repeat: Infinity, ease: "easeInOut" as const },
});

// Deterministic, softly twinkling dot halo (no hydration mismatch)
function DotCloud({ seed = 1337 }: { seed?: number }) {
  function rngFactory(s: number) {
    let t = s >>> 0;
    return function rng() {
      t += 0x6d2b79f5;
      let r = Math.imul(t ^ (t >>> 15), 1 | t);
      r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }

  const dots = useMemo(() => {
    const rand = rngFactory(seed);
    const COUNT = 800;
    const rInner = 31;
    const rOuter = 48;
    const TWINKLE_FRACTION = 0.35;
    const PEAK_ADD = 0.07;
    const phi = Math.PI * (3 - Math.sqrt(5));
    const out: Array<{
      cx: number;
      cy: number;
      r: number;
      o0: number;
      o1: number;
      delay: number;
      dur: number;
      twinkle: boolean;
    }> = [];

    for (let i = 0; i < COUNT; i++) {
      const t = i / (COUNT - 1);
      const a = i * phi;
      const rNorm = Math.sqrt(t);
      const R = rInner + (rOuter - rInner) * rNorm;
      const cx = 50 + R * Math.cos(a);
      const cy = 50 + R * Math.sin(a);
      const size = 0.12 + (1 - rNorm) * 0.32;
      const base = 0.12 + (1 - rNorm) * 0.22;
      const peak = Math.min(0.4, base + PEAK_ADD);
      const delay = rand() * 5;
      const dur = 6 + rand() * 6;
      const twinkle = rand() < TWINKLE_FRACTION;
      out.push({ cx, cy, r: size, o0: base, o1: peak, delay, dur, twinkle });
    }
    return out;
  }, [seed]);

  const fmt = (n: number) => n.toFixed(6);

  return (
    <>
      <style jsx global>{`
        @keyframes dotTwinkle {
          0%,
          100% {
            opacity: var(--o0);
          }
          50% {
            opacity: var(--o1);
          }
        }
      `}</style>
      <motion.svg
        aria-hidden
        className="absolute block pointer-events-none -inset-6 sm:-inset-8"
        viewBox="0 0 100 100"
        animate={{ rotate: 360 }}
        transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
      >
        <g>
          {dots.map((d, i) => (
            <circle
              key={i}
              cx={fmt(d.cx)}
              cy={fmt(d.cy)}
              r={fmt(d.r)}
              fill="white"
              style={
                d.twinkle
                  ? ({
                      // strings avoid hydration issues
                      ["--o0" as string]: `${d.o0}`,
                      ["--o1" as string]: `${d.o1}`,
                      opacity: `${d.o0}`,
                      animation: `dotTwinkle ${d.dur}s ease-in-out ${d.delay}s infinite`,
                    } as React.CSSProperties)
                  : ({ opacity: `${d.o0}` } as React.CSSProperties)
              }
            />
          ))}
        </g>
      </motion.svg>
    </>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-24 md:pt-[10vh] pb-16 md:pb-24"
    >
      <motion.div
        initial={{ x: 0, y: 0, opacity: 0.85 }}
        animate={floatAnim(20)}
        aria-hidden
        className="absolute rounded-full pointer-events-none -left-24 top-10 h-72 w-72 blur-3xl"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(34,197,239,.22) 0%, rgba(34,197,239,0) 70%)",
        }}
      />
      <motion.div
        initial={{ x: 0, y: 0, opacity: 0.85 }}
        animate={floatAnim(26)}
        aria-hidden
        className="absolute rounded-full pointer-events-none -right-12 top-24 h-80 w-80 blur-3xl"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(16,185,129,.20) 0%, rgba(16,185,129,0) 70%)",
        }}
      />

      <div className="z-10 px-6 mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Avatar block (left on desktop, first on mobile) */}
          <div className="flex items-center justify-center order-1 lg:justify-start">
            <div className="relative h-64 w-64 sm:h-80 sm:w-80 lg:h-[26rem] lg:w-[26rem]">
              {/* soft cyan/emerald halo */}
              <div
                className="absolute inset-0 rounded-full blur-2xl"
                style={{
                  background:
                    "linear-gradient(45deg, rgba(34,197,239,.20), rgba(16,185,129,.20))",
                }}
              />
              <DotCloud />
              <Image
                src="/archit.jpg"
                alt="Archit Rathi"
                width={1100}
                height={1100}
                priority
                className="relative object-cover w-full h-full rounded-full shadow-2xl"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-2">
            <p className="text-sm font-medium tracking-wide text-cyan-200/80">
              Hi, I am
            </p>

            <div className="relative mt-2 overflow-hidden">
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-semibold leading-[1.02] tracking-[-0.02em] text-[clamp(2.8rem,8.2vw,8.5rem)]"
              >
                <AnimatedName />
              </motion.h1>
            </div>

            {/* Developer • Learner • Musician + sparkles */}
            <div className="flex items-center gap-1 mt-6 text-base text-white md:text-lg whitespace-nowrap">
              <span>Developer</span>
              <Sparkle size={12} />
              <span>Learner</span>
              <Sparkle size={12} />
              <span>Musician</span>
            </div>

            {/* Short personal intro */}
            <p className="max-w-2xl mt-6 text-base text-white md:text-lg">
              I’m a Software Developer who likes making interfaces feel
              effortless. I build Shopify storefronts with Liquid, TypeScript,
              and Tailwind, with purposeful motion. Currently working at The
              Beyond Group: recent work with clients like Our Place, Olipop,
              MUDWTR, and Hu Kitchen. Based in Vancouver, Canada.
            </p>

            {/* Cursive line */}
            <p
              className={`${script.className} mt-8 text-2xl md:text-3xl text-cyan-100/90`}
            >
              <q>There is no spoon</q>
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-5 mt-14">
              <a
                href="#contact"
                className="rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 px-7 py-3.5 font-medium text-white shadow-sm transition hover:scale-[1.02] active:scale-[0.99]"
              >
                Contact
              </a>
              <a
                href="#work"
                className="rounded-xl border border-white/20 px-7 py-3.5 text-white/90 transition hover:bg-white/10"
              >
                See work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

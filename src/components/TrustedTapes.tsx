"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useMemo, useRef } from "react";
import useIsMobile from "@/hooks/useIsMobile";

type Brand = { name: string; src: string; href: string };

export default function TrustedTapes({
  items,
  className = "",
  distance = 560, // a bit more travel so it feels alive
  angleA = -1.8, // gentler angles
  angleB = 1.4,
}: {
  items: Brand[];
  className?: string;
  distance?: number;
  angleA?: number;
  angleB?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  // hooks stay unconditional; on mobile these MotionValues drive nothing —
  // the tapes run on a compositor-driven CSS marquee instead
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const xA = useTransform(scrollYProgress, [0, 1], [0, distance]);
  const xB = useTransform(scrollYProgress, [0, 1], [0, -distance * 1.08]);

  // desktop needs plenty of cards to fill the long tapes; the mobile marquee
  // duplicates the base list exactly 2x itself for a seamless -50% loop
  const row = useMemo(() => {
    const base = items.length < 6 ? [...items, ...items] : items;
    if (isMobile) return base;
    return [...base, ...base, ...base];
  }, [items, isMobile]);

  return (
    <section
      ref={ref}
      className={`relative py-28 md:py-40 ${className}`}
      aria-label="Trusted by"
    >
      {/* Heading ABOVE tapes, larger, always visible */}
      <div className="relative z-20 px-6 mx-auto max-w-7xl">
        <h2 className="text-center text-white tracking-[0.34em] text-bold text-xl">
          TRUSTED&nbsp;BY
        </h2>
      </div>

      <div className="relative w-full pointer-events-none mt-54 isolate overflow-x-clip">
        <div className="absolute inset-0 overflow-visible"></div>
        <TapeRow
          items={row}
          x={xA}
          angle={angleA}
          yClass="top-8 md:top-12"
          isMobile={isMobile}
        />
        <TapeRow
          items={row}
          x={xB}
          angle={angleB}
          yClass="bottom-8 md:bottom-12"
          isMobile={isMobile}
          reverse
        />
      </div>

      {/* side fade to avoid hard cuts — skipped on mobile to save a composite pass */}
      {!isMobile && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
          }}
        />
      )}
    </section>
  );
}

const TAPE_SKIN = {
  background: "linear-gradient(180deg, #0E2F44, #0A2334)", // Arctic Navy gradient
  border: "1px solid rgba(186, 241, 255, 0.08)", // subtle icy edge
} as const;

function LogoCard({
  brand,
  mobile,
  ghost,
}: {
  brand: Brand;
  mobile: boolean;
  ghost?: boolean; // marquee duplicate: visible but hidden from a11y tree
}) {
  return (
    <a
      href={brand.href}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-transform outline-none pointer-events-auto select-none shrink-0 hover:scale-105 focus:scale-105"
      title={`Visit ${brand.name}`}
      aria-hidden={ghost || undefined}
      tabIndex={ghost ? -1 : undefined}
      style={{
        background: "#fff", // white card
        borderRadius: mobile ? 14 : 20,
        padding: mobile ? "10px 14px" : "clamp(16px, 4.5vw, 28px)",
        border: "1px solid rgba(0,0,0,.08)",
        // margin instead of flex gap on mobile keeps one copy at exactly
        // 50% of the row width, so the marquee loop point is seamless
        marginRight: mobile ? 12 : undefined,
        boxShadow: mobile
          ? "inset 0 1px 0 rgba(0,0,0,.06)"
          : "0 14px 28px rgba(0,0,0,.35), inset 0 1px 0 rgba(0,0,0,.06)",
      }}
    >
      {/* keep original logo colors */}
      <Image
        src={brand.src}
        alt={brand.name}
        width={420}
        height={120}
        sizes="(max-width: 767px) 120px, 260px"
        className="block object-contain w-auto h-8 md:h-12" // 32px mobile / 48px desktop
        draggable={false}
        loading="lazy"
      />
    </a>
  );
}

function TapeRow({
  items,
  x,
  angle,
  yClass,
  isMobile,
  reverse = false,
}: {
  items: Brand[];
  x: MotionValue<number>; // MotionValue<number>
  angle: number;
  yClass: string;
  isMobile: boolean;
  reverse?: boolean;
}) {
  if (isMobile) {
    // compositor-driven marquee: static tape skin, only the card row
    // translates (CSS animation, no main-thread work while scrolling)
    return (
      <div
        className={`absolute left-1/2 -translate-x-1/2 ${yClass} w-[110vw]`}
        // static rotation; translateZ(0) promotes the wrapper so it rasterizes once
        style={{ transform: `rotate(${angle}deg) translateZ(0)` }}
      >
        <div
          className="overflow-hidden rounded-full"
          style={{ ...TAPE_SKIN, padding: 10 }}
        >
          <div
            className={`tape-marquee flex items-center ${
              reverse ? "tape-marquee--reverse" : ""
            }`}
            style={
              { "--tape-duration": reverse ? "48s" : "40s" } as React.CSSProperties
            }
          >
            {[...items, ...items].map((b, i) => (
              <LogoCard
                key={`${b.name}-${i}`}
                brand={b}
                mobile
                ghost={i >= items.length}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 ${yClass} w-[210vw] md:w-[190vw]`}
      // static rotation; translateZ(0) promotes the wrapper so it rasterizes once
      style={{ transform: `rotate(${angle}deg) translateZ(0)` }}
    >
      <motion.div
        className="flex items-center rounded-full"
        style={{
          x,
          willChange: "transform", // this is the layer that translates every frame
          gap: "clamp(18px, 4.2vw, 28px)",
          padding: "clamp(12px, 3.6vw, 18px)",
          boxShadow: "0 14px 36px rgba(10, 35, 52, 0.55)",
          ...TAPE_SKIN,
        }}
      >
        {items.map((b, i) => (
          <LogoCard key={`${b.name}-${i}`} brand={b} mobile={false} />
        ))}
      </motion.div>
    </div>
  );
}

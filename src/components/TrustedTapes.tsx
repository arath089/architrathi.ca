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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Mobile travel must fit the narrower 210vw tape: the tape only extends
  // (210vw - 100vw) / 2 past each viewport edge, so |x| may never exceed
  // 0.55 * viewport width. 160px (172.8px for row B) is safe down to 320px.
  const travel = isMobile ? Math.min(distance, 160) : distance;

  const xA = useTransform(scrollYProgress, [0, 1], [0, travel]);
  const xB = useTransform(scrollYProgress, [0, 1], [0, -travel * 1.08]);

  // ensure plenty of cards to fill the tapes; mobile needs far fewer since
  // the tape is shorter and travels less
  const row = useMemo(() => {
    const base = items.length < 6 ? [...items, ...items] : items;
    if (isMobile) return [...base, ...base].slice(0, 12);
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
          widthClass="w-[210vw] md:w-[190vw]"
          isMobile={isMobile}
        />
        <TapeRow
          items={row}
          x={xB}
          angle={angleB}
          yClass="bottom-8 md:bottom-12"
          widthClass="w-[210vw] md:w-[190vw]"
          isMobile={isMobile}
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

function TapeRow({
  items,
  x,
  angle,
  yClass,
  widthClass,
  isMobile,
}: {
  items: Brand[];
  x: MotionValue<number>; // MotionValue<number>
  angle: number;
  yClass: string;
  widthClass: string;
  isMobile: boolean;
}) {
  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 ${yClass} ${widthClass}`}
      // static rotation; translateZ(0) promotes the wrapper so it rasterizes once
      style={{ transform: `rotate(${angle}deg) translateZ(0)` }}
    >
      <motion.div
        className="flex items-center rounded-full"
        style={{
          x,
          willChange: "transform", // this is the layer that translates every frame
          gap: isMobile ? 12 : "clamp(18px, 4.2vw, 28px)",
          background: "linear-gradient(180deg, #0E2F44, #0A2334)", // Arctic Navy gradient
          padding: isMobile ? 10 : "clamp(12px, 3.6vw, 18px)",
          boxShadow: isMobile ? "none" : "0 14px 36px rgba(10, 35, 52, 0.55)",
          border: "1px solid rgba(186, 241, 255, 0.08)", // subtle icy edge
        }}
      >
        {items.map((b, i) => (
          <a
            key={`${b.name}-${i}`}
            href={b.href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform outline-none pointer-events-auto select-none shrink-0 hover:scale-105 focus:scale-105"
            title={`Visit ${b.name}`}
            style={{
              background: "#fff", // white card
              borderRadius: isMobile ? 14 : 20,
              padding: isMobile ? "10px 14px" : "clamp(16px, 4.5vw, 28px)",
              border: "1px solid rgba(0,0,0,.08)",
              boxShadow: isMobile
                ? "inset 0 1px 0 rgba(0,0,0,.06)"
                : "0 14px 28px rgba(0,0,0,.35), inset 0 1px 0 rgba(0,0,0,.06)",
            }}
          >
            {/* keep original logo colors */}
            <Image
              src={b.src}
              alt={b.name}
              width={420}
              height={120}
              sizes="(max-width: 767px) 120px, 260px"
              className="block object-contain w-auto h-8 md:h-12" // 32px mobile / 48px desktop
              draggable={false}
              loading="lazy"
            />
          </a>
        ))}
      </motion.div>
    </div>
  );
}

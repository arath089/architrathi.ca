"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Dancing_Script } from "next/font/google";
import { CASE_STUDIES } from "@/components/case-studies";

const cursive = Dancing_Script({ subsets: ["latin"], weight: ["700"] });

type CaseStudyMeta = {
  slug: string;
  name: string;
  src: string;
  alt?: string;
};

const SLIDES: CaseStudyMeta[] = [
  { slug: "our-place", name: "Our Place", src: "/work/ourplace.jpg" },
  { slug: "olipop", name: "OLIPOP", src: "/work/olipop-2.webp" },
  { slug: "hu-kitchen", name: "Hu Kitchen", src: "/work/hukitchen.jpg" },
  { slug: "mudwtr", name: "MUD/WTR", src: "/work/mudwtr.jpg" },
  { slug: "hiya", name: "Hiya", src: "/work/hiya.jpg" },
];

const wrapIdx = (i: number, len: number) => (i + len) % len;

export default function Work() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<CaseStudyMeta | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const len = SLIDES.length;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const spring = { type: "spring", stiffness: 220, damping: 28, mass: 0.9 };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (open) return;
      if (e.key === "ArrowRight") setActive((i) => wrapIdx(i + 1, len));
      if (e.key === "ArrowLeft") setActive((i) => wrapIdx(i - 1, len));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [len, open]);

  const slots = useMemo(
    () => [
      { xvw: -40, rot: -11, scale: 0.88, z: 2, dim: 0.35 },
      { xvw: -20, rot: -6, scale: 0.94, z: 3, dim: 0.25 },
      { xvw: 0, rot: 0, scale: 1, z: 4, dim: 0.1 },
      { xvw: 20, rot: 6, scale: 0.94, z: 3, dim: 0.25 },
      { xvw: 40, rot: 11, scale: 0.88, z: 2, dim: 0.35 },
    ],
    []
  );

  const map = [2, 3, 4, 0, 1];
  const getSlot = (i: number) => slots[map[wrapIdx(i - active, len)]];

  const justSwipedRef = useRef(false);

  const onCardDragEnd = (
    _: any,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    if (open) return;
    const dx = info.offset.x;
    const vx = info.velocity.x;

    if (dx < -60 || vx < -500) {
      setActive((i) => wrapIdx(i + 1, len));
      justSwipedRef.current = true;
      setTimeout(() => (justSwipedRef.current = false), 120);
      return;
    }
    if (dx > 60 || vx > 500) {
      setActive((i) => wrapIdx(i - 1, len));
      justSwipedRef.current = true;
      setTimeout(() => (justSwipedRef.current = false), 120);
      return;
    }
  };

  const onCardClick = (s: CaseStudyMeta, isCenter: boolean) => {
    if (justSwipedRef.current) return;
    if (isCenter) setOpen(s);
  };

  return (
    <section
      id="work"
      className="relative min-h-screen py-20 overflow-hidden md:py-24"
      aria-label="Selected work"
    >
      <div className="max-w-6xl px-4 mx-auto md:px-6">
        <h3 className="text-xs md:text-sm uppercase tracking-[0.22em] text-white/70 mb-8 md:mb-10">
          Selected work
        </h3>
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="relative h-[74vh] md:h-[72vh]">
          <div className="absolute inset-0 flex items-center justify-center">
            {SLIDES.map((s, i) => {
              const slot = getSlot(i);
              const isCenter = wrapIdx(i, len) === wrapIdx(active, len);

              return (
                <motion.div
                  key={s.slug}
                  drag={isMobile ? "x" : false}
                  dragElastic={isMobile ? 0.16 : false}
                  dragMomentum={false}
                  onDragEnd={isMobile ? onCardDragEnd : undefined}
                  onClick={() =>
                    isCenter ? onCardClick(s, true) : setActive(i)
                  }
                  className="absolute cursor-pointer will-change-transform"
                  style={{
                    zIndex: slot.z,
                    touchAction: isMobile ? "pan-y" : "auto",
                    WebkitUserSelect: "none",
                    userSelect: "none",
                  }}
                  initial={false}
                  animate={{
                    x: `${slot.xvw}vw`,
                    rotate: slot.rot,
                    scale: slot.scale,
                    filter: `brightness(${1 - slot.dim})`,
                  }}
                  transition={spring}
                  whileHover={
                    !isMobile && isCenter ? { scale: 1.02 } : undefined
                  }
                >
                  <div className="relative md:w-[64vw] w-[86vw] max-w-[760px] aspect-[3/4] md:aspect-[4/3] rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,.35)]">
                    <div className="absolute inset-0">
                      <Image
                        src={s.src}
                        alt={s.alt ?? s.name}
                        fill
                        priority={isCenter}
                        className="object-cover"
                        sizes="(max-width: 768px) 105vw, 760px"
                        quality={100}
                      />
                    </div>

                    <div
                      className="absolute inset-0 transition-opacity"
                      style={{
                        background: "rgba(0,0,0,0.22)",
                        opacity: isCenter ? 0.14 : 1,
                      }}
                    />

                    <div className="absolute inset-x-0 text-center -translate-y-1/2 pointer-events-none top-1/2">
                      <span
                        className={`${cursive.className} inline-block px-4 text-white font-bold`}
                        style={{
                          textShadow: "0 12px 40px rgba(0,0,0,.55)",
                          fontSize: "clamp(30px, 8.5vw, 84px)",
                          letterSpacing: ".02em",
                        }}
                      >
                        {s.name}
                      </span>
                    </div>

                    {isCenter &&
                      CASE_STUDIES[s.slug as keyof typeof CASE_STUDIES] && (
                        <div className="absolute inset-x-0 flex justify-center bottom-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpen(s);
                            }}
                            className="rounded-full bg-white/95 text-zinc-900 px-4 py-2 text-sm font-semibold shadow hover:scale-[1.03] active:scale-[0.98] transition"
                          >
                            View case study
                          </button>
                        </div>
                      )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
            <button
              aria-label="Previous"
              onClick={() => setActive((i) => wrapIdx(i - 1, len))}
              className="grid w-10 h-10 transition rounded-full shadow pointer-events-auto place-items-center bg-white/95 text-zinc-900 hover:scale-105 active:scale-95"
            >
              ‹
            </button>
            <button
              aria-label="Next"
              onClick={() => setActive((i) => wrapIdx(i + 1, len))}
              className="grid w-10 h-10 transition rounded-full shadow pointer-events-auto place-items-center bg-white/95 text-zinc-900 hover:scale-105 active:scale-95"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="modal"
            className="fixed inset-0 z-[80] bg-[#2c2e30]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close Button */}
            <button
              aria-label="Close case study"
              onClick={() => setOpen(null)}
              className="fixed z-50 grid w-10 h-10 text-white transition bg-black rounded-full shadow right-6 top-6 place-items-center hover:scale-105 active:scale-95"
            >
              ✕
            </button>

            {/* Scrollable Content */}
            <div className="h-full overflow-y-auto">
              <div className="max-w-5xl px-6 py-24 mx-auto">
                {(() => {
                  const CaseComponent =
                    CASE_STUDIES[open.slug as keyof typeof CASE_STUDIES];
                  return CaseComponent ? (
                    <CaseComponent cover={open.src} />
                  ) : null;
                })()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const TARGET = "Archit Rathi";
const LETTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789{}[]()<>/\\|;:~-_=+";

export default function AnimatedName({
  loopEvery = 6000,
}: {
  loopEvery?: number;
}) {
  const reduce = useReducedMotion();
  const [text, setText] = useState(TARGET);
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);

  function scrambleOnce(duration = 1400) {
    const start = performance.now();
    const chars = TARGET.split("");
    const isLetter = chars.map((c) => c !== " ");
    const total = isLetter.filter(Boolean).length;

    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      let locked = 0;
      const next = chars
        .map((c) => {
          if (c === " ") return " ";
          if (locked < Math.floor(total * p)) {
            locked++;
            return c;
          }
          let rnd = LETTERS[(Math.random() * LETTERS.length) | 0];
          if (rnd === c) rnd = LETTERS[(Math.random() * LETTERS.length) | 0];
          return rnd;
        })
        .join("");
      setText(next);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else setText(TARGET);
    };
    rafRef.current = requestAnimationFrame(tick);
  }

  useEffect(() => {
    if (reduce) return;
    scrambleOnce();
    const loop = () => {
      scrambleOnce();
      timerRef.current = window.setTimeout(loop, loopEvery);
    };
    timerRef.current = window.setTimeout(loop, loopEvery);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [reduce, loopEvery]);

  // split current text at the first space so we can inject a responsive <br />
  const spaceIdx = text.indexOf(" ");
  const left = spaceIdx >= 0 ? text.slice(0, spaceIdx) : text;
  const right = spaceIdx >= 0 ? text.slice(spaceIdx + 1) : "";

  return (
    // Reserve size with a ghost; allow wrap only >= sm
    <span className="inline-grid align-baseline whitespace-nowrap sm:whitespace-normal">
      {/* Animated foreground layer */}
      <motion.span
        className="
          col-start-1 row-start-1
          supports-[background-clip:text]:bg-clip-text
          supports-[background-clip:text]:text-transparent
          text-white
          whitespace-nowrap sm:whitespace-normal
          will-change:transform
        "
        style={{
          backgroundImage:
            "radial-gradient(120% 120% at 0% 50%, #a5f3fc, #6ee7b7 45%, #38bdf8 80%)",
          backgroundSize: "200% 200%",
          overflow: "hidden",
        }}
        animate={
          reduce ? {} : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
        }
        transition={
          reduce ? {} : { duration: 12, repeat: Infinity, ease: "easeInOut" }
        }
        aria-label={TARGET}
      >
        <span>{left}</span>
        <span className="inline sm:hidden">&nbsp;</span>
        <span className="hidden sm:inline">
          <br />
        </span>
        <span>{right}</span>
      </motion.span>
    </span>
  );
}

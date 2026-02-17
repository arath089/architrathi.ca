"use client";
import { motion } from "motion/react";

export default function Sparkle({
  size = 12,
  delay = 0,
}: {
  size?: number;
  delay?: number;
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      className="mt-1 text-emerald-300/80"
      initial={{ scale: 0.9, rotate: 0, opacity: 0.8 }}
      animate={{
        scale: [0.9, 1.12, 0.9],
        rotate: [0, 18, 0],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay }}
      aria-hidden
    >
      {/* 8-point soft star */}
      <path
        d="M10 0 11.6 6.2 18 8 11.6 9.8 10 16 8.4 9.8 2 8l6.4-1.8L10 0z"
        fill="currentColor"
      />
    </motion.svg>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

export type Company = {
  name: string;
  role?: string;
  years: string;
  logo?: string;
  /** title progression within the company, oldest first */
  progression?: string[];
};

const COMPANIES: Company[] = [
  {
    name: "Sprint Telecom",
    role: "IT Support Assistant",
    years: "2017 – 2018",
    logo: "/about/sprint.jpeg",
  },
  {
    name: "lululemon",
    role: "IT Specialist · TEKsystems",
    years: "2021",
    logo: "/about/lululemon.png",
  },
  {
    name: "The Beyond Group",
    years: "2021 – 2026",
    logo: "/about/tbg-1.webp",
    progression: [
      "Apprentice Developer",
      "Junior Developer",
      "Intermediate Software Developer",
    ],
  },
  {
    name: "Warner Music Group",
    role: "Software Developer III",
    years: "2026 – Present",
    logo: "/about/wmg.jpeg",
  },
];

// seconds for the traveler to cross the full timeline
const TRAVEL_DURATION = 2.4;

function initials(name: string) {
  return name
    .split(/[\s-]+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Logo({ company, className }: { company: Company; className: string }) {
  return company.logo ? (
    <img
      src={company.logo}
      alt=""
      className={className}
      loading="lazy"
    />
  ) : (
    <span className="text-sm font-semibold text-cyan-200/80">
      {initials(company.name)}
    </span>
  );
}

function Progression({
  company,
  baseDelay,
  active,
  reduceMotion,
  align,
}: {
  company: Company;
  baseDelay: number;
  active: boolean;
  reduceMotion: boolean;
  align: "center" | "left";
}) {
  if (!company.progression?.length) return null;
  return (
    <ul
      aria-label={`Title progression at ${company.name}`}
      className={`mt-2 space-y-1.5 ${align === "center" ? "flex flex-col items-start text-left pl-8" : ""}`}
    >
      {company.progression.map((step, j) => (
        <motion.li
          key={step}
          initial={false}
          animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
          transition={{
            duration: reduceMotion ? 0 : 0.3,
            delay: reduceMotion ? 0 : baseDelay + 0.2 + j * 0.18,
          }}
          className="flex items-center gap-2 text-xs text-zinc-400"
        >
          <span aria-hidden className="h-1 w-1 rounded-full bg-cyan-300/70" />
          {step}
        </motion.li>
      ))}
    </ul>
  );
}

type Props = {
  companies?: Company[];
  className?: string;
};

export default function CompanyTimeline({
  companies = COMPANIES,
  className = "",
}: Props) {
  const desktopRef = useRef<HTMLOListElement>(null);
  const mobileRef = useRef<HTMLOListElement>(null);
  const inViewDesktop = useInView(desktopRef, { once: true, margin: "-80px" });
  const inViewMobile = useInView(mobileRef, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  const inView = inViewDesktop || inViewMobile;
  const active = inView || !!reduceMotion; // reduced motion: final state, no travel

  const n = companies.length;
  const edge = 100 / (2 * n); // % from container edge to first/last dot center (desktop)
  const seg = TRAVEL_DURATION / Math.max(1, n - 1); // time between two dots
  const delayFor = (i: number) => (reduceMotion ? 0 : i * seg);

  const dotAnimate = active
    ? {
        scale: 1,
        borderColor: "rgba(103, 232, 249, 0.5)",
        boxShadow: "0 0 24px rgba(103, 232, 249, 0.25)",
      }
    : {
        scale: 0.9,
        borderColor: "rgba(255, 255, 255, 0.1)",
        boxShadow: "0 0 0px rgba(103, 232, 249, 0)",
      };

  return (
    <section id="journey" className={`max-w-6xl px-4 mx-auto pt-72 ${className}`}>
      <div className="mb-12">
        <h3 className="text-sm uppercase tracking-[0.2em] text-zinc-400">
          Journey
        </h3>
        <p className="mt-2 text-2xl font-medium md:text-3xl">
          Companies along the way.
        </p>
      </div>

      {/* DESKTOP: horizontal line, dots left to right */}
      <ol
        ref={desktopRef}
        aria-label="Companies I have worked at, in chronological order"
        className="relative hidden md:grid"
        style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
      >
        {/* base line */}
        <div
          aria-hidden
          className="absolute top-8 h-px bg-white/10"
          style={{ left: `${edge}%`, width: `${100 - 2 * edge}%` }}
        />

        {/* progress line */}
        <motion.div
          aria-hidden
          className="absolute top-8 h-px origin-left bg-gradient-to-r from-cyan-400 to-sky-500"
          style={{ left: `${edge}%`, width: `${100 - 2 * edge}%` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: active ? 1 : 0 }}
          transition={{
            duration: reduceMotion ? 0 : TRAVEL_DURATION,
            ease: "linear",
          }}
        />

        {/* traveler */}
        {inView && !reduceMotion && (
          <motion.div
            aria-hidden
            className="absolute top-8 z-10 h-3 w-3 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.8)]"
            initial={{ left: `${edge}%`, x: "-50%", opacity: 0 }}
            animate={{
              left: [`${edge}%`, `${100 - edge}%`],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: TRAVEL_DURATION,
              ease: "linear",
              opacity: { times: [0, 0.08, 0.92, 1], duration: TRAVEL_DURATION },
            }}
          />
        )}

        {companies.map((c, i) => (
          <li key={c.name} className="flex flex-col items-center px-2 text-center">
            <motion.div
              className="relative z-10 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border bg-[#0A1220]"
              initial={false}
              animate={dotAnimate}
              transition={{
                duration: reduceMotion ? 0 : 0.35,
                delay: delayFor(i),
              }}
            >
              <Logo company={c} className="h-full w-full object-cover" />
            </motion.div>

            <motion.div
              initial={false}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0.55, y: 8 }}
              transition={{
                duration: reduceMotion ? 0 : 0.35,
                delay: delayFor(i),
              }}
              className="mt-4"
            >
              <div className="text-[13px] uppercase tracking-[0.12em] text-zinc-400">
                {c.years}
              </div>
              <div className="mt-0.5 font-semibold">{c.name}</div>
              {c.role && <p className="mt-1 text-sm text-zinc-400">{c.role}</p>}
              <Progression
                company={c}
                baseDelay={delayFor(i)}
                active={active}
                reduceMotion={!!reduceMotion}
                align="center"
              />
            </motion.div>
          </li>
        ))}
      </ol>

      {/* MOBILE: vertical rail, dots top to bottom */}
      <ol
        ref={mobileRef}
        aria-label="Companies I have worked at, in chronological order"
        className="space-y-8 md:hidden"
      >
        {companies.map((c, i) => (
          <li key={c.name} className="relative flex items-start gap-4">
            {/* connector segment down to the next dot (skipped on last item) */}
            {i < n - 1 && (
              <div
                aria-hidden
                className="absolute left-6 top-6 -bottom-14 w-px bg-white/10"
              >
                <motion.div
                  className="absolute inset-0 origin-top bg-gradient-to-b from-cyan-400 to-sky-500"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: active ? 1 : 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : seg,
                    delay: delayFor(i),
                    ease: "linear",
                  }}
                />
                {inView && !reduceMotion && (
                  <motion.div
                    className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.8)]"
                    initial={{ top: "0%", opacity: 0 }}
                    animate={{
                      top: ["0%", "100%"],
                      opacity:
                        i === 0
                          ? [0, 1, 1, i === n - 2 ? 0 : 1]
                          : i === n - 2
                            ? [1, 1, 1, 0]
                            : [1, 1, 1, 1],
                    }}
                    transition={{
                      duration: seg,
                      delay: delayFor(i),
                      ease: "linear",
                      opacity: { times: [0, 0.15, 0.85, 1], duration: seg },
                    }}
                  />
                )}
              </div>
            )}

            <motion.div
              className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-[#0A1220]"
              initial={false}
              animate={dotAnimate}
              transition={{
                duration: reduceMotion ? 0 : 0.35,
                delay: delayFor(i),
              }}
            >
              <Logo company={c} className="h-full w-full object-cover" />
            </motion.div>

            <motion.div
              initial={false}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0.55, y: 8 }}
              transition={{
                duration: reduceMotion ? 0 : 0.35,
                delay: delayFor(i),
              }}
            >
              <div className="text-xs uppercase tracking-[0.12em] text-zinc-400">
                {c.years}
              </div>
              <div className="mt-0.5 font-semibold">{c.name}</div>
              {c.role && <p className="mt-1 text-sm text-zinc-400">{c.role}</p>}
              <Progression
                company={c}
                baseDelay={delayFor(i)}
                active={active}
                reduceMotion={!!reduceMotion}
                align="left"
              />
            </motion.div>
          </li>
        ))}
      </ol>
    </section>
  );
}

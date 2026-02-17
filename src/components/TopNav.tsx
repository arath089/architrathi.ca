"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Transition } from "motion";

// --- icons (same as before) ---
function IconHome(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 10.5 12 3l9 7.5M5.5 9.5V20h13V9.5"
      />
    </svg>
  );
}
function IconSpark(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
      />
    </svg>
  );
}
function IconWork(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 7h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm5-3h8a2 2 0 0 1 2 2v1H6V6a2 2 0 0 1 2-2Z"
      />
    </svg>
  );
}
function IconInfo(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="9" strokeWidth="1.8" />
      <path strokeWidth="1.8" strokeLinecap="round" d="M12 17v-5M12 8h.01" />
    </svg>
  );
}
function IconMail(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 0 8 6 8-6"
      />
    </svg>
  );
}

// --- links ---
type Link = { href: string; label: string; icon: (props?: any) => JSX.Element };
const LINKS: Link[] = [
  { href: "#top", label: "Home", icon: IconHome },
  { href: "#what-i-do", label: "What I do", icon: IconSpark },
  { href: "#work", label: "Work", icon: IconWork },
  { href: "#about", label: "About", icon: IconInfo },
  { href: "#contact", label: "Contact", icon: IconMail },
];

// --- springs ---
const spring: Transition = {
  type: "spring",
  stiffness: 520,
  damping: 34,
  mass: 0.8,
};
const hoverSpring: Transition = {
  type: "spring",
  stiffness: 700,
  damping: 28,
  mass: 0.6,
};
// NEW: bar show/hide spring
const barSpring: Transition = {
  type: "spring",
  stiffness: 700,
  damping: 45,
  mass: 1,
};

export default function TopNav() {
  const [active, setActive] = useState<string>(LINKS[0].href);
  const [open, setOpen] = useState(false);

  // NEW: desktop-only auto-hide state
  const [isDesktop, setIsDesktop] = useState(false);
  const [showBar, setShowBar] = useState(true); // visible on load
  const lastYRef = useRef(0);
  const hoverTopRef = useRef(false); // hovering the reveal zone

  const barRef = useRef<HTMLDivElement>(null);

  // breakpoint detect
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const apply = () => setIsDesktop(mql.matches);
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, []);

  // watch sections for active pill
  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(
      Boolean
    ) as HTMLElement[];
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const v = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (v[0]) setActive(`#${v[0].target.id}`);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0.15, 0.35, 0.6] }
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // esc closes mobile sheet
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // NEW: desktop scroll hide/reveal
  useEffect(() => {
    if (!isDesktop) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const last = lastYRef.current || 0;
        const dy = y - last;

        // only hide after a bit of scroll and not when hovering the top zone
        if (y > 100 && dy > 6 && !hoverTopRef.current) setShowBar(false);
        else if (dy < -6) setShowBar(true);

        lastYRef.current = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isDesktop]);

  // nav click scroll
  const handleNav = (href: string) => {
    setOpen(false);
    setActive(href);
    const el = document.querySelector(href) as HTMLElement | null;
    if (!el) return;
    const offset = barRef.current ? 72 : 64;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const Item = useMemo(
    () =>
      function Item({ link }: { link: Link }) {
        const isActive = active === link.href;
        const Icon = link.icon;
        return (
          <motion.button
            key={link.href}
            onClick={() => handleNav(link.href)}
            className={[
              "relative grid place-items-center w-10 h-10 md:w-11 md:h-11 rounded-full outline-none",
              isActive
                ? "bg-white text-zinc-900"
                : "bg-white/10 text-white/85 hover:bg-white/20",
            ].join(" ")}
            whileHover={{ scale: 1.08, y: -1 }}
            whileTap={{ scale: 0.9 }}
            transition={hoverSpring}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon className="w-5 h-5 md:w-5.5 md:h-5.5" />
            {/* label on hover */}
            <motion.span
              className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 rounded-full bg-zinc-800 text-white/95 text-[10.5px] md:text-xs px-2.5 py-1 shadow/50 shadow-black"
              initial={{ opacity: 0, y: -6, scale: 0.95 }}
              whileHover={{ opacity: 1, y: 0, scale: 1 }}
              transition={hoverSpring}
            >
              {link.label}
            </motion.span>
          </motion.button>
        );
      },
    [active]
  );

  return (
    <>
      {/* DESKTOP hover-to-reveal zone (thin strip at very top) */}
      {isDesktop && (
        <div
          className={`fixed inset-x-0 top-0 z-[49] ${
            showBar ? "pointer-events-none" : "pointer-events-auto"
          }`}
          style={{ height: 10 }}
          onMouseEnter={() => {
            hoverTopRef.current = true;
            setShowBar(true);
          }}
          onMouseLeave={() => {
            hoverTopRef.current = false;
          }}
        />
      )}

      {/* Sticky bar that hides on desktop scroll down */}
      <motion.div
        ref={barRef}
        className="sticky top-0 z-50 w-full bg-transparent"
        initial={false}
        animate={
          isDesktop
            ? showBar
              ? { y: 0, opacity: 1, filter: "blur(0px)" }
              : { y: -72, opacity: 0, filter: "blur(4px)" }
            : { y: 0, opacity: 1 }
        }
        transition={barSpring}
      >
        <div className="px-4 mr-0 md:mx-auto w-fit">
          <div className="flex items-center justify-between py-3 md:py-4">
            <div className="text-white/50 text-xs tracking-[0.18em] select-none" />
            {/* Desktop glass pill — low-key */}
            <div className="hidden md:block">
              <div className="relative mx-auto w-max">
                {/* ultra-subtle glass underlay */}
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-full pointer-events-none -z-10"
                  style={{
                    // very light tint
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,.15), rgba(186,241,255,.25))",
                    // lighter blur & saturation so it blends in
                    backdropFilter: "blur(6px) saturate(110%)",
                    WebkitBackdropFilter: "blur(6px) saturate(110%)",
                    // faint border
                    border: "1px solid rgba(255,255,255,.10)",
                    // no drop shadows, no inner highlights
                    boxShadow: "none",
                    // tone everything down a bit more
                    opacity: 0.9,
                  }}
                />
                <div className="flex items-center gap-2 px-2.5 py-1.5">
                  {LINKS.map((l) => (
                    <Item key={l.href} link={l} />
                  ))}
                </div>
              </div>
            </div>

            {/* mobile hamburger */}
            <motion.button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-grid w-10 h-10 text-white rounded-full md:hidden place-items-center bg-white/10"
              whileTap={{ scale: 0.92 }}
              transition={spring}
            >
              <div className="relative w-5 h-3.5">
                <span
                  className="absolute inset-x-0 top-0 h-[2px] bg-white rounded-full transition-transform"
                  style={{
                    transform: open
                      ? "translateY(7px) rotate(45deg)"
                      : "translateY(0)",
                  }}
                />
                <span
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-white rounded-full transition-opacity"
                  style={{ opacity: open ? 0 : 1 }}
                />
                <span
                  className="absolute inset-x-0 bottom-0 h-[2px] bg-white rounded-full transition-transform"
                  style={{
                    transform: open
                      ? "translateY(-7px) rotate(-45deg)"
                      : "translateY(0)",
                  }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Mobile sheet stays the same */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed inset-x-0 bottom-0 z-[60] mx-auto max-w-md rounded-t-3xl bg-zinc-100 text-zinc-900 shadow-2xl"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={spring}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex justify-center py-3">
                <div className="h-1.5 w-14 rounded-full bg-zinc-300" />
              </div>
              <motion.ul
                className="px-6 pt-2 pb-10 space-y-3"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {
                    transition: { staggerChildren: 0.04, staggerDirection: -1 },
                  },
                  show: { transition: { staggerChildren: 0.06 } },
                }}
              >
                {LINKS.map((l) => {
                  const isActive = active === l.href;
                  const Icon = l.icon;
                  return (
                    <motion.li
                      key={`m-${l.href}`}
                      variants={{
                        hidden: { opacity: 0, y: 10, scale: 0.98 },
                        show: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: spring,
                        },
                      }}
                    >
                      <motion.button
                        onClick={() => handleNav(l.href)}
                        className={[
                          "w-full h-12 rounded-full flex items-center gap-3 px-4 text-sm font-semibold tracking-[0.12em]",
                          isActive
                            ? "bg-black text-white"
                            : "bg-zinc-200 text-zinc-900",
                        ].join(" ")}
                        whileTap={{ scale: 0.965 }}
                        transition={hoverSpring}
                      >
                        <span className="grid w-8 h-8 rounded-full place-items-center bg-black/10">
                          <Icon className="w-4.5 h-4.5" />
                        </span>
                        <span className="uppercase">{l.label}</span>
                      </motion.button>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

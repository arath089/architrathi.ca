"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const PANELS = [
  {
    key: "shopify",
    label: "Shopify",
    title: "Built for Shopify",
    body: "Liquid-first with TypeScript where it helps. Upgrade-safe themes and maintainable ops.",
    bullets: [
      "Section schema your team can actually use",
      "App embeds, cart & checkout extensions",
      "Hydrogen/Storefront API for dynamic bits",
      "Metafield strategy & content models",
      "CI checks for theme quality & visual diffs",
    ],
    img: "/accordion/dev-4.jpg",
  },
  {
    key: "a11y",
    label: "A11y",
    title: "Accessibility & Compliance",
    body: "Inclusive flows that meet WCAG 2.2 AA and regional law (ADA, AODA, GDPR/CCPA) without adding friction.",
    bullets: [
      "Semantic landmarks & heading hierarchy",
      "Logical focus order + visible focus rings",
      "ARIA only where native semantics lack",
      "Contrast verified and themable palettes",
      "Screen-reader QA on VoiceOver/NVDA",
      "Consent banners that store audit-proof signals",
    ],
    img: "/accordion/dev-1.jpg",
  },
  {
    key: "speed",
    label: "Speed",
    title: "Speed as a feature",
    body: "Performance is a product choice. I build fast first—and keep it fast with budgets and monitoring.",
    bullets: [
      "Edge caching & smart CDN routing",
      "Streaming SSR + selective hydration (islands)",
      "Critical CSS with preconnect/preload hints",
      "Modern media: AVIF/WebP with responsive srcset",
      "Third-party audits; defer or sandbox where possible",
      "RUM dashboards for Core Web Vitals (LCP/INP/CLS)",
    ],
    img: "/accordion/dev-2.jpg",
  },
  {
    key: "motion",
    label: "Motion",
    title: "Animation craft",
    body: "Motion clarifies flow and expresses brand—never decoration. Tuned springs, zero jank.",
    bullets: [
      "Context-specific spring curves and timing",
      "Gestures & micro-interactions that teach",
      "Reduced-motion safe paths everywhere",
      "60fps budgets; GSAP/Framer where it wins",
      "Orchestrated transitions with no layout shift",
    ],
    img: "/accordion/dev-3.jpg",
  },
] as const;

export default function Difference() {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIdx = useRef(0);
  const [ready, setReady] = useState(false);

  const layout = () => {
    const vw = Math.max(360, window.innerWidth);
    const vh = Math.max(500, window.innerHeight);
    const mobile = vw <= 768;

    // desktop (width-accordion)
    const dGap = 16;
    const dH = Math.min(600, Math.round(vh * 0.66));
    const dRadius = 28;
    const dCollapsedW = 160;
    const dExpandedW = Math.min(600, Math.round(vw * 0.5));

    // mobile (height-accordion)
    const mGap = 12;
    const mRadius = 22;
    const mCollapsedH = 92; // closed tile height
    const mExpandedH = Math.round(vh * 0.56); // open tile height

    return {
      mobile,
      dGap,
      dH,
      dRadius,
      dCollapsedW,
      dExpandedW,
      mGap,
      mRadius,
      mCollapsedH,
      mExpandedH,
    };
  };

  const apply = (toIdx: number, immediate = false) => {
    activeIdx.current = toIdx;
    const L = layout();
    const t = trackRef.current!;
    t.style.setProperty("--dGap", `${L.dGap}px`);
    t.style.setProperty("--dH", `${L.dH}px`);
    t.style.setProperty("--dRadius", `${L.dRadius}px`);
    t.style.setProperty("--dCollapsedW", `${L.dCollapsedW}px`);

    t.style.setProperty("--mGap", `${L.mGap}px`);
    t.style.setProperty("--mRadius", `${L.mRadius}px`);
    t.style.setProperty("--mCollapsedH", `${L.mCollapsedH}px`);
    t.style.setProperty("--mExpandedH", `${L.mExpandedH}px`);

    itemRefs.current.forEach((el, i) => {
      if (!el) return;

      if (L.mobile) {
        // animate height on mobile
        const h = i === toIdx ? L.mExpandedH : L.mCollapsedH;
        gsap.to(el, {
          height: h,
          duration: immediate ? 0 : i === toIdx ? 2.5 : 2.0,
          ease: i === toIdx ? "elastic.out(1,.3)" : "elastic.out(1,.6)",
        });
      } else {
        // animate width on desktop
        const w = i === toIdx ? L.dExpandedW : L.dCollapsedW;
        gsap.to(el, {
          width: w,
          duration: immediate ? 0 : i === toIdx ? 2.5 : 2.0,
          ease: i === toIdx ? "elastic.out(1,.3)" : "elastic.out(1,.6)",
        });
      }

      el.classList.toggle("is-active", i === toIdx);
    });

    if (L.mobile && itemRefs.current[toIdx] && !immediate) {
      // ensure the opened tile is fully in view vertically
      itemRefs.current[toIdx]!.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  useLayoutEffect(() => {
    const items = itemRefs.current;
    items.forEach((el, i) =>
      el?.addEventListener("click", () => activeIdx.current !== i && apply(i))
    );
    apply(0, true);
    setReady(true);

    const onResize = () => apply(activeIdx.current, true);
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      items.forEach((el, i) => {
        if (!el) return;
        const clone = el.cloneNode(true);
        el.replaceWith(clone);
        itemRefs.current[i] = clone as HTMLDivElement;
      });
    };
  }, []);

  return (
    <section id="difference" className="relative py-16">
      <div className="max-w-6xl px-4 mx-auto md:px-6">
        <h3 className="text-sm uppercase tracking-[0.2em] text-zinc-400">
          What makes me different
        </h3>
        <p className="mt-2 text-2xl font-medium md:text-3xl">
          Pragmatic engineering, polished UX, measurable outcomes.
        </p>
      </div>

      <div className="mt-8 ml-0 md:mt-10 md:ml-60">
        <div
          ref={trackRef}
          className="difference-track mx-auto w-full max-w-[min(1400px,92vw)] px-4 md:px-6 overflow-hidden"
          style={{ visibility: ready ? "visible" : "hidden" }}
        >
          {PANELS.map((p, i) => (
            <div
              key={p.key}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="difference-item"
            >
              {/* background image (no fade) */}
              <div
                className="absolute inset-0 rounded-[inherit] bg-center bg-cover"
                style={{ backgroundImage: `url(${p.img})` }}
              />

              {/* collapsed label */}
              <div className="collapsed-label">
                <span className="label-text">{p.label}</span>
              </div>

              {/* expanded copy pinned to top */}
              <div className="ml-0 expanded-copy md:ml-4">
                <h4 className="text-xl font-bold text-white md:text-4xl">
                  {p.title}
                </h4>

                <p className="mt-4 text-white/90 text-[13px] md:text-[15px] max-w-2xl">
                  {p.body}
                </p>

                {p.bullets && (
                  <ul className="mt-4 space-y-1.5 text-white/85 text-[13px] md:text-[15px] leading-relaxed">
                    {p.bullets.map((b, bi) => (
                      <li key={bi} className="relative pl-4">
                        <span className="absolute left-0 top-[0.55em] -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/70" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* TRACK */
        .difference-track {
          display: flex;
          flex-direction: row;
          gap: var(--dGap, 16px);
          overflow: visible;
        }
        @media (max-width: 768px) {
          .difference-track {
            flex-direction: column;
            gap: var(--mGap, 12px);
          }
        }

        /* PANEL base (desktop width-accordion) */
        .difference-item {
          position: relative;
          height: var(--dH, 520px);
          width: var(--dCollapsedW, 160px); /* gsap animates on desktop */
          border-radius: var(--dRadius, 28px);
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
          cursor: pointer;
          overflow: hidden;
          will-change: width, height;
          flex: 0 0 auto;
        }

        /* MOBILE overrides (height-accordion) */
        @media (max-width: 768px) {
          .difference-item {
            width: 100%;
            height: var(--mCollapsedH, 92px); /* gsap animates on mobile */
            border-radius: var(--mRadius, 22px);
          }
        }

        /* collapsed vertical word (desktop) */
        .collapsed-label {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          pointer-events: none;
          transition: opacity 240ms ease;
        }
        .label-text {
          color: rgba(255, 255, 255, 0.9);
          letter-spacing: 0.06em;
          font-weight: 700;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-size: clamp(14px, 3.6vw, 20px);
          text-shadow: 0 6px 22px rgba(0, 0, 0, 0.5);
        }

        /* on mobile, make label horizontal for legibility */
        @media (max-width: 768px) {
          .label-text {
            writing-mode: horizontal-tb;
            transform: none;
            font-size: 15px;
          }
        }

        /* expanded copy at top */
        .expanded-copy {
          position: absolute;
          left: 16px;
          right: 16px;
          top: 25%;
          opacity: 0;
        }

        .difference-item.is-active .collapsed-label {
          opacity: 0;
        }
        .difference-item.is-active .expanded-copy {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}

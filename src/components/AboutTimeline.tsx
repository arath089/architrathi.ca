"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createNoise2D } from "simplex-noise";

gsap.registerPlugin(ScrollTrigger);

// seeded PRNG for simplex v4
function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

type Props = {
  count?: number; // desktop baseline count
  tryScrollSmoother?: boolean;
  hueA?: number;
  hueB?: number;
  className?: string;
};

const EVENTS = [
  {
    year: "1994",
    title: "Born in Kanpur, India",
    body: "Always a curious kid. Had an early love for computers.",
    img: "/about/born.jpg",
  },
  {
    year: "2013–2017",
    title: "Bachelors: Electronics & Communications Engineering",
    body: "G. B. Pant Engineering College, India. Explored life of Robotics. Realized I love crafting experiences.",
    img: "/about/college.jpg",
  },
  {
    year: "2017–2018",
    title: "IT Support Assistant",
    body: "at Sprint Telecom, Delhi. Telecoms support, network management, and customer service.",
    img: "/about/sprint.jpeg",
  },
  {
    year: "2018",
    title: "Moved from India → Canada",
    body: "Went from +30°C to -30°C in a day! Started my journey in Canada.",
    img: "/about/canada.jpg",
  },
  {
    year: "2018–2020",
    title: "Masters at University of Ottawa, Canada",
    body: "in Electrical & Computer Engineering. Focused on software development, AI, and web technologies.",
    img: "/about/ottawa.jpg",
  },
  {
    year: "2019–2019",
    title: "Research Assistant at uOttawa",
    body: "Training system to detect irregular breathing patterns using UWB radar.",
    img: "/about/uottowa.jpg",
  },
  {
    year: "2021 → now",
    title: "The Beyond Group",
    body: "Started as an intern, now working as an Intermediate Software Developer. Building performant, accessible, and beautiful web experiences for high-growth brands.",
    img: "/about/tbg-1.webp",
  },
  {
    year: "",
    title: "",
    body: "..... and the journey continues at The Beyond Group! Always learning, always growing.",
    img: "/about/tbg.jpg",
  },
];

export default function AboutTimeline({
  count = 3800,
  tryScrollSmoother = false,
  hueA = 188,
  hueB = 205,
  className = "",
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current!;
    const content = contentRef.current!;
    if (!wrapper || !content) return;

    content.innerHTML = "";

    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches;

    // MOBILE: fewer dots for smooth scroll; DESKTOP: your original count
    const effectiveCount = isMobile
      ? Math.min(1200, Math.round(count * 0.32))
      : count;

    const noise1 = createNoise2D(mulberry32(1337));
    const noise2 = createNoise2D(mulberry32(4242));

    const frag = document.createDocumentFragment();
    for (let i = 0; i < effectiveCount; i++) {
      const div = document.createElement("div");
      div.className = "circle";

      const n1 = noise1(i * 0.003, i * 0.0033);
      const n2 = noise2(i * 0.002, i * 0.001);

      const tx = n2 * 200;
      const rot = n2 * 270;
      const sx = 3 + n1 * 2;
      const sy = 3 + n2 * 2;

      div.style.transform = `translate(${tx}px,0) rotate(${rot}deg) scale(${sx}, ${sy})`;
      div.style.opacity = "0";

      const t = i / effectiveCount;
      const h = hueA + (hueB - hueA) * t;

      if (isMobile) {
        // MOBILE: gradient fill (cheap) instead of box-shadow
        div.style.background = `radial-gradient(circle at 50% 50%,
          hsla(${h}, 90%, 85%, .65) 0%,
          hsla(${h}, 70%, 70%, .45) 45%,
          hsla(${h}, 70%, 70%, 0) 70%)`;
      } else {
        // DESKTOP: your existing glow
        div.style.boxShadow = `0 0 0 .3px hsla(${h}, 70%, 70%, .55)`;
        div.style.willChange = "transform, opacity";
      }

      frag.appendChild(div);
    }
    content.appendChild(frag);

    // ribbon fade-in tied to scroll (unchanged)
    const ribbonTl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top 25%",
        end: "bottom bottom",
        scrub: 3.0,
      },
      defaults: { ease: "none" },
    });

    gsap.utils.toArray<HTMLElement>(".circle").forEach((el) => {
      ribbonTl.to(el, { opacity: 1, duration: 0.015 }, ">");
    });

    // content: appear on scroll — mobile starts a bit earlier
    const items = listRef.current?.querySelectorAll<HTMLElement>("[data-item]");
    if (items?.length) {
      ScrollTrigger.matchMedia({
        "(max-width: 767px)": () => {
          items.forEach((el, i) => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 18 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: el,
                  start: i === 0 ? "top 92%" : "top 90%", // show with ribbon in view
                  end: "top 65%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });
        },
        "(min-width: 768px)": () => {
          // desktop behavior unchanged
          items.forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 18 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 50%",
                  end: "top 40%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });
        },
      });
    }

    // optional ScrollSmoother
    let smoother: any;
    if (tryScrollSmoother) {
      import("gsap/ScrollSmoother")
        .then((m) => {
          const ScrollSmoother = m.ScrollSmoother;
          if (ScrollSmoother) {
            gsap.registerPlugin(ScrollSmoother);
            smoother = ScrollSmoother.create({
              wrapper,
              content,
              smooth: 1,
              effects: false,
            });
          }
        })
        .catch(() => {});
    }

    return () => {
      ribbonTl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (smoother) smoother.kill();
      content.innerHTML = "";
    };
  }, [count, hueA, hueB, tryScrollSmoother]);

  return (
    <section id="about" className={`relative overflow-x-clip ${className}`}>
      {/* header */}
      <div className="max-w-6xl px-4 pt-40 pb-10 mx-auto md:px-6">
        <h3 className="text-sm uppercase tracking-[0.2em] text-zinc-400">
          About
        </h3>
        <p className="mt-2 text-2xl font-medium md:text-3xl">
          A quick timeline.
        </p>
      </div>

      <div
        id="wrapper"
        ref={wrapperRef}
        className="relative mx-auto max-w-6xl px-4 md:px-6 min-h-[120vh]"
      >
        <div className="grid items-start gap-10 md:grid-cols-2">
          {/* LEFT column (cards) */}
          <div ref={listRef} className="relative z-10">
            <ul className="space-y-10 md:space-y-60">
              {EVENTS.map((e, i) => (
                <li key={e.title} data-item className="relative">
                  {/* desktop row (unchanged) */}
                  <div className="items-center hidden gap-4 md:flex md:justify-end">
                    <div className="w-48 h-48 overflow-hidden border rounded-full shrink-0 border-white/10 bg-white/5">
                      <img
                        src={e.img}
                        alt={e.title}
                        className="object-cover w-full h-full"
                        loading={i > 1 ? "lazy" : "eager"}
                      />
                    </div>
                    <div>
                      <div className="text-[13px] uppercase tracking-[0.12em] text-zinc-400">
                        {e.year}
                      </div>
                      <div className="mt-0.5 text-lg font-semibold">
                        {e.title}
                      </div>
                      <p className="mt-1 text-zinc-400">{e.body}</p>
                    </div>
                  </div>

                  {/* mobile card (stacked) */}
                  <div className="md:hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 overflow-hidden border rounded-full shrink-0 border-white/10 bg-white/5">
                        <img
                          src={e.img}
                          alt={e.title}
                          className="object-cover w-full h-full"
                          loading={i > 1 ? "lazy" : "eager"}
                        />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-[0.12em] text-zinc-400">
                          {e.year}
                        </div>
                        <div className="mt-0.5 font-semibold">{e.title}</div>
                        <p className="mt-1 text-white">{e.body}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT ribbon */}
          <div
            id="content"
            ref={contentRef}
            className="absolute inset-0 z-0 pointer-events-none md:static md:z-auto md:pointer-events-auto md:w-full md:pr-90 md:pt-10 md:pb-10"
            style={{ contain: "layout paint", isolation: "isolate" }} // isolates paint on mobile
          >
            {/* fades only on desktop */}
            <div className="pointer-events-none fixed left-0 top-0 z-10 hidden h-16 w-full bg-gradient-to-b from-[#0A1220] to-transparent md:block" />
            <div className="pointer-events-none fixed bottom-0 left-0 z-10 hidden h-24 w-full bg-gradient-to-t from-[#0A1220] to-transparent md:block" />
          </div>
        </div>
      </div>

      <style>{`
        #about .circle{
          width:20px;height:20px;border-radius:40%;
          margin:-19px auto;
          opacity:0;
          transition: transform 1s cubic-bezier(0.14,0.15,0.13,0.99);
        }
        @media (min-width:768px){
          #about .circle{ margin:-19px 0 -19px auto; } /* desktop ribbon right */
        }
        @media (max-width:420px){
          #about .circle{ width:18px;height:18px;margin:-16px auto; }
        }
      `}</style>
    </section>
  );
}

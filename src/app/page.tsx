import Hero from "@/components/Hero";
import TrustedTapes from "@/components/TrustedTapes";
import WhatIDo from "@/components/WhatIDo";
import Work from "@/components/Work";
import Projects from "@/components/Projects";
import Difference from "@/components/Difference";
import About from "@/components/AboutTimeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="pb-28">
      <Hero />
      <TrustedTapes
        className="mt-28"
        items={[
          {
            name: "Our Place",
            src: "/logos/ourplace.png",
            href: "https://fromourplace.com/",
          },
          {
            name: "OLIPOP",
            src: "/logos/olipop.png",
            href: "https://drinkolipop.com/products/orange-cream",
          },
          {
            name: "MUDWTR",
            src: "/logos/mudwtr.png",
            href: "https://mudwtr.com/",
          },
          {
            name: "Hu Kitchen",
            src: "/logos/hukitchen.png",
            href: "https://hukitchen.com/",
          },
          {
            name: "Hiya Health",
            src: "/logos/hiya.svg",
            href: "https://hiyahealth.com/",
          },
          {
            name: "Enjoy Life",
            src: "/logos/enjoylife.png",
            href: "https://enjoylifefoods.com/",
          },
          {
            name: "Kiki Milk",
            src: "/logos/kikimilk.png",
            href: "https://www.kikimilk.com/",
          },
        ]}
      />

      <WhatIDo />
      <Work />
      <Difference />
      <Projects />
      <About count={3200} tryScrollSmoother={false} hueA={188} hueB={205} />
      <Contact />
      <Footer />
    </main>
  );
}

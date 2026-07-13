import Image from "next/image";
import Link from "next/link";
import { Dancing_Script } from "next/font/google";

const cursive = Dancing_Script({
  subsets: ["latin"],
  weight: ["700"],
});

type Props = {
  cover: string;
};

/*
  TODO: drop real images into /public/work/mudwtr/ — the layout expects:
    /work/mudwtr/carousel-1.png     (wide, carousel delay section)
    /work/mudwtr/transitions-1.png  (wide, page transitions section)
    /work/mudwtr/nourish-1.png      (3-up grid, Nourish section)
    /work/mudwtr/nourish-2.png      (3-up grid, Nourish section)
    /work/mudwtr/nourish-3.png      (3-up grid, Nourish section)
    /work/mudwtr/sale-1.png         (wide, sale automation section)
*/

export default function MudWtr({ cover }: Props) {
  return (
    <article className="relative text-white">
      {/* Hero */}
      <div className="relative w-full h-[65vh] rounded-3xl overflow-hidden shadow-2xl mb-20 shadow-gray-600">
        <Image
          src={cover}
          alt="MUD/WTR"
          fill
          priority
          className="object-cover scale-[1.02]"
        />
      </div>

      {/* Header */}
      <div className="mb-24 text-center">
        <h1 className={`${cursive.className} text-6xl md:text-9xl font-bold`}>
          <Link
            href="https://mudwtr.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-60"
          >
            MUD/WTR
          </Link>
        </h1>

        <p className="max-w-3xl mx-auto mt-8 text-lg font-semibold leading-relaxed">
          Owning <b>frontend performance</b>,{" "}
          <b>purchase-journey architecture</b>, and launch tooling for a
          high-growth functional beverage brand as{" "}
          <b>sole frontend engineer</b>.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-32">
        {/* Business Context */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold">Business Context</h2>

          <p className="leading-relaxed">
            MUD/WTR runs a <b>high-traffic, subscription-first storefront</b>{" "}
            where page speed and purchase-flow clarity translate directly into
            revenue. I served as the <b>sole frontend engineer</b> on the
            account, owning architecture, performance, and feature delivery end
            to end.
          </p>
        </section>

        {/* Carousel Delay */}
        <section className="space-y-12">
          <h2 className="text-3xl font-semibold">
            Hunting a 280ms Carousel Delay
          </h2>

          <p className="leading-relaxed">
            The product page carousel had a <b>visible initialization delay</b>{" "}
            on every load. Profiling traced it to a deferred Alpine.js nextTick
            that postponed carousel setup until after the framework had
            finished unrelated work, adding roughly <b>280ms</b> before the
            carousel became interactive.
          </p>

          <p className="leading-relaxed">
            Removing the deferred initialization and letting the carousel mount
            directly <b>eliminated the delay entirely</b>, making the
            most-viewed component on the <b>highest-traffic page</b> feel
            instant.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <Metric label="Delay Removed" value="~280ms" />
            <Metric label="Where" value="Highest-traffic PDP" />
            <Metric label="Method" value="Profiling, not guessing" />
          </div>

          {/* Single wide image */}
          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="/work/mudwtr/carousel-1.png"
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Page Transitions */}
        <section className="space-y-12">
          <h2 className="text-3xl font-semibold">
            Near-Instant Page Transitions
          </h2>

          <p className="leading-relaxed">
            Implemented <b>Barba.js asset prefetching</b> so that navigating
            between pages feels near-instant. Combined with{" "}
            <b>Core Web Vitals</b> work across image strategy and script
            orchestration, the storefront stays fast under real-world
            conditions, not just in lab scores.
          </p>

          {/* Single wide image */}
          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="/work/mudwtr/transitions-1.png"
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Nourish Re-architecture */}
        <section className="space-y-12">
          <h2 className="text-3xl font-semibold">
            Re-architecting the Product Model for Nourish
          </h2>

          <p className="leading-relaxed">
            The Nourish launch required a <b>multi-axis variant matrix</b>{" "}
            (blend, size, and subscription) that the existing product-based
            logic could not express. I re-architected the product model from
            product-based to <b>variant-based logic</b> and rebuilt the
            customer purchase journey end to end: <b>product page</b>,{" "}
            <b>cart</b>, and <b>selection logic</b>.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <Metric label="Scope" value="PDP, cart, selection" />
            <Metric label="Model" value="Variant-based" />
            <Metric label="Axes" value="Blend x Size x Subscription" />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <ImageBlock src="/work/mudwtr/nourish-1.png" />
            <ImageBlock src="/work/mudwtr/nourish-2.png" />
            <ImageBlock src="/work/mudwtr/nourish-3.png" />
          </div>
        </section>

        {/* Sale Automation */}
        <section className="space-y-12">
          <h2 className="text-3xl font-semibold">Sitewide Sale Automation</h2>

          <p className="leading-relaxed">
            Sale launches previously required <b>hours of manual site edits</b>{" "}
            under time pressure. I built a <b>one-switch automation system</b>{" "}
            that conditionally applies all product, collection, pricing, and UI
            changes across the application, cutting launch and takedown from
            hours to <b>minutes</b>.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <Metric label="Before" value="Hours of manual edits" />
            <Metric label="After" value="Minutes, one switch" />
            <Metric label="Risk" value="Human error removed" />
          </div>

          {/* Single wide image */}
          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="/work/mudwtr/sale-1.png"
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </section>
      </div>
    </article>
  );
}

/* ---------- Small Reusable Blocks ---------- */

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-6 border rounded-2xl bg-white/5 border-white/10 backdrop-blur-sm">
      <p className="text-sm text-white">{label}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  );
}

function ImageBlock({ src }: { src: string }) {
  return (
    <div className="relative w-full h-[450px] rounded-2xl overflow-hidden">
      <Image src={src} alt="" fill className="object-cover" />
    </div>
  );
}

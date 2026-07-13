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
  TODO: drop a real image into /public/work/mudwtr/ - the layout expects:
    /work/mudwtr/transitions-1.png  (wide, page transitions section)
  (carousel + Nourish sections use screen-recording videos already in place;
   sale automation section uses an inline SVG diagram, no image needed)
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
            The fix was found by <b>profiling, not guessing</b>: recording the
            page load in the browser performance panel showed the carousel’s
            setup work queued behind a framework tick it never needed to wait
            for.
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

          {/* Screen recording: carousel initializing instantly */}
          <div className="rounded-2xl overflow-hidden">
            <video
              className="w-full h-auto"
              src="/work/mudwtr/performance.mp4"
              autoPlay
              muted
              loop
              playsInline
              aria-label="Screen recording of the product page carousel becoming interactive instantly after the fix"
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

          <p className="leading-relaxed">
            Variant-based logic meant a single product could express{" "}
            <b>every purchasable permutation</b>, with selection state,
            pricing, and cart behavior all derived from the chosen variant
            instead of duplicated across near-identical products. That kept the
            catalog clean for the team and the purchase flow{" "}
            <b>predictable for the customer</b>.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <Metric label="Scope" value="PDP, cart, selection" />
            <Metric label="Model" value="Variant-based" />
            <Metric label="Axes" value="Blend x Size x Subscription" />
          </div>

          {/* Screen recording: Nourish variant selection flow */}
          <div className="rounded-2xl overflow-hidden">
            <video
              className="w-full h-auto"
              src="/work/mudwtr/nourish.mp4"
              autoPlay
              muted
              loop
              playsInline
              aria-label="Screen recording of the Nourish variant selection flow across blend, size, and subscription"
            />
          </div>
        </section>

        {/* Sale Automation */}
        <section className="space-y-12">
          <h2 className="text-3xl font-semibold">Sitewide Sale Automation</h2>

          <p className="leading-relaxed">
            Sale launches previously required <b>hours of manual edits</b>{" "}
            across pricing, messaging, and promotional UI, always under time
            pressure and always <b>one missed file away</b> from an
            inconsistent storefront.
          </p>

          <p className="leading-relaxed">
            I rebuilt this as a <b>metaobject-driven system</b>: a single
            global discount metaobject acts as <b>the switch</b> for the entire
            storefront. Toggling it conditionally applies discounted pricing,
            savings messaging, and promotional UI across price displays,
            product forms, and collection pages, with <b>collection scoping</b>{" "}
            so a sale can target specific parts of the catalog. Launch and
            takedown went from hours to <b>minutes</b>.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <Metric label="Before" value="Hours of manual edits" />
            <Metric label="After" value="Minutes, one switch" />
            <Metric label="Risk" value="Human error removed" />
          </div>

          {/* Architecture diagram: one switch fanning out to storefront surfaces */}
          <svg
            viewBox="0 0 720 360"
            width="100%"
            role="img"
            aria-label="Architecture diagram: a global discount metaobject acts as one switch that drives pricing displays, savings messaging, and promotional UI, with collection scoping to target part of the catalog"
          >
            {/* switch node */}
            <rect
              x="200"
              y="20"
              width="320"
              height="72"
              rx="16"
              fill="rgba(255,255,255,0.05)"
              stroke="rgba(255,255,255,0.12)"
            />
            <text
              x="360"
              y="52"
              textAnchor="middle"
              fill="#fff"
              fontSize="21"
              fontWeight="600"
            >
              global_discount metaobject
            </text>
            <text
              x="360"
              y="78"
              textAnchor="middle"
              fill="rgba(255,255,255,0.65)"
              fontSize="17"
            >
              (one switch)
            </text>

            {/* connectors from the switch to the three surfaces */}
            <path
              d="M360 92 V136 M360 136 H120 V166 M360 136 V166 M360 136 H600 V166"
              stroke="rgba(255,255,255,0.3)"
              fill="none"
            />
            <polygon points="115,166 125,166 120,176" fill="rgba(255,255,255,0.3)" />
            <polygon points="355,166 365,166 360,176" fill="rgba(255,255,255,0.3)" />
            <polygon points="595,166 605,166 600,176" fill="rgba(255,255,255,0.3)" />

            {/* target nodes */}
            <rect
              x="12"
              y="176"
              width="216"
              height="56"
              rx="14"
              fill="rgba(255,255,255,0.05)"
              stroke="rgba(255,255,255,0.12)"
            />
            <text x="120" y="211" textAnchor="middle" fill="#fff" fontSize="20">
              Pricing displays
            </text>

            <rect
              x="252"
              y="176"
              width="216"
              height="56"
              rx="14"
              fill="rgba(255,255,255,0.05)"
              stroke="rgba(255,255,255,0.12)"
            />
            <text x="360" y="211" textAnchor="middle" fill="#fff" fontSize="20">
              Savings messaging
            </text>

            <rect
              x="492"
              y="176"
              width="216"
              height="56"
              rx="14"
              fill="rgba(255,255,255,0.05)"
              stroke="rgba(255,255,255,0.12)"
            />
            <text x="600" y="211" textAnchor="middle" fill="#fff" fontSize="20">
              Promotional UI
            </text>

            {/* side annotation */}
            <path
              d="M360 232 V276"
              stroke="rgba(255,255,255,0.2)"
              strokeDasharray="4 5"
              fill="none"
            />
            <rect
              x="150"
              y="276"
              width="420"
              height="52"
              rx="26"
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeDasharray="5 6"
            />
            <text
              x="360"
              y="308"
              textAnchor="middle"
              fill="rgba(255,255,255,0.65)"
              fontSize="18"
            >
              Collection scoping: target part of the catalog
            </text>
          </svg>
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


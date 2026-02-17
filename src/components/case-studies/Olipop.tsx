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

export default function Olipop({ cover }: Props) {
  return (
    <article className="relative text-white">
      {/* Hero */}
      <div className="relative w-full h-[65vh] rounded-3xl overflow-hidden shadow-2xl mb-20">
        <Image
          src={cover}
          alt="Olipop"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Header */}
      <div className="mb-24 text-center">
        <h1 className={`${cursive.className} text-6xl md:text-9xl font-bold`}>
          <Link
            href="https://drinkolipop.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-60"
          >
            OLIPOP
          </Link>
        </h1>

        <p className="max-w-3xl mx-auto mt-8 text-lg font-semibold leading-relaxed">
          Engineering premium DTC experiences across <b>PDP transitions</b>,
          <b> celebrity campaigns</b>, account UX, cart refactors, and
          high-performance storefront improvements.
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-32">
        {/* Barba Transitions */}
        <section className="space-y-10">
          <h2 className="text-4xl font-semibold">Barba.js PDP Transitions</h2>

          <p className="leading-relaxed">
            Implemented <b>Barba.js-powered seamless PDP transitions</b> to
            eliminate full page reloads when switching between flavors. This
            introduced a persistent layout layer, enabling smoother state
            preservation and faster perceived navigation. The result was a{" "}
            <b>native, app-like browsing experience</b> that reduced visual
            disruption and improved engagement during flavor exploration.
            Transitions were optimized for performance, ensuring animations
            remained fluid even on mobile devices.
          </p>

          <div className="w-full overflow-hidden rounded-2xl">
            <video
              src="/work/olipop/pdp-transitions.mov"
              autoPlay
              muted
              loop
              playsInline
              className="w-full rounded-2xl max-h-[700px]"
              style={{
                filter: "brightness(1.1) contrast(1.05)",
              }}
            />
            <video
              src="/work/olipop/collection-transitions.mov"
              autoPlay
              muted
              loop
              playsInline
              className="w-full mt-4 rounded-2xl max-h-[700px]"
            />
          </div>
        </section>

        {/* Camila Campaign */}
        <section className="space-y-12">
          <h2 className="text-4xl font-semibold">
            Camila Cabello — Real Love Makes Us
          </h2>

          <p className="leading-relaxed">
            Launched OLIPOP’s largest celebrity collaboration,
            <b>“Real Love Makes Us” featuring Camila Cabello</b>. The campaign
            included homepage takeovers, custom landing experiences, and
            integrated storytelling across PDP and collection pages. Built with
            scalability in mind to handle high traffic volumes during launch,
            the experience balanced{" "}
            <b>
              brand-led storytelling with conversion-focused commerce design
            </b>
            . Coordination across marketing, design, and engineering ensured a
            seamless rollout.
          </p>

          <p className="leading-relaxed">
            The campaign required careful orchestration of dynamic content
            blocks, performance optimization, and modular deployment so updates
            could be pushed rapidly without destabilizing the storefront.
          </p>

          <div className="flex justify-center">
            <iframe
              src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7059152828111486977"
              height="700"
              width="800"
              title="Embedded post"
            ></iframe>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <ImageBlock src="/work/olipop/camila-1.png" />
            <ImageBlock src="/work/olipop/camila-2.png" />
            <ImageBlock src="/work/olipop/camila-3.png" />
          </div>

          <div className="flex flex-col space-y-2 text-green-400 underline">
            <a
              href="https://www.billboard.com/music/music-news/camila-cabello-olipop-campaign-interview-1235332267/"
              target="_blank"
            >
              Press Coverage — Billboard
            </a>
            <a
              href="https://lbbonline.com/news/camila-cabello-stars-alongside-her-family-and-friends-in-olipops-first-ever-advertising-campaign"
              target="_blank"
            >
              Marketing Coverage — Real Love Makes Us
            </a>
          </div>
        </section>

        {/* PDP Swatch Refactor */}
        <section className="space-y-10">
          <h2 className="text-3xl font-semibold">PDP Swatch UX Refactor</h2>

          <p className="leading-relaxed">
            Re-architected flavor swatch interactions to improve clarity,
            accessibility, and conversion confidence. Previously, flavor
            selection lacked clear visual hierarchy and naming visibility. The
            redesign introduced{" "}
            <b>
              explicit flavor labels, improved selection states, and clearer
              affordances
            </b>
            , making it easier for users to understand what they were selecting.
            This reduced cognitive load and improved discoverability across the
            PDP experience.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-3 font-semibold text-red-400">Before</p>
              <ImageBlock src="/work/olipop/swatch-before.png" />
            </div>

            <div>
              <p className="mb-3 font-semibold text-green-400">After</p>
              <ImageBlock src="/work/olipop/swatch-after.png" />
            </div>
          </div>
        </section>

        {/* Cart Refactor */}
        <section className="space-y-12">
          <h2 className="text-3xl font-semibold">Cart Experience Refactor</h2>

          <p className="max-w-3xl leading-relaxed text-white/80">
            Rebuilt the cart experience to introduce clearer hierarchy, improved
            subscription visibility, and simplified interaction patterns. The
            previous implementation surfaced too many competing actions,
            creating friction during checkout. The refactor emphasized{" "}
            <b>primary conversion actions</b>, clarified subscription management
            controls, and streamlined visual grouping of items. The result was a{" "}
            <b>cleaner, more confident checkout progression</b> aligned with
            OLIPOP’s premium brand identity.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {/* BEFORE */}
            <div className="space-y-4">
              <p className="text-sm font-semibold tracking-wider text-red-400 uppercase">
                Before
              </p>

              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src="/work/olipop/cart-before.png"
                  alt="Cart before refactor"
                  width={1600}
                  height={1200}
                  quality={100}
                  className="object-contain w-full h-auto"
                />
              </div>
            </div>

            {/* AFTER */}
            <div className="space-y-4">
              <p className="text-sm font-semibold tracking-wider text-green-400 uppercase">
                After
              </p>

              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src="/work/olipop/cart-after.png"
                  alt="Cart after refactor"
                  width={1600}
                  height={1200}
                  quality={100}
                  className="object-contain w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Account Portal Before/After */}
        <section className="space-y-12">
          <h2 className="text-3xl font-semibold">Account Portal Redesign</h2>

          <p className="leading-relaxed">
            Overhauled the account dashboard to improve order visibility,
            subscription management, and navigational clarity. The previous
            experience lacked structure and made it difficult for users to
            quickly access critical information. The redesign introduced{" "}
            <b>
              clear content segmentation, improved hierarchy, and streamlined
              account actions
            </b>
            , transforming the portal into a polished, user-friendly
            post-purchase environment.
          </p>

          <p className="leading-relaxed">
            This update reinforced brand trust by delivering a cohesive
            experience beyond checkout supporting long-term retention and
            subscription confidence.
          </p>

          {/* Before / After Table */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* BEFORE */}
            <div className="space-y-4">
              <p className="text-sm font-semibold tracking-wider text-red-400 uppercase">
                Before
              </p>

              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src="/work/olipop/account-before.png"
                  alt="Cart before refactor"
                  width={1600}
                  height={1200}
                  quality={100}
                  className="object-contain w-full h-auto"
                />
              </div>
            </div>

            {/* AFTER */}
            <div className="space-y-4">
              <p className="text-sm font-semibold tracking-wider text-green-400 uppercase">
                After
              </p>

              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src="/work/olipop/account-after.png"
                  alt="Cart after refactor"
                  width={1600}
                  height={1200}
                  quality={100}
                  className="object-contain w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}

function ImageBlock({ src }: { src: string }) {
  return (
    <div className="relative w-full h-[420px] rounded-2xl overflow-hidden">
      <Image src={src} alt="" fill className="object-cover" />
    </div>
  );
}

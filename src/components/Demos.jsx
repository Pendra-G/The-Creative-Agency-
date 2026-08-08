import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextLink } from "./ui.jsx";
import { MaskHeading } from "./Reveal.jsx";
import { mailtoHref } from "../config.js";
gsap.registerPlugin(ScrollTrigger);

/**
 * Businesses in Fiji that need a small site and can justify FJ$499.
 *
 * Each card plays a muted looping clip from public/demos/<slug>.mp4 on hover
 * (autoplay on touch, where there is no hover). Until a clip exists the card
 * falls back to a designed gradient tile rather than a broken frame — drop the
 * files in and they take over with no code change.
 */
const DEMOS = [
  { slug: "hair-salon", name: "Hair salon", note: "Cuts, prices, and a booking button that works on a phone." },
  { slug: "photography", name: "Photography", note: "The portfolio first. Everything else gets out of the way." },
  { slug: "beauty-salon", name: "Beauty salon", note: "Treatments, prices, and how to book — in one scroll." },
  { slug: "gadgets", name: "Gadget seller", note: "Stock, prices and a WhatsApp button. No cart to maintain." },
  { slug: "cafe", name: "Café & takeaway", note: "Menu, hours, location. The three things people search for." },
  { slug: "trades", name: "Trades & services", note: "What you do, where you work, and a number to call." },
];

function DemoCard({ demo, index }) {
  const videoRef = useRef(null);
  const [failed, setFailed] = useState(false);
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  const play = () => {
    const v = videoRef.current;
    if (v) v.play().catch(() => {});
  };
  const pause = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <article
      className="dm-card group"
      onMouseEnter={touch ? undefined : play}
      onMouseLeave={touch ? undefined : pause}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-card border border-line bg-carbon">
        {/* Gradient stands in until a clip is dropped in — it reads as designed,
            not as a missing asset. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-accent-grad opacity-[0.18] transition-opacity duration-500 group-hover:opacity-30"
          style={{ filter: `hue-rotate(${index * 18}deg)` }}
        />
        <div className="absolute inset-x-0 top-0 flex items-center gap-1.5 border-b border-line/70 bg-ink/50 px-3 py-2.5 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-pill bg-white/15" />
          <span className="h-2 w-2 rounded-pill bg-white/15" />
          <span className="h-2 w-2 rounded-pill bg-white/15" />
          <span className="ml-2 micro text-white/30">{demo.slug}.fj</span>
        </div>

        {!failed && (
          <video
            ref={videoRef}
            src={`/demos/${demo.slug}.mp4`}
            muted
            loop
            playsInline
            preload="none"
            autoPlay={touch}
            onError={() => setFailed(true)}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 data-[touch=true]:opacity-100"
            data-touch={touch}
          />
        )}

        {failed && (
          <div className="absolute inset-0 flex items-end p-5">
            <p className="display text-[clamp(1.4rem,4vw,2rem)] text-white/85">{demo.name}</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="display text-lg text-white sm:text-xl">{demo.name}</h3>
          <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-white/55">{demo.note}</p>
        </div>
        <span className="micro shrink-0 text-white/25">{String(index + 1).padStart(2, "0")}</span>
      </div>
    </article>
  );
}

export default function Demos() {
  const root = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".dm-head p", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });
      gsap.from(".dm-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".dm-grid", start: "top 85%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="build" ref={root} className="bg-ink py-20 sm:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        <div className="dm-head max-w-2xl">
          <MaskHeading text="What we build" className="display text-white text-[clamp(2rem,7vw,4.5rem)]" />
          <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
            Mostly small businesses that need to be found, trusted and contacted. If your customers
            look you up before they walk in, this is for you.
          </p>
        </div>

        <div className="dm-grid mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {DEMOS.map((d, i) => (
            <DemoCard key={d.slug} demo={d} index={i} />
          ))}
        </div>

        <p className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 text-base text-white/55">
          Not on the list?
          <TextLink as="a" href={mailtoHref("Website enquiry")}>
            Ask anyway
          </TextLink>
        </p>
      </div>
    </section>
  );
}

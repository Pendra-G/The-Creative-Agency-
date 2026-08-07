import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// The six pages a conventional site splits itself across — the thing we argue against.
const PAGES = ["Home", "About", "Services", "Portfolio", "Journal", "Contact"];

const BEATS = [
  {
    kicker: "The problem",
    title: "Most sites bury the point.",
    body:
      "Home, About, Services, Portfolio, Journal, Contact. Six pages is five extra chances for someone to leave before they reach the thing you actually wanted them to see.",
  },
  {
    kicker: "The format",
    title: "So we build one.",
    body:
      "Everything that earns the enquiry, in a single scroll. Nothing to navigate. Nothing to get lost in. It loads once, and it's done.",
  },
  {
    kicker: "The craft",
    title: "And we make it move.",
    body:
      "Scroll-driven animation and real depth — the kind of build that normally arrives with a retainer attached. Motion isn't decoration here. It paces the story and tells the eye where to go next.",
  },
  {
    kicker: "The price",
    title: "From FJ$499.",
    body:
      "One page costs less to design, build and maintain than six. We're not cutting corners — we're cutting page count. That's the whole reason the number is what it is.",
  },
];

function PageCard({ label, primary }) {
  return (
    <div
      className="offer-card absolute left-1/2 top-1/2 w-[min(70%,300px)] sm:w-[min(64%,330px)] aspect-[3/4] bg-ink shadow-[0_24px_60px_-24px_rgba(10,10,10,0.45)] overflow-hidden"
      aria-hidden="true"
    >
      <div className="flex items-center gap-1.5 px-3 h-7 border-b border-white/10 bg-white/[0.04]">
        <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
        <span className="ml-2 text-[8px] uppercase tracking-[0.2em] text-white/40 truncate">
          {label}
        </span>
      </div>

      {primary ? (
        // The surviving page: a whole site condensed into one scroll.
        <div className="p-3 sm:p-4 flex flex-col gap-2.5 h-[calc(100%-1.75rem)]">
          <div className="offer-block h-[34%] bg-gradient-to-br from-white/25 to-white/[0.06]" />
          <div className="offer-block h-1.5 w-4/5 rounded-full bg-white/20" />
          <div className="offer-block h-1.5 w-3/5 rounded-full bg-white/12" />
          <div className="offer-block grid grid-cols-2 gap-2 flex-1">
            <div className="bg-white/[0.10]" />
            <div className="bg-white/[0.10]" />
            <div className="bg-white/[0.10]" />
            <div className="bg-white/[0.10]" />
          </div>
          <div className="offer-block h-5 w-24 rounded-full bg-bone/85" />
        </div>
      ) : (
        <div className="p-3 flex flex-col gap-2 h-[calc(100%-1.75rem)]">
          <div className="h-[26%] bg-white/[0.07]" />
          <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
          <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
          <div className="h-1.5 w-2/3 rounded-full bg-white/10" />
        </div>
      )}
    </div>
  );
}

export default function Offer() {
  const root = useRef(null);
  const scrollRegion = useRef(null);
  const stage = useRef(null);

  useEffect(() => {
    const cards = gsap.utils.toArray(".offer-card", stage.current);
    // Cards are positioned from their own centre; GSAP owns the transform, so
    // centring happens here rather than through a Tailwind translate class.
    gsap.set(cards, { xPercent: -50, yPercent: -50 });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // gsap.matchMedia already scopes selectors and reverts each branch when the
    // breakpoint changes. Nesting a gsap.context inside it breaks that revert,
    // which strands the mobile start state on desktop.
    const mm = gsap.matchMedia(root);

    // Desktop: a sticky stage scrubbed by scroll. Six pages fan out, collapse
    // into one, and that one page comes alive.
    mm.add("(min-width: 1024px)", () => {
      const others = cards.slice(1);
      const primary = cards[0];

        gsap.set(".offer-beat", { opacity: 0, y: 24 });
        gsap.set(".offer-beat-0", { opacity: 1, y: 0 });
        gsap.set(".offer-block", { opacity: 0, y: 14 });
        gsap.set(".offer-price", { opacity: 0, y: 18, scale: 0.94 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: scrollRegion.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
          },
        });

        // 1 — fan out: the six-page site, spread wide.
        tl.to(
          others,
          {
            xPercent: (i) => -50 + (i + 1) * 9,
            yPercent: (i) => -50 + (i + 1) * 7,
            rotate: (i) => (i + 1) * 2.4,
            duration: 1,
            stagger: 0.05,
          },
          0
        );

        // 2 — collapse: everything folds back into a single page.
        tl.to(
          others,
          { xPercent: -50, yPercent: -50, rotate: 0, duration: 1, stagger: 0.05 },
          1.6
        );
        tl.to(others, { opacity: 0, duration: 0.5, stagger: 0.04 }, 2.2);
        tl.to(primary, { scale: 1.06, duration: 0.8 }, 2.3);

        // 3 — the surviving page fills in, block by block.
        tl.to(".offer-block", { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 }, 2.7);

        // 4 — the number lands.
        tl.to(".offer-price", { opacity: 1, y: 0, scale: 1, duration: 0.6 }, 3.7);

        // Copy beats hand off across the same scrub.
        BEATS.forEach((_, i) => {
          if (i > 0) {
            tl.to(`.offer-beat-${i}`, { opacity: 1, y: 0, duration: 0.45 }, i * 1.2 + 0.15);
          }
          if (i < BEATS.length - 1) {
            tl.to(`.offer-beat-${i}`, { opacity: 0, y: -24, duration: 0.45 }, (i + 1) * 1.2 - 0.15);
          }
        });
    });

    // Mobile / tablet: no sticky scrub. Beats read as a normal list and the
    // stage settles straight to the single-page end state.
    mm.add("(max-width: 1023px)", () => {
      gsap.set(cards.slice(1), { opacity: 0 });
      gsap.from(".offer-beat", {
        opacity: 0,
        y: 28,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".offer-beats", start: "top 80%", once: true },
      });
      gsap.from(".offer-block", {
        opacity: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: stage.current, start: "top 75%", once: true },
      });
      gsap.from(".offer-price", {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: stage.current, start: "top 65%", once: true },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="offer"
      ref={root}
      className="relative bg-paper text-foreground"
      aria-labelledby="offer-heading"
    >
      {/* The scrubbed sequence owns its own tall scroll region; anything that
          must not be clipped by the sticky viewport panel lives after it. */}
      <div ref={scrollRegion} className="relative lg:h-[400vh]">
        <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center overflow-hidden">
          <div className="mx-auto w-full max-w-[1500px] px-4 xs:px-5 sm:px-8 pt-16 xs:pt-20 sm:pt-24 lg:pt-0">
          <div className="flex items-center gap-3 mb-8 lg:mb-10">
            <span className="inline-block w-2 h-2 rounded-full bg-foreground/50" />
            <p className="text-[9px] xs:text-[10px] uppercase tracking-[0.24em] text-foreground/50">
              What we build
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Argument */}
            <div className="offer-beats relative lg:min-h-[360px]">
              <h2
                id="offer-heading"
                className="font-display font-bold uppercase leading-[0.88] tracking-tightest text-[clamp(2rem,8vw,5.5rem)] mb-8 lg:mb-10"
              >
                One page.
                <br />
                Built to move.
              </h2>

              <div className="relative lg:h-[240px]">
                {BEATS.map((b, i) => (
                  <div
                    key={b.kicker}
                    className={`offer-beat offer-beat-${i} lg:absolute lg:inset-0 mb-8 lg:mb-0`}
                  >
                    <p className="text-[9px] xs:text-[10px] uppercase tracking-[0.24em] text-foreground/40 mb-3">
                      {b.kicker}
                    </p>
                    <h3 className="font-display font-medium text-xl xs:text-2xl sm:text-3xl tracking-tightest leading-[1.05] mb-3">
                      {b.title}
                    </h3>
                    <p className="text-foreground/70 text-sm xs:text-base leading-relaxed max-w-md">
                      {b.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage */}
            <div
              ref={stage}
              className="relative h-[380px] xs:h-[440px] sm:h-[520px] lg:h-[500px] [perspective:1400px]"
            >
              {PAGES.map((label, i) => (
                <PageCard key={label} label={i === 0 ? "One page" : label} primary={i === 0} />
              ))}

              <div className="offer-price absolute left-1/2 -translate-x-1/2 bottom-0 lg:bottom-4 flex items-baseline gap-2 rounded-pill bg-ink px-5 py-2.5 text-paper whitespace-nowrap">
                <span className="text-[9px] uppercase tracking-[0.24em] text-paper/50">From</span>
                <span className="font-display font-semibold text-xl xs:text-2xl tracking-tightest">
                  FJ$499
                </span>
              </div>
            </div>
          </div>

          </div>
        </div>
      </div>

      {/* Kept outside the sticky panel so a short laptop viewport can't clip it. */}
      <div className="mx-auto w-full max-w-[1500px] px-4 xs:px-5 sm:px-8 pb-16 xs:pb-20 sm:pb-24">
        <ul className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 border-t border-line pt-8">
          {[
            ["Animated end to end", "Every section earns its motion. No stock templates."],
            ["Depth where it counts", "Real 3D moments, tuned to stay fast on mobile."],
            ["Built for island networks", "Loads quickly on 4G, not just on office fibre."],
            ["Live in two weeks", "Copy, design, build, launch. One page, one sprint."],
          ].map(([t, d]) => (
            <li key={t}>
              <p className="font-display font-bold uppercase text-[11px] xs:text-xs tracking-[0.12em] mb-2">
                {t}
              </p>
              <p className="text-foreground/55 text-xs xs:text-sm leading-relaxed">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

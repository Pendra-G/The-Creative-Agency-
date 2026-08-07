import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import pointerGlass from "../assets/pointer glass.png";
import framerGlass from "../assets/framerglass.png";
gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: "01",
    title: "One call, thirty minutes.",
    body:
      "You tell us what the site has to do and who it has to convince. We tell you on that call whether one page is right for you — sometimes it isn't, and we'll say so.",
  },
  {
    n: "02",
    title: "Words first, then design.",
    body:
      "Copy decides the layout, not the other way round. You approve a full design before we write a line of production code.",
  },
  {
    n: "03",
    title: "Build, animate, hand over.",
    body:
      "Motion goes in last, once the structure is proven. You get a live site, your domain pointed at it, and the keys. Yours to keep.",
  },
];

export default function Process() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".pr-head", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 78%", once: true },
      });

      // The rail fills as you read down the steps.
      gsap.fromTo(
        ".pr-rail-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".pr-steps",
            start: "top 70%",
            end: "bottom 75%",
            scrub: 0.5,
          },
        }
      );

      gsap.utils.toArray(".pr-step").forEach((step) => {
        gsap.from(step, {
          y: 44,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 82%", once: true },
        });
      });

      // Gentle parallax on the decorative renders.
      gsap.to(".pr-float-a", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });
      gsap.to(".pr-float-b", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={ref}
      className="relative bg-surface text-foreground py-16 xs:py-20 sm:py-28 md:py-36 overflow-hidden"
      aria-labelledby="process-heading"
    >
      <img
        src={pointerGlass}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pr-float-a pointer-events-none absolute right-[-3rem] top-16 w-40 sm:w-56 lg:w-80 opacity-90 will-change-transform"
      />
      <img
        src={framerGlass}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pr-float-b pointer-events-none absolute left-[-4rem] bottom-24 w-32 sm:w-44 lg:w-60 opacity-70 will-change-transform hidden sm:block"
      />

      <div className="relative mx-auto max-w-[1500px] px-4 xs:px-5 sm:px-8">
        <div className="pr-head">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block w-2 h-2 rounded-full bg-foreground/50" />
            <p className="text-[11px] uppercase tracking-[0.24em] text-foreground/50">
              The process
            </p>
          </div>
          <h2
            id="process-heading"
            className="font-display font-bold uppercase leading-[0.88] tracking-tightest text-[clamp(2rem,8.5vw,6.5rem)] max-w-[14ch]"
          >
            Two weeks, start to live.
          </h2>
        </div>

        <div className="pr-steps relative mt-12 xs:mt-16 sm:mt-20 pl-8 sm:pl-0">
          {/* Rail — mobile runs it down the left gutter, desktop centres it in the number column. */}
          <div className="absolute left-1 sm:left-[calc(2.5rem-1px)] top-2 bottom-2 w-px bg-line">
            <div className="pr-rail-fill absolute inset-0 bg-accent origin-top" />
          </div>

          {STEPS.map((s) => (
            <div
              key={s.n}
              className="pr-step relative grid grid-cols-1 sm:grid-cols-[5rem_1fr] gap-3 sm:gap-8 py-8 xs:py-10 sm:py-12 border-b border-line last:border-b-0"
            >
              <span className="absolute -left-8 sm:static top-8 xs:top-10 sm:top-auto flex items-start">
                <span className="relative z-10 flex h-4 w-4 sm:hidden -translate-x-[7px] items-center justify-center rounded-full bg-surface">
                  <span className="h-2 w-2 rounded-full bg-ink" />
                </span>
                <span className="hidden sm:block font-display font-bold text-2xl md:text-3xl tracking-tightest text-foreground/25 bg-surface pr-4 -ml-1 relative z-10">
                  {s.n}
                </span>
              </span>

              <div className="max-w-2xl">
                <h3 className="font-display font-medium text-xl xs:text-2xl sm:text-4xl tracking-tightest leading-[1.02] mb-3">
                  {s.title}
                </h3>
                <p className="text-foreground/65 text-sm xs:text-base sm:text-lg leading-relaxed">
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MaskHeading } from "./Reveal.jsx";
gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: "01",
    title: "We work out what it has to say",
    body: "Half an hour on a call. You tell me what the business does, who you want walking through the door, and what usually stops them. I tell you what belongs on the site and what doesn't.",
    note: "You get a clear scope and a fixed price before anything starts.",
  },
  {
    n: "02",
    title: "We shape it",
    body: "Words first, then design. The copy decides the layout, not the other way round. You see the full design and approve it before a line of production code gets written.",
    note: "Nothing gets built until you've seen it and said yes.",
  },
  {
    n: "03",
    title: "We put it live",
    body: "Built, animated, tested and launched. Your domain pointed at it, the files handed over, and thirty days of small changes included while you settle in.",
    note: "The site, the domain and the files are yours to keep.",
  },
];

export default function Process() {
  const root = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".pr-head p", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });

      gsap.utils.toArray(".pr-step").forEach((step) => {
        gsap.from(step, {
          y: 56,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 85%", once: true },
        });
        // The rule draws itself as each step arrives.
        const rule = step.querySelector(".pr-rule");
        if (rule) {
          gsap.fromTo(
            rule,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: { trigger: step, start: "top 85%", once: true },
            }
          );
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={root} className="bg-ink py-20 sm:py-28 lg:py-36">
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        <div className="pr-head">
          <MaskHeading
            text="How a project runs"
            className="display text-white text-[clamp(2.4rem,9vw,7rem)]"
          />
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            Three steps, and you know exactly where you stand at the end of each one.
          </p>
        </div>

        <ol className="mt-14 flex flex-col gap-14 sm:mt-20 sm:gap-20">
          {STEPS.map((s) => (
            <li key={s.n} className="pr-step">
              <div className="pr-rule h-px w-full origin-left bg-line" />

              <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-[10rem_1fr_18rem] lg:gap-12">
                <div>
                  <p className="micro text-white/35">Step</p>
                  <p className="display mt-2 text-white/20 text-[clamp(3rem,9vw,5.5rem)] leading-[0.8]">
                    {s.n}
                  </p>
                </div>

                <div>
                  <h3 className="display text-white text-[clamp(1.7rem,5vw,3.2rem)]">{s.title}</h3>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                    {s.body}
                  </p>
                </div>

                <p className="border-l-2 border-accent pl-5 text-sm leading-relaxed text-white/70 lg:pt-2">
                  {s.note}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

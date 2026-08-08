import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: 1,
    title: "We talk",
    body: "One call, thirty minutes, no charge. You tell me what the site has to do and who it has to convince. If what you need is bigger than this, I will say so on that call rather than squeeze it in.",
  },
  {
    n: 2,
    title: "We design",
    body: "Words first, then design. The copy decides the layout, not the other way round. You see and approve the full design before a line of production code gets written.",
  },
  {
    n: 3,
    title: "We launch",
    body: "Built, animated, tested and live. Your domain pointed at it and the keys handed over. 14 days from that first call, start to finish.",
  },
];

export default function Process() {
  const root = useRef(null);
  const [active, setActive] = useState(1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".pr-head", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });

      gsap.utils.toArray(".pr-step").forEach((step, i) => {
        gsap.from(step, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 85%", once: true },
        });
        // The sticky counter tracks whichever step owns the viewport.
        ScrollTrigger.create({
          trigger: step,
          start: "top 60%",
          end: "bottom 60%",
          onToggle: (self) => self.isActive && setActive(i + 1),
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={root} className="bg-ink py-20 sm:py-28 lg:py-36">
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        <div className="pr-head flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
          <h2 className="display text-white text-[clamp(2.4rem,10vw,8rem)]">How it works</h2>
          <p className="micro text-white/50">Three steps · 14 days</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[16rem_1fr] lg:gap-20">
          {/* Sticky counter — the reference's sticky-media column, as type */}
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <p className="display text-[10rem] leading-[0.8] text-accent">
                {String(active).padStart(2, "0")}
              </p>
              <p className="mt-4 micro text-white/45">of 03</p>
              <div className="mt-8 h-px w-full bg-line">
                <div
                  className="h-px bg-accent transition-all duration-500 ease-spring"
                  style={{ width: `${(active / STEPS.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <ol className="flex flex-col">
            {STEPS.map((s) => (
              <li
                key={s.n}
                className="pr-step border-b border-line py-10 last:border-b-0 sm:py-14"
              >
                <div className="flex items-baseline gap-5">
                  <span className="micro text-accent lg:hidden">
                    {String(s.n).padStart(2, "0")}
                  </span>
                  <h3 className="display text-white text-[clamp(2rem,7vw,4.5rem)]">{s.title}</h3>
                </div>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

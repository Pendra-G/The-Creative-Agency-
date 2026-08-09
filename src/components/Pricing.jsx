import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CallCtas } from "./ui.jsx";
import { SITE, mailtoHref } from "../config.js";
gsap.registerPlugin(ScrollTrigger);

const INCLUDED = [
  "Up to three pages, animated end to end",
  "Works properly on phones and loads fast on 4G",
  "Enquiry form and your socials wired up",
  "Thirty days of small changes after launch",
];

export default function Pricing() {
  const root = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".pc-reveal", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });

      // The number counts up once, built paused so it never renders a zero.
      const el = root.current.querySelector(".pc-num");
      const c = { v: 0 };
      const roll = gsap.to(c, {
        v: 499,
        duration: 1.2,
        ease: "power2.out",
        paused: true,
        onUpdate: () => {
          el.textContent = Math.round(c.v).toString();
        },
      });
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => roll.play(),
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={root} className="bg-white py-20 text-ink sm:py-28 lg:py-36">
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        <p className="pc-reveal micro text-ink/45">What it costs</p>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="pc-reveal flex items-start gap-2">
              <span className="display mt-3 text-[clamp(1.4rem,4vw,2.4rem)] text-ink/50">FJ$</span>
              <span className="pc-num display text-[clamp(5rem,20vw,14rem)] text-ink">499</span>
            </p>
            <p className="pc-reveal mt-2 display text-[clamp(1.2rem,3.6vw,2.2rem)] text-ink/70">
              Up to three pages. One price.
            </p>
            <p className="pc-reveal mt-6 max-w-md text-base leading-relaxed text-ink/70 sm:text-lg">
              Paid once, not monthly. There is no second tier and nothing held back for a bigger
              package. Keeping sites small is what keeps them quick to build, which is what keeps
              this number where it is.
            </p>

            <CallCtas className="pc-reveal mt-8" variant="accent" tone="light" />
          </div>

          <div className="pc-reveal">
            <p className="micro text-ink/45">Everything included</p>
            <ul className="mt-6 border-t border-ink/15">
              {INCLUDED.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-4 border-b border-ink/15 py-4 text-base text-ink/80 sm:text-lg"
                >
                  <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-pill bg-accent" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-ink/55">
              Need more than three pages, an online shop or a booking system? That's real work with a
              real cost, so I quote it on its own. Ask and you'll get a fixed number, free.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "./ui.jsx";
gsap.registerPlugin(ScrollTrigger);

/**
 * A single sentence spread edge to edge so it reads as a rule rather than
 * a sentence.
 */
export function WordRule({ words, className = "" }) {
  return (
    <div className={`border-y border-line py-3 ${className}`}>
      <ul className="mx-auto flex max-w-shell items-center justify-between gap-2 px-4 sm:px-6">
        {words.map((w, i) => (
          <li key={`${w}-${i}`} className="micro whitespace-nowrap text-white/60">
            {w}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Marquee that reacts to scrolling: it speeds up with the page and flips
 * direction when you scroll back, then eases to its resting drift. Driven by
 * GSAP rather than a CSS keyframe so the timeScale can be steered.
 */
export function Marquee({
  text,
  direction = "left",
  duration = 34,
  className = "",
  tone = "white",
  repeat = 6,
}) {
  const track = useRef(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const base = direction === "left" ? 1 : -1;

    const ctx = gsap.context(() => {
      const loop = gsap.fromTo(
        el,
        { xPercent: direction === "left" ? 0 : -50 },
        {
          xPercent: direction === "left" ? -50 : 0,
          duration,
          ease: "none",
          repeat: -1,
        }
      );
      loop.timeScale(base);

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          // Velocity is px/sec; map it to a modest multiplier and keep the
          // sign so scrolling up runs the strip backwards.
          const v = self.getVelocity() / 320;
          const scale = gsap.utils.clamp(-9, 9, base + v);
          loop.timeScale(scale);
          gsap.to(loop, {
            timeScale: base,
            duration: 0.9,
            ease: "power2.out",
            overwrite: true,
          });
        },
      });

      return () => {
        st.kill();
        loop.kill();
      };
    }, el);

    return () => ctx.revert();
  }, [direction, duration]);

  const items = Array.from({ length: repeat }, (_, i) => i);

  return (
    <div
      className={`overflow-hidden ${tone === "ink" ? "text-ink" : "text-white"} ${className}`}
      role="presentation"
    >
      <div ref={track} className="mq-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center" aria-hidden={copy === 1 ? "true" : undefined}>
            {items.map((i) => (
              <span key={i} className="flex items-center">
                <span className="display px-4 text-[clamp(1.6rem,4.6vw,3.4rem)] whitespace-nowrap">
                  {text}
                </span>
                <Star className={tone === "ink" ? "text-ink/50" : "text-accent"} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/** Small drawn separator between marquee repeats. */
function Diamond({ className = "" }) {
  return (
    <svg viewBox="0 0 12 12" className={`h-[0.34em] w-[0.34em] shrink-0 ${className}`} aria-hidden="true">
      <path d="M6 0l6 6-6 6L0 6z" fill="currentColor" />
    </svg>
  );
}

/**
 * The footer sign-off, drifting leftward.
 *
 * It reacts to scrolling: the drift speeds up with the page and runs backwards
 * when you scroll up, then eases back to its resting pace. Driven by GSAP
 * rather than a CSS keyframe so the timeScale can be steered. Purely
 * decorative, so it carries role="presentation" and the duplicate track is
 * hidden from assistive tech.
 */
export function Marquee({ text, direction = "left", duration = 40, className = "", repeat = 4 }) {
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
        { xPercent: direction === "left" ? -50 : 0, duration, ease: "none", repeat: -1 }
      );
      loop.timeScale(base);

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          // Velocity is px/sec; map it to a modest multiplier and keep the sign
          // so scrolling up runs the strip backwards.
          const v = self.getVelocity() / 340;
          loop.timeScale(gsap.utils.clamp(-8, 8, base + v));
          gsap.to(loop, { timeScale: base, duration: 0.9, ease: "power2.out", overwrite: true });
        },
      });

      return () => {
        st.kill();
        loop.kill();
      };
    }, el);

    return () => ctx.revert();
  }, [direction, duration]);

  return (
    <div className={`overflow-hidden ${className}`} role="presentation">
      <div ref={track} className="mq-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center" aria-hidden={copy === 1 ? "true" : undefined}>
            {Array.from({ length: repeat }, (_, i) => (
              <span key={i} className="flex items-center gap-8 pr-8">
                <span className="display whitespace-nowrap text-display-md text-white/25">{text}</span>
                <Diamond className="text-accent-text/50" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

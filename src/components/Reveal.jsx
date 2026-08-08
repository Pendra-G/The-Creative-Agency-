import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/**
 * Heading that rises out of a clipped mask, word by word.
 *
 * The visible text is split into per-word spans inside overflow-hidden
 * wrappers, so each word slides up from behind its own edge rather than
 * fading in. The accessible name comes from aria-label — the split markup is
 * hidden from assistive tech.
 */
export function MaskHeading({
  as: Tag = "h2",
  text,
  className = "",
  wordClassName = "",
  start = "top 85%",
  stagger = 0.055,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const words = el.querySelectorAll(".mask-word");
      gsap.set(words, { yPercent: 108 });
      gsap.to(words, {
        yPercent: 0,
        duration: 1,
        ease: "power3.out",
        stagger,
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, ref);

    return () => ctx.revert();
  }, [text, start, stagger]);

  return (
    <Tag ref={ref} aria-label={text} className={className}>
      <span aria-hidden="true">
        {text.split(" ").map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
            <span className={`mask-word inline-block ${wordClassName}`}>
              {word}
              {i < text.split(" ").length - 1 ? " " : ""}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

/** Thin rail across the top showing how far through the page you are. */
export function ScrollProgress() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        gsap.set(el, { scaleX: self.progress });
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]" aria-hidden="true">
      <div ref={ref} className="h-full origin-left scale-x-0 bg-accent-grad" />
    </div>
  );
}

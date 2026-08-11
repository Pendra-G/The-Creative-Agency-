import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const REDUCED = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Heading that rises out of a clipped mask, word by word.
 *
 * The visible text is split into per-word spans inside overflow-hidden
 * wrappers, so each word slides up from behind its own edge rather than
 * fading in. The accessible name comes from aria-label — the split markup is
 * hidden from assistive tech, and with reduced motion the words simply sit
 * where they belong.
 */
export function MaskHeading({
  as: Tag = "h2",
  text,
  className = "",
  start = "top 85%",
  stagger = 0.05,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || REDUCED()) return;

    // Already scrolled past on mount (a deep link, a restored position): the
    // heading is simply left where it belongs rather than hidden and queued.
    if (el.getBoundingClientRect().top < 0) return;

    const ctx = gsap.context(() => {
      // fromTo rather than set + to: the offset belongs to the tween, so an
      // interrupted or reverted tween cannot leave the words parked outside
      // their clip box. clearProps drops the inline transform on completion.
      gsap.fromTo(
        el.querySelectorAll(".mask-word"),
        { yPercent: 108 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power3.out",
          stagger,
          clearProps: "transform",
          scrollTrigger: { trigger: el, start, once: true },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [text, start, stagger]);

  const words = text.split(" ");

  return (
    <Tag ref={ref} aria-label={text} className={className}>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
            <span className="mask-word inline-block">
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

/**
 * The one entrance used across every section: children rise a short distance
 * from an already-legible default. Elements are visible without JS and with
 * reduced motion — the animation only ever removes an offset it added itself.
 */
export function Reveal({
  as: Tag = "div",
  children,
  className = "",
  selector = null,
  stagger = 0.09,
  y = 28,
  start = "top 85%",
  delay = 0,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || REDUCED()) return;

    if (el.getBoundingClientRect().top < 0) return;

    const targets = selector ? el.querySelectorAll(selector) : [el];
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger,
          delay,
          // Leaves no inline opacity behind, so an interrupted tween can never
          // strand a section at opacity 0.
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: el, start, once: true },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [selector, stagger, y, start, delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/** Thin rail across the top showing how far through the page you are. */
export function ScrollProgress() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || REDUCED()) return;

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => gsap.set(el, { scaleX: self.progress }),
    });
    return () => st.kill();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px" aria-hidden="true">
      <div ref={ref} className="h-full origin-left scale-x-0 bg-accent-text" />
    </div>
  );
}

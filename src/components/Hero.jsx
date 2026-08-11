import { useEffect, useRef } from "react";
import gsap from "gsap";
import { split } from "../utils/anim.js";
import { Button, TextLink } from "./ui.jsx";
import { telHref } from "../config.js";
import ReelWebm from "../assets/Developer_Final_edit1.webm";

export default function Hero({ ready = false }) {
  const root = useRef(null);
  const l1 = useRef(null);
  const l2 = useRef(null);

  useEffect(() => {
    if (!ready) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // fromTo with clearProps throughout: the offsets live on the tween, so
      // an interrupted run can never strand the headline outside its clip box.
      [l1.current, l2.current].forEach((el, i) => {
        gsap.fromTo(
          split(el),
          { yPercent: 112 },
          {
            yPercent: 0,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.018,
            delay: 0.1 + i * 0.1,
            clearProps: "transform",
          }
        );
      });

      gsap.fromTo(
        ".hero-fade",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.55,
          clearProps: "opacity,transform",
        }
      );

      // Slow settle on the footage so the frame is never completely still.
      gsap.fromTo(".hero-video", { scale: 1.1 }, { scale: 1, duration: 2.6, ease: "power3.out" });

      // Desktop only — scrubbed layers are real per-frame work, and on a phone
      // the hero is gone in one flick.
      gsap.matchMedia().add("(min-width: 1024px)", () => {
        const exit = { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.8 };
        gsap.to(".hero-copy", { yPercent: -12, opacity: 0.25, ease: "none", scrollTrigger: exit });
        gsap.to(".hero-video", { yPercent: 8, ease: "none", scrollTrigger: exit });
      });
    }, root);

    return () => ctx.revert();
  }, [ready]);

  return (
    // Shorter on portrait screens: a landscape clip inside a tall box gets
    // cropped hard at the sides, and a wider box shows more of the frame.
    <section
      id="home"
      ref={root}
      className="relative isolate flex min-h-[88svh] flex-col justify-end overflow-hidden bg-canvas pb-16 pt-32 sm:min-h-[100svh] sm:pb-24"
    >
      {/* webm only — every browser this site targets decodes it, and preload
          is eager so the frame is filled on arrival rather than after a beat. */}
      <video
        className="hero-video absolute inset-0 -z-20 h-full w-full object-cover"
        src={ReelWebm}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* Legibility is weighted to where the type actually sits rather than
          flooding the whole frame. A light base keeps the footage readable; the
          vertical gradient anchors the top bar and the copy column at the base. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-canvas/30" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-canvas via-canvas/70 to-canvas/40"
      />

      <div className="relative mx-auto w-full max-w-shell px-4 sm:px-6">
        <div className="hero-copy max-w-4xl">
          <h1 aria-label="Websites worth looking at.">
            <span className="block overflow-hidden">
              <span ref={l1} className="display block text-display-mega text-white">
                Websites worth
              </span>
            </span>
            <span className="block overflow-hidden">
              <span ref={l2} className="display block text-display-mega text-body">
                looking at.
              </span>
            </span>
          </h1>

          <p className="hero-fade mt-8 max-w-measure text-body-lg text-body">
            Two freelancers building small, fast, fully animated websites together. You speak to the
            people designing it and writing the code — start to finish.
          </p>

          <div className="hero-fade mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button as="a" href={telHref()} variant="primary" size="lg">
              Call now
            </Button>
            <TextLink as="a" href="#work">
              See the work
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}

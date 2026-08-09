import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Marquee } from "./Strips.jsx";
import { CallCtas, TextLink } from "./ui.jsx";
import { SITE, telHref, mailtoHref } from "../config.js";
gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const root = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".ct-reveal", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={root} className="bg-ink pt-20 sm:pt-28 lg:pt-36">
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        <p className="ct-reveal micro text-white/45">Start a project</p>

        <h2 className="ct-reveal mt-6 display text-white text-[clamp(2.4rem,9vw,7rem)]">
          Tell me what
          <br />
          it needs to do.
        </h2>

        <p className="ct-reveal mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
          One call, thirty minutes, free. You'll get a straight answer on what your site actually needs, and an honest one if that turns out to be less than you expected.
        </p>

        <CallCtas className="ct-reveal mt-10" />
        <p className="ct-reveal mt-6">
          <TextLink as="a" href={mailtoHref()}>Prefer email?</TextLink>
        </p>
      </div>

      <div className="ct-reveal mt-16 border-y border-line py-4 sm:mt-24">
        <a href={mailtoHref()} data-cursor className="block min-h-[44px] py-1">
          <Marquee text="Send me an email" duration={30} />
        </a>
      </div>
    </section>
  );
}

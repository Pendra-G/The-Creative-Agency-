import { useEffect } from "react";
import Hero from "../components/Hero.jsx";
import { WordRule, Marquee } from "../components/Strips.jsx";
import Demos from "../components/Demos.jsx";
import Work from "../components/Work.jsx";
import Process from "../components/Process.jsx";
import Packages from "../components/Packages.jsx";
import About from "../components/About.jsx";
import { CallCtas } from "../components/ui.jsx";

export default function Home({ ready = false }) {
  // Every other route sets its own title, so home has to restore the default
  // or it inherits whatever page you arrived from.
  useEffect(() => {
    document.title = "Website Portfolio — animated websites, built in Fiji";
  }, []);

  return (
    <>
      <Hero ready={ready} />
      <WordRule words={["Two to three pages", "Fully animated"]} />
      <Demos />
      <Work />
      <div className="border-y border-line py-4">
        <Marquee text="Small sites, done properly" duration={34} direction="right" />
      </div>
      <Process />
      <Packages />
      <About />

      {/* Closing CTA — the contact page does the heavy lifting */}
      <section className="bg-ink py-20 sm:py-28">
        <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-card border border-line bg-carbon px-6 py-14 sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 h-96 w-96 bg-accent-glow opacity-80"
            />
            <div className="relative max-w-2xl">
              <h2 className="display text-white text-[clamp(2rem,6.5vw,4rem)]">
                Ready when you are.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/65 sm:text-lg">
                Tell me what the site needs to do. Half an hour on a call, no charge, and a straight
                answer on whether this is right for you.
              </p>
              <CallCtas className="mt-8" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

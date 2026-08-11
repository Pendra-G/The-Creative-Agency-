import { useEffect } from "react";
import Hero from "../components/Hero.jsx";
import Work from "../components/Work.jsx";
import Demos from "../components/Demos.jsx";
import Process from "../components/Process.jsx";
import Packages from "../components/Packages.jsx";
import About from "../components/About.jsx";
import { MaskHeading, Reveal } from "../components/Reveal.jsx";
import { CallCtas } from "../components/ui.jsx";

export default function Home({ ready = false }) {
  // Every other route sets its own title, so home has to restore the default
  // or it inherits whatever page you arrived from.
  useEffect(() => {
    document.title = "Website Portfolio — small, fast, fully animated websites";
  }, []);

  return (
    <>
      {/* The work leads. Everything after it is context for what you just saw. */}
      <Hero ready={ready} />
      <Work />
      <Demos />
      <Process />
      <Packages />
      <About />

      {/* Closing CTA — the contact page does the heavy lifting */}
      <section className="bg-canvas pb-section">
        <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
          <div className="rounded-xl border border-hairline bg-elevated px-6 py-14 sm:px-12 sm:py-20">
            <div className="max-w-2xl">
              <MaskHeading
                text="Ready when you are."
                className="display text-display-md text-white"
              />
              <Reveal>
                <p className="mt-6 max-w-measure text-body-lg text-body">
                  Tell us what the site needs to do. Half an hour on a call, no charge, and a
                  straight answer on whether this is right for you.
                </p>
                <CallCtas className="mt-9" secondary="secondary" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

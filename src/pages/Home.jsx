import { useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import Work from "../components/Work.jsx";
import Demos from "../components/Demos.jsx";
import Process from "../components/Process.jsx";
import Packages from "../components/Packages.jsx";
import About from "../components/About.jsx";
import { MaskHeading, Reveal } from "../components/Reveal.jsx";
import { Button } from "../components/ui.jsx";

export default function Home({ ready = false }) {
  // Every other route sets its own title, so home has to restore the default
  // or it inherits whatever page you arrived from.
  useEffect(() => {
    document.title = "Website Portfolio — small, fast, fully animated websites";
  }, []);

  return (
    <>
      {/* "What we build" frames who this is for, then the portfolios show it
          delivered for real clients. Everything after is context for that. */}
      <Hero ready={ready} />
      <Demos />
      <Work />
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
                  Ready to get started? Click the button to fill out the form, or give us a call
                  directly. Either way, you'll get a straight answer on what your site needs.
                </p>
                <Button as={Link} to="/contact" variant="primary" size="lg" className="mt-9">
                  Go to the form
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

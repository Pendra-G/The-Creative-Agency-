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
import { SITE, PRIMARY_PHONE, telHref, mailtoHref } from "../config.js";

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
                {/* "Click the button" was singular when there was one button.
                    There are two now, and the details below are a third route. */}
                <p className="mt-6 max-w-measure text-body-lg text-body">
                  Ready to get started? Fill out the form, or give us a call directly. Either way,
                  you'll get a straight answer on what your site needs.
                </p>
              </Reveal>

              {/* Phone and email sit together — one place to find both. */}
              <Reveal
                selector=".cta-line"
                className="mt-8 flex flex-col gap-4 sm:gap-2"
                stagger={0.09}
              >
                <a
                  href={telHref()}
                  className="cta-line numeric inline-flex min-h-[48px] w-fit items-center text-title-lg text-white transition-colors duration-200 hover:text-accent-text sm:min-h-[44px]"
                >
                  {PRIMARY_PHONE}
                </a>
                <a
                  href={mailtoHref()}
                  className="cta-line inline-flex min-h-[48px] w-fit items-center text-title-md text-body transition-colors duration-200 hover:text-white sm:min-h-[44px] sm:text-title-lg"
                >
                  {SITE.email}
                </a>
              </Reveal>

              <Reveal className="mt-9">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    as="a"
                    href={telHref()}
                    variant="primary"
                    size="lg"
                    className="w-full justify-center sm:w-auto"
                  >
                    Call now
                  </Button>
                  <Button
                    as={Link}
                    to="/contact"
                    variant="secondary"
                    size="lg"
                    className="w-full justify-center sm:w-auto"
                  >
                    Fill out contact form
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

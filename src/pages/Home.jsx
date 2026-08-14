import { useEffect } from "react";
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
          {/* A violet wash fading to near-neutral — dark throughout, so white
              type, body grey and the accent pill all keep their contrast. */}
          <div className="rounded-xl bg-gradient-to-br from-[#1C1235] via-[#181528] to-[#141519] px-6 py-14 ring-1 ring-inset ring-white/10 sm:px-12 sm:py-20">
            <div className="max-w-2xl">
              <MaskHeading
                text="Ready when you are."
                className="display text-display-md text-white"
              />
              <Reveal>
                {/* Copy tracks the actions actually on the card — with the form
                    button gone, promising a form here would be a dead end. */}
                <p className="mt-6 max-w-measure text-body-lg text-body">
                  Ready to get started? Give us a call or send an email. Either way, you'll get a
                  straight answer on what your site needs.
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
                  className="cta-line numeric inline-flex min-h-[48px] sm:min-h-[44px] w-fit items-center text-title-lg text-white transition-colors duration-200 hover:text-accent-text"
                >
                  {PRIMARY_PHONE}
                </a>
                <a
                  href={mailtoHref()}
                  className="cta-line inline-flex min-h-[48px] sm:min-h-[44px] w-fit items-center text-title-md sm:text-title-lg text-body transition-colors duration-200 hover:text-white"
                >
                  {SITE.email}
                </a>
              </Reveal>

              <Reveal className="mt-8 sm:mt-9">
                <Button
                  as="a"
                  href={telHref()}
                  variant="primary"
                  size="lg"
                  className="w-full justify-center sm:w-auto"
                >
                  Call now
                </Button>
              </Reveal>

              <Reveal className="mt-8">
                <p className="text-caption text-body">{SITE.location}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

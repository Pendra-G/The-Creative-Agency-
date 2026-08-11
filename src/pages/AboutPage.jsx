import { useEffect } from "react";
import About from "../components/About.jsx";
import Process from "../components/Process.jsx";
import { MaskHeading, Reveal } from "../components/Reveal.jsx";
import { CallCtas } from "../components/ui.jsx";

export default function AboutPage() {
  useEffect(() => {
    document.title = "About — Website Portfolio";
  }, []);

  return (
    <>
      <section className="bg-canvas pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
          <MaskHeading
            as="h1"
            text="A small operation, on purpose."
            className="display max-w-4xl text-display-xl text-white"
            start="top 95%"
          />
          <Reveal>
            <p className="mt-8 max-w-measure text-body-lg text-body">
              No account managers, no queue, and nobody handing your project to whoever happens to be
              free.
            </p>
          </Reveal>
        </div>
      </section>

      <About />
      <Process />

      <section className="bg-canvas pb-section">
        <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
          <Reveal className="flex flex-wrap items-center gap-x-10 gap-y-6 border-t border-hairline pt-12">
            <p className="max-w-measure text-body-lg text-white">
              If that sounds like the way you would rather work, let&apos;s talk.
            </p>
            <CallCtas secondary="secondary" />
          </Reveal>
        </div>
      </section>
    </>
  );
}

import { useEffect } from "react";
import { Link } from "react-router-dom";
import About from "../components/About.jsx";
import Process from "../components/Process.jsx";
import { Pill } from "../components/ui.jsx";

export default function AboutPage() {
  useEffect(() => {
    document.title = "About — Website Portfolio";
  }, []);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink pb-14 pt-32 sm:pb-20 sm:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-1/3 left-1/2 h-[50rem] w-[50rem] -translate-x-1/2 bg-accent-glow opacity-60"
        />
        <div className="relative mx-auto w-full max-w-shell px-4 sm:px-6">
          <p className="micro text-accent">About</p>
          <h1 className="mt-6 display text-white text-[clamp(2.6rem,10vw,7rem)]">
            A small operation,
            <br />
            on purpose.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/70">
            No account managers, no queue, no handing your project to whoever happens to be free.
          </p>
        </div>
      </section>

      <About />
      <Process />

      <section className="bg-ink pb-24 pt-4">
        <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-6 border-t border-line pt-12">
            <p className="max-w-md text-lg text-white/70">
              If that sounds like the way you'd rather work, let's talk.
            </p>
            <Pill as={Link} to="/contact" variant="white">
              Start a project
            </Pill>
          </div>
        </div>
      </section>
    </>
  );
}

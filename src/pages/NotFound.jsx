import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Pill } from "../components/ui.jsx";

export default function NotFound() {
  useEffect(() => {
    document.title = "Not found — Website Portfolio";
  }, []);

  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-ink pt-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 bg-accent-glow opacity-60"
      />
      <div className="relative mx-auto w-full max-w-shell px-4 sm:px-6">
        <p className="micro text-accent">404</p>
        <h1 className="mt-6 display text-white text-[clamp(2.6rem,10vw,7rem)]">
          That page
          <br />
          doesn't exist.
        </h1>
        <p className="mt-6 max-w-md text-lg text-white/65">
          Which is fitting, given the whole point is keeping sites small.
        </p>
        <div className="mt-9">
          <Pill as={Link} to="/" variant="white">
            Back home
          </Pill>
        </div>
      </div>
    </section>
  );
}

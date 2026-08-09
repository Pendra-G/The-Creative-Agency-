import { useEffect } from "react";
import Contact from "../components/Contact.jsx";
import Faq from "../components/Faq.jsx";

export default function ContactPage() {
  useEffect(() => {
    document.title = "Contact — Website Portfolio";
  }, []);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink pb-10 pt-32 sm:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-1/3 left-1/2 h-[50rem] w-[50rem] -translate-x-1/2 bg-accent-glow opacity-60"
        />
        <div className="relative mx-auto w-full max-w-shell px-4 sm:px-6">
          <p className="micro text-white/45">Contact</p>
          <h1 className="mt-6 display text-white text-[clamp(2.6rem,10vw,7rem)]">
            Let's get
            <br />
            you online.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/70">
            Half an hour on a call, no charge. Bring what you have — even if that's just an idea and
            a phone full of photos.
          </p>
        </div>
      </section>

      <Contact />
      <Faq />
    </>
  );
}

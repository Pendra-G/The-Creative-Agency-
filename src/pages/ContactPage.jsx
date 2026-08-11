import { useEffect } from "react";
import Contact from "../components/Contact.jsx";
import { MaskHeading, Reveal } from "../components/Reveal.jsx";

export default function ContactPage() {
  useEffect(() => {
    document.title = "Contact — Website Portfolio";
  }, []);

  return (
    <>
      <section className="bg-canvas pb-8 pt-32 sm:pt-40">
        <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
          <MaskHeading
            as="h1"
            text="Let's get you online."
            className="display max-w-4xl text-display-xl text-white"
            start="top 95%"
          />
          <Reveal>
            <p className="mt-8 max-w-measure text-body-lg text-body">
              Half an hour on a call, no charge. Bring what you have — even if that is just an idea
              and a phone full of photos.
            </p>
          </Reveal>
        </div>
      </section>

      <Contact />
    </>
  );
}

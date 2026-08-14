import { useEffect } from "react";
import Contact from "../components/Contact.jsx";
import ContactForm from "../components/ContactForm.jsx";
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
              15 mins on a call, no charge. Bring what you have — even if that is just an idea
              and a phone full of photos.
            </p>
          </Reveal>
        </div>
      </section>

      <Contact />

      <section className="bg-surface py-section">
        <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
          <div className="max-w-2xl">
            <MaskHeading
              text="Or send us a note"
              className="display text-display-md text-white"
              start="top 95%"
            />
            <Reveal>
              <p className="mt-6 max-w-measure text-body-lg text-body">
                If you'd rather write first, fill this out and we'll get back to you. Either way is
                fine — a call is usually faster, but we read every message.
              </p>
            </Reveal>
          </div>

          <Reveal selector="form" className="mt-12">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

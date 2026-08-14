import { MaskHeading, Reveal } from "./Reveal.jsx";
import { Button } from "./ui.jsx";
import { SITE, PRIMARY_PHONE, telHref, viberHref, mailtoHref } from "../config.js";

export default function Contact() {
  return (
    <section id="contact" className="bg-canvas pb-section pt-16 sm:pt-24">
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        <div className="rounded-xl border border-hairline bg-elevated p-6 sm:p-10 lg:p-14">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
            <div>
              <MaskHeading
                text="Tell us what it needs to do."
                className="display text-display-md text-white"
              />
              <Reveal>
                <p className="mt-6 max-w-measure text-body-lg text-body">
                  One call, 15 mins, no charge. You will get a straight answer on what your
                  site actually needs — and an honest one if that turns out to be less than you
                  expected.
                </p>
              </Reveal>
            </div>

            {/* Phone and email in one place, so nobody has to hunt. */}
            <Reveal selector=".ct-line" className="flex flex-col gap-6" stagger={0.1}>
              <div className="ct-line">
                <p className="text-caption text-muted">Call</p>
                <a
                  href={telHref()}
                  className="numeric mt-1 inline-flex min-h-[44px] w-fit items-center text-title-lg text-white transition-colors duration-200 hover:text-accent-text"
                >
                  {PRIMARY_PHONE}
                </a>
              </div>

              <div className="ct-line">
                <p className="text-caption text-muted">Email</p>
                <a
                  href={mailtoHref()}
                  className="mt-1 inline-flex min-h-[44px] w-fit items-center break-all text-body-lg text-white transition-colors duration-200 hover:text-accent-text"
                >
                  {SITE.email}
                </a>
              </div>

              <div className="ct-line flex flex-wrap gap-3 pt-2">
                <Button as="a" href={telHref()} variant="primary">
                  Call now
                </Button>
                <Button as="a" href={viberHref()} variant="secondary">
                  Message on Viber
                </Button>
              </div>

              <p className="ct-line text-caption text-muted">{SITE.location}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

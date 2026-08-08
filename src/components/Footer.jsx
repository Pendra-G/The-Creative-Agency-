import { SITE, telHref, mailtoHref } from "../config.js";

const LINKS = [
  ["What you get", "#what"],
  ["Work", "#work"],
  ["How it works", "#process"],
  ["Pricing", "#pricing"],
  ["Questions", "#faq"],
];

function FooterLink({ href, children, external = false }) {
  return (
    <a
      href={href}
      data-cursor
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex min-h-[44px] items-center micro text-cream/60 transition-all duration-300 ease-snap hover:translate-x-1 hover:text-gold"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const socials = Object.entries(SITE.socials).filter(([, url]) => Boolean(url));

  return (
    <footer id="footer" className="relative overflow-hidden bg-ink pb-8 pt-16">
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-8 border-b border-line pb-14 sm:gap-10 lg:grid-cols-4">
          <div className="col-span-2 lg:col-span-1">
            <p className="micro text-cream/45">Get in touch</p>
            <a
              href={mailtoHref()}
              data-cursor
              className="mt-3 inline-flex min-h-[44px] items-center display text-[clamp(1.1rem,3.2vw,1.6rem)] text-cream transition-colors hover:text-gold"
            >
              {SITE.email}
            </a>
            <p className="mt-4 micro text-cream/45">{SITE.location}</p>
          </div>

          <div>
            <p className="mb-2 micro text-cream/45">Site</p>
            <ul>
              {LINKS.map(([label, href]) => (
                <li key={href}>
                  <FooterLink href={href}>{label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-2 micro text-cream/45">Contact</p>
            <ul>
              <li>
                <FooterLink href="#contact">Start a project</FooterLink>
              </li>
              {SITE.phones.map((p) => (
                <li key={p}>
                  <FooterLink href={telHref(p)}>{p}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {socials.length > 0 && (
            <div>
              <p className="mb-2 micro text-cream/45">Social</p>
              <ul>
                {socials.map(([name, url]) => (
                  <li key={name}>
                    <FooterLink href={url} external>
                      {name}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col items-start justify-between gap-3 py-6 sm:flex-row sm:items-center">
          <p className="micro text-cream/40">
            © {new Date().getFullYear()} {SITE.name}
          </p>
          <p className="micro text-cream/40">Designed &amp; built in Fiji</p>
        </div>
      </div>

      {/* The oversized sign-off, bled to the edges like the reference's. */}
      <p
        aria-hidden="true"
        className="select-none px-2 text-center display leading-[0.8] text-cream/[0.07] text-[clamp(3.5rem,19vw,17rem)]"
      >
        Website Portfolio
      </p>
    </footer>
  );
}

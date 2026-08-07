import { SITE, telHref, mailtoHref } from "../config.js";

const PILL =
  "inline-flex min-h-[44px] items-center gap-2 border border-black/30 rounded-full px-3.5 uppercase tracking-[0.15em] text-[9px] xs:text-[10px] hover:bg-black hover:text-white transition-colors whitespace-nowrap";

const LINKS = [
  ["What we build", "#offer"],
  ["3D showcase", "#showcase"],
  ["Process", "#process"],
  ["Pricing", "#packages"],
  ["Work", "#work"],
  ["Start a project", "#contact"],
];

export default function Footer() {
  // Empty entries in SITE.socials are hidden rather than rendered as dead links.
  const socials = Object.entries(SITE.socials).filter(([, url]) => Boolean(url));

  return (
    <footer
      id="footer"
      className="bg-white text-ink pt-12 xs:pt-16 sm:pt-20 md:pt-28 pb-6 xs:pb-8 border-t border-black/10"
    >
      <div className="mx-auto max-w-[1500px] px-4 xs:px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 pb-12 sm:pb-16 md:pb-24">
          <div className="grid grid-cols-2 xs:grid-cols-3 gap-6">
            <div>
              <p className="text-[9px] xs:text-[10px] uppercase tracking-[0.2em] text-ink/50 mb-3">
                Site
              </p>
              <ul className="space-y-2">
                {LINKS.map(([label, href]) => (
                  <li key={href}>
                    {/* inline-flex + min-height keeps these usable as touch targets */}
                    <a
                      href={href}
                      data-cursor
                      className="inline-flex items-center min-h-[40px] text-[10px] xs:text-[11px] uppercase tracking-[0.15em] text-ink/70 hover:text-ink transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {socials.length > 0 && (
              <div>
                <p className="text-[9px] xs:text-[10px] uppercase tracking-[0.2em] text-ink/50 mb-3">
                  Socials
                </p>
                <ul className="space-y-2">
                  {socials.map(([name, url]) => (
                    <li key={name}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor
                        className={PILL}
                      >
                        {name} <span aria-hidden="true">→</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <p className="text-[9px] xs:text-[10px] uppercase tracking-[0.2em] text-ink/50 mb-3">
                Contact
              </p>
              <ul className="space-y-2">
                <li>
                  <a href={mailtoHref("Website enquiry")} data-cursor className={PILL}>
                    Email us <span aria-hidden="true">→</span>
                  </a>
                </li>
                {SITE.phones.map((p) => (
                  <li key={p}>
                    <a href={telHref(p)} data-cursor className={PILL}>
                      {p} <span aria-hidden="true">→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-start justify-start md:justify-center gap-4 xs:gap-6">
            <p className="font-display font-medium text-xl xs:text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tightest text-ink">
              One page. Built to move.
              <br />
              From FJ$499.
            </p>
            <a
              href="#packages"
              data-cursor
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-ink text-bone px-5 text-[10px] font-semibold uppercase tracking-[0.2em] hover:bg-carbon transition-colors"
            >
              See packages <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="mt-6 xs:mt-8 pt-4 xs:pt-6 border-t border-black/10 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 xs:gap-3 text-[9px] xs:text-[10px] uppercase tracking-[0.18em] text-ink">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p>Designed and built in Fiji.</p>
        </div>
      </div>
    </footer>
  );
}

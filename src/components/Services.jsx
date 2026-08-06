import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mailtoHref } from "../config.js";
gsap.registerPlugin(ScrollTrigger);

// Drop real screenshots in src/assets/services/ using these filenames.
// Landscape crops (~3:2) of the site's homepage/hero work best.
import bookingImg from "../assets/services/booking.jpg";
import portfolioImg from "../assets/services/portfolio.jpg";
import rentalImg from "../assets/services/rental.jpg";
import businessImg from "../assets/services/business.jpg";
import ecommerceImg from "../assets/services/ecommerce.jpg";
import restaurantImg from "../assets/services/restaurant.jpg";

const WEBSITE_TYPES = [
  { key: "booking", name: "Booking", desc: "Live availability, calendars, and a reservation flow people actually finish.", img: bookingImg },
  { key: "portfolio", name: "Portfolio", desc: "Case studies and visual work, built to be browsed.", img: portfolioImg },
  { key: "rental", name: "Rental", desc: "Listings, filters, and enquiries that reach you.", img: rentalImg },
  { key: "business", name: "Business", desc: "Service pages with a clear next step on every one.", img: businessImg },
  { key: "ecommerce", name: "E-Commerce", desc: "Catalogue, cart, checkout. Quoted separately from the packages.", img: ecommerceImg },
  { key: "restaurant", name: "Restaurant", desc: "Menus, hours, and table bookings.", img: restaurantImg },
];

function SitePreview({ src, alt }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative w-full aspect-[3/2] overflow-hidden rounded-md bg-black/[0.03]">
      {/* browser chrome */}
      <div className="absolute top-0 inset-x-0 h-5 bg-black/5 flex items-center gap-1.5 px-2.5 z-10">
        <span className="w-2 h-2 rounded-full bg-black/15" />
        <span className="w-2 h-2 rounded-full bg-black/15" />
        <span className="w-2 h-2 rounded-full bg-black/15" />
      </div>
      {!failed ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 top-5 w-full h-[calc(100%-1.25rem)] object-cover object-top"
        />
      ) : (
        <div className="absolute inset-0 top-5 flex items-center justify-center text-[10px] text-ink/30 uppercase tracking-wide">
          Add screenshot
        </div>
      )}
    </div>
  );
}

export default function Services() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".svc-head", {
        y: 56,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
      gsap.from(".svc-type-card", {
        y: 40,
        opacity: 0,
        stagger: 0.07,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".svc-types", start: "top 85%", once: true },
      });
      gsap.from(".svc-tail", {
        y: 36,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".svc-tail", start: "top 88%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={ref}
      className="bg-white text-ink py-16 xs:py-20 sm:py-28 md:py-36"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-[1500px] px-4 xs:px-5 sm:px-8">
        <div className="svc-head">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block w-2 h-2 rounded-full bg-ink" />
            <p className="text-[9px] xs:text-[10px] uppercase tracking-[0.24em] text-ink/50">
              Beyond one page
            </p>
          </div>
          <h2
            id="services-heading"
            className="font-display font-bold uppercase leading-[0.88] tracking-tightest text-[clamp(2rem,8.5vw,7rem)]"
          >
            What else we build.
          </h2>
          <p className="mt-6 max-w-xl text-ink/65 text-sm xs:text-base sm:text-lg leading-relaxed">
            Most clients start with a one-pager. When the job genuinely needs more than one scroll,
            these are the shapes it usually takes.
          </p>
        </div>

        <div className="svc-types mt-10 xs:mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-3 gap-3 xs:gap-4 sm:gap-5">
          {WEBSITE_TYPES.map((t) => (
            <div
              key={t.key}
              className="svc-type-card rounded-lg border border-black/10 overflow-hidden hover:border-black/30 transition-colors"
            >
              <SitePreview src={t.img} alt={`${t.name} website example`} />
              <div className="px-2.5 xs:px-3 py-2 xs:py-3 border-t border-black/10">
                <h3 className="font-display font-bold uppercase text-[11px] xs:text-xs sm:text-sm tracking-wide">
                  {t.name}
                </h3>
                <p className="hidden sm:block text-ink/60 text-xs mt-1 leading-snug">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="svc-tail mt-12 xs:mt-16 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 lg:gap-12 items-start border-t border-black/10 pt-8 xs:pt-10">
          <h3 className="font-display font-bold uppercase text-xl xs:text-2xl sm:text-4xl tracking-tightest leading-[0.95] whitespace-nowrap">
            Also: marketing.
          </h3>
          <div className="max-w-2xl">
            <p className="text-ink/65 text-sm xs:text-base sm:text-lg leading-relaxed">
              Performance, social and content campaigns. We take these on for clients whose sites we
              built — we'd rather not run ads at a page we don't rate.
            </p>
            <a
              href={mailtoHref("Marketing enquiry")}
              data-cursor
              className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-black/30 px-5 text-[10px] font-semibold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors"
            >
              Ask about marketing <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

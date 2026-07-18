import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  { key: "booking", name: "Booking", desc: "Calendars, live availability, reservation flows.", img: bookingImg },
  { key: "portfolio", name: "Portfolio", desc: "Case studies and visual work, built to be browsed.", img: portfolioImg },
  { key: "rental", name: "Rental", desc: "Listings, filters, and inquiry flows.", img: rentalImg },
  { key: "business", name: "Business", desc: "Service pages and clear calls to action.", img: businessImg },
  { key: "ecommerce", name: "E-Commerce", desc: "Catalogues, cart, and checkout.", img: ecommerceImg },
  { key: "restaurant", name: "Restaurant", desc: "Menus, hours, and table bookings.", img: restaurantImg },
];

const ITEMS = [
  {
    label: "Website Development", side: "left",
    body: "Strategy, design, build, and ship. Editorial, fast, and accessible on every network — from Suva to the outer islands.",
    types: WEBSITE_TYPES
  },
  {
    label: "Digital Marketing", side: "right",
    body: "Performance, social, and content campaigns that turn attention into outcomes for ambitious Pacific brands."
  },
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
      gsap.from(".svc-title", { y: 100, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 80%" } });
      gsap.from(".svc-row", { y: 60, opacity: 0, stagger: .1, duration: .9, ease: "power3.out", scrollTrigger: { trigger: ".svc-rows", start: "top 80%" } });
      gsap.from(".svc-type-card", { y: 30, opacity: 0, stagger: .06, duration: .7, ease: "power3.out", scrollTrigger: { trigger: ".svc-types", start: "top 85%" } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section id="services" ref={ref} className="bg-white text-ink py-12 xs:py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-[1500px] px-4 xs:px-5 sm:px-8">
        <h2 className="svc-title font-display font-bold uppercase leading-[0.85] tracking-tightest text-[clamp(2rem,8vw,18rem)]">Services</h2>
        <div className="svc-rows mt-8 xs:mt-10 sm:mt-12 border-t border-black/10">
          {ITEMS.map((s, i) => (
            <div key={i} className={`svc-row group flex flex-col gap-3 py-6 xs:py-8 sm:py-12 border-b border-black/10 items-start text-left sm:px-2`}>
              <div className="flex items-center gap-3 xs:gap-4">
                <span className="inline-block w-2 xs:w-2.5 h-2 xs:h-2.5 rounded-full bg-black/80 group-hover:bg-black transition-colors flex-shrink-0" />
                <h3 className="font-display font-bold uppercase text-lg xs:text-2xl sm:text-5xl md:text-7xl tracking-tightest">{s.label}</h3>
              </div>
              <p className="max-w-xl text-ink/70 text-xs xs:text-sm sm:text-lg leading-relaxed">{s.body}</p>

              {s.types && (
                <div className="svc-types mt-4 xs:mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 w-full">
                  {s.types.map((t) => (
                    <div key={t.key} className="svc-type-card rounded-lg border border-black/10 overflow-hidden hover:border-black/30 transition-colors">
                      <SitePreview src={t.img} alt={`${t.name} website example`} />
                      <div className="px-2.5 xs:px-3 py-2 xs:py-3 border-t border-black/10">
                        <h4 className="font-display font-bold uppercase text-[11px] xs:text-xs sm:text-sm tracking-wide">{t.name}</h4>
                        <p className="hidden sm:block text-ink/60 text-xs mt-1 leading-snug">{t.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
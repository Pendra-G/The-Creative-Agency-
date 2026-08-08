import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavPanel from "./NavPanel.jsx";

export default function TopBar({ ready = false }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // The bar sits over the page, so once content starts passing beneath it the
  // wordmark collides with whatever is underneath. A backdrop appears only
  // after the hero has moved, keeping the top of the page clean.
  useEffect(() => {
    // Lenis makes <body> the scroll container, so window.scrollY stays at 0
    // while the page actually moves. Read whichever element is really scrolling.
    const readY = () =>
      window.scrollY ||
      document.scrollingElement?.scrollTop ||
      document.body.scrollTop ||
      0;
    const onScroll = () => setScrolled(readY() > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? "border-b border-line bg-ink/85 backdrop-blur-md" : "border-b border-transparent"
        }`}
        style={{
          opacity: ready ? 1 : 0,
          transform: ready ? "translateY(0)" : "translateY(-14px)",
          transition:
            "opacity 700ms cubic-bezier(0.22,1,0.36,1) 150ms, transform 700ms cubic-bezier(0.22,1,0.36,1) 150ms, background-color 300ms, border-color 300ms",
        }}
      >
        <div className="mx-auto flex max-w-shell items-center justify-between gap-6 px-4 py-4 sm:px-6">
          <Link to="/" data-cursor className="-my-3 shrink-0 py-3 leading-[0.95]">
            <span className="block micro text-white">Website</span>
            <span className="block micro text-white">Portfolio</span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            {/* A way to act at any scroll position, not just at the CTA blocks */}
            <Link
              to="/contact"
              data-cursor
              className="hidden min-h-[40px] items-center rounded-pill bg-white px-5 micro text-ink transition-colors hover:bg-accent xs:inline-flex"
            >
              Start a project
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-haspopup="dialog"
              data-cursor
              className="group -my-3 flex min-h-[44px] items-center gap-2.5 py-3 micro text-white transition-colors hover:text-accent"
            >
            <span className="flex flex-col gap-[3px]" aria-hidden="true">
              <span className="block h-px w-5 bg-current transition-transform duration-300 ease-snap group-hover:-translate-y-[1px]" />
              <span className="block h-px w-5 bg-current transition-transform duration-300 ease-snap group-hover:translate-y-[1px]" />
            </span>
              Menu
            </button>
          </div>
        </div>
      </header>

      <NavPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}

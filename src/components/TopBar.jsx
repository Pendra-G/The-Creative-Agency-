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
      window.scrollY || document.scrollingElement?.scrollTop || document.body.scrollTop || 0;
    const onScroll = () => setScrolled(readY() > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled ? "border-hairline bg-canvas/85 backdrop-blur-md" : "border-transparent"
        }`}
        style={{
          opacity: ready ? 1 : 0,
          transform: ready ? "translateY(0)" : "translateY(-12px)",
          transition:
            "opacity 700ms cubic-bezier(0.22,1,0.36,1) 150ms, transform 700ms cubic-bezier(0.22,1,0.36,1) 150ms, background-color 300ms, border-color 300ms",
        }}
      >
        <div className="mx-auto flex h-16 max-w-shell items-center justify-between gap-3 px-4 sm:gap-6 sm:px-6">
          <Link
            to="/"
            className="display -my-3 flex shrink-0 items-center whitespace-nowrap py-3 text-title-sm tracking-[-0.01em] text-white transition-colors duration-200 hover:text-accent-text"
          >
            WEBSITE PORTFOLIO
          </Link>

          {/* No CTA up here: the accent belongs to one action per view, and a
              second purple pill in the bar competes with the hero's own. The
              menu panel carries the phone number and both call buttons. */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-haspopup="dialog"
              aria-label="Open menu"
              className="group -mr-3 flex h-11 min-w-11 items-center justify-center gap-2.5 rounded-pill px-3 text-nav-link text-white transition-colors duration-200 hover:text-accent-text"
            >
              <span className="flex flex-col gap-[4px]" aria-hidden="true">
                <span className="block h-px w-5 bg-current transition-transform duration-300 ease-editorial group-hover:-translate-y-[1px]" />
                <span className="block h-px w-5 bg-current transition-transform duration-300 ease-editorial group-hover:translate-y-[1px]" />
              </span>
              <span className="hidden sm:inline">Menu</span>
            </button>
          </div>
        </div>
      </header>

      <NavPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}

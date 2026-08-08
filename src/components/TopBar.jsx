import { useState } from "react";
import NavPanel from "./NavPanel.jsx";

export default function TopBar({ ready = false }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50"
        style={{
          opacity: ready ? 1 : 0,
          transform: ready ? "translateY(0)" : "translateY(-14px)",
          transition:
            "opacity 700ms cubic-bezier(0.22,1,0.36,1) 150ms, transform 700ms cubic-bezier(0.22,1,0.36,1) 150ms",
        }}
      >
        <div className="mx-auto flex max-w-shell items-start justify-between gap-6 px-4 py-4 sm:px-6">
          <a href="#home" data-cursor className="-my-3 shrink-0 py-3 leading-[0.95]">
            <span className="block micro text-cream">Website</span>
            <span className="block micro text-cream">Portfolio</span>
          </a>

          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hidden items-center gap-2 sm:flex">
              <span className="h-1.5 w-1.5 rounded-pill bg-gold" aria-hidden="true" />
              <span className="micro text-gold">Available for work</span>
            </span>

            {/* One control, at every size — the panel holds the navigation. */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-haspopup="dialog"
              data-cursor
              className="group -my-3 flex min-h-[44px] items-center gap-2.5 py-3 micro text-cream transition-colors hover:text-gold"
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

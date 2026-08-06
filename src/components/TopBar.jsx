import { useEffect, useState } from "react";
import { SITE } from "../config.js";

const NAV = [
  ["Work", "#work"],
  ["Packages", "#packages"],
  ["Process", "#process"],
  ["Contact", "#contact"],
];

export default function TopBar() {
  const [time, setTime] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Pacific/Fiji",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 text-bone text-[9px] xs:text-[10px] sm:text-[11px] uppercase tracking-[0.18em] bg-ink/85 backdrop-blur-sm">
      <div className="relative grid grid-cols-3 items-center px-3 xs:px-4 sm:px-6 py-2 xs:py-3 border-b border-white/5">
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="sm:hidden text-left text-[8px] xs:text-[10px] font-semibold uppercase tracking-[0.18em] min-h-[32px]"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

        <nav
          aria-label="Primary"
          className="hidden sm:flex flex-wrap items-center justify-start gap-3 sm:gap-5"
        >
          {NAV.map(([label, href]) => (
            <a key={href} href={href} data-cursor className="hover:text-paper text-[10px] sm:text-[11px]">
              {label}
            </a>
          ))}
        </nav>

        <div className="absolute left-1/2 -translate-x-1/2 sm:static sm:translate-x-0 flex justify-center min-w-0">
          <a href="#" data-cursor className="font-bold hover:text-paper text-[8px] xs:text-[9px] sm:text-[11px] truncate">
            THE CREATIVE AGENCY.
          </a>
        </div>

        <div className="hidden sm:flex items-center justify-end gap-1 xs:gap-2 sm:gap-3 text-bone/70 text-[8px] xs:text-[9px] sm:text-[11px]">
          <span className="hidden lg:inline">{SITE.location}</span>
          <span className="hidden lg:inline text-bone/30">—</span>
          <span>{time}</span>
          <span className="text-bone/30">·</span>
          <span>FJT</span>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-nav" className="sm:hidden bg-ink/95 border-t border-white/10 px-4 py-3">
          <nav aria-label="Primary" className="flex flex-col text-[10px] uppercase tracking-[0.18em]">
            {NAV.map(([label, href]) => (
              <a
                key={href}
                href={href}
                data-cursor
                onClick={() => setMenuOpen(false)}
                className="hover:text-paper py-2.5 min-h-[44px] flex items-center"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

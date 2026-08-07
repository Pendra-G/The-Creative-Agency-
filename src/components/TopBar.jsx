import { useEffect, useState } from "react";
import { LogoMark, GridIcon } from "./ui.jsx";

// Kept to four short labels — a fifth wraps the bar onto a second line.
const NAV = [
  ["Work", "#work"],
  ["Motion", "#showcase"],
  ["Pricing", "#packages"],
  ["Contact", "#contact"],
];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function useFijiClock() {
  const [clock, setClock] = useState({ time: "", date: "" });
  useEffect(() => {
    const update = () => {
      // Read the wall clock in Fiji, then format it by hand so the shape
      // matches the reference: "9:41am" and "12 March, 2025".
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Pacific/Fiji",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        day: "numeric",
        month: "numeric",
        year: "numeric",
      }).formatToParts(new Date());
      const get = (t) => parts.find((p) => p.type === t)?.value ?? "";
      const meridiem = get("dayPeriod").toLowerCase();
      setClock({
        time: `${get("hour")}:${get("minute")}${meridiem}`,
        date: `${Number(get("day"))} ${MONTHS[Number(get("month")) - 1]}, ${get("year")}`,
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return clock;
}

export default function TopBar({ ready = false }) {
  const { time, date } = useFijiClock();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-paper/80 backdrop-blur-md"
      style={{
        opacity: ready ? 1 : 0,
        transform: ready ? "translateY(0)" : "translateY(-14px)",
        transition: "opacity 700ms cubic-bezier(0.22,1,0.36,1) 150ms, transform 700ms cubic-bezier(0.22,1,0.36,1) 150ms",
      }}
    >
      <div className="mx-auto flex max-w-shell items-center justify-between gap-6 px-5 py-3 sm:px-8">
        <a
          href="#home"
          data-cursor
          className="flex shrink-0 items-center gap-2 py-3 -my-3 text-base font-semibold tracking-[-0.01em] text-foreground transition-transform duration-300 ease-snap hover:scale-[1.04]"
        >
          <LogoMark className="text-lg text-accent" />
          <span className="hidden xs:inline">The Creative Agency</span>
          <span className="xs:hidden">Creative Agency</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 text-sm font-medium lg:flex">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              data-cursor
              className="whitespace-nowrap text-foreground/70 transition-all duration-300 ease-snap hover:-translate-y-[2px] hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 rounded-control border border-line/80 bg-paper/40 px-3 py-2 text-xs text-foreground/70 backdrop-blur-sm md:flex">
            <span className="text-foreground/45">Local time</span>
            <span className="min-w-[3.5rem] font-medium tabular-nums text-foreground">{time || "—"}</span>
            <span className="text-foreground/30">•</span>
            <span className="font-medium">{date || "—"}</span>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            data-cursor
            className="inline-flex min-h-[40px] items-center gap-2 rounded-control border border-line/80 bg-paper/40 px-4 text-xs font-medium uppercase tracking-[0.05em] text-foreground backdrop-blur-sm transition-colors hover:bg-paper lg:hidden"
          >
            <GridIcon className="text-sm" />
            <span className="hidden xs:inline">{menuOpen ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-nav" className="border-t border-line bg-paper px-5 py-3 sm:px-8 lg:hidden">
          <nav aria-label="Primary" className="flex flex-col text-sm font-medium">
            {NAV.map(([label, href]) => (
              <a
                key={href}
                href={href}
                data-cursor
                onClick={() => setMenuOpen(false)}
                className="flex min-h-[44px] items-center text-foreground/70 transition-colors hover:text-foreground"
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

import { useEffect, useState } from "react";

export default function TopBar(){
  const [time, setTime] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(()=>{
    const update = () => {
      const now = new Date().toLocaleTimeString("en-US", {
        timeZone: "Pacific/Fiji", hour: "2-digit", minute: "2-digit", hour12: true,
      });
      setTime(now);
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  },[]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 text-bone text-[9px] xs:text-[10px] sm:text-[11px] uppercase tracking-[0.18em] bg-ink/85 backdrop-blur-sm">
      <div className="grid grid-cols-2 sm:grid-cols-3 items-center px-3 xs:px-4 sm:px-6 py-2 xs:py-3 border-b border-white/5">
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-left text-[8px] xs:text-[10px] font-semibold uppercase tracking-[0.18em]"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          Menu
        </button>

        <div className="hidden sm:flex flex-wrap items-center justify-start gap-2 xs:gap-3 sm:gap-5">
          <a href="#work" data-cursor className="hover:text-paper text-[8px] xs:text-[10px] sm:text-[11px]">Work</a>
          <a href="#services" data-cursor className="hover:text-paper hidden xs:inline text-[8px] xs:text-[10px] sm:text-[11px]">About</a>
          <a href="#contact" data-cursor className="hover:text-paper text-[8px] xs:text-[10px] sm:text-[11px]">Contact</a>
        </div>

        <div className="flex justify-center min-w-0">
          <a href="#" data-cursor className="font-bold hover:text-paper text-[8px] xs:text-[9px] sm:text-[11px] truncate">THE CREATIVE AGENCY.</a>
        </div>

        <div className="hidden sm:flex items-center justify-end gap-1 xs:gap-2 sm:gap-3 text-bone/70 text-[8px] xs:text-[9px] sm:text-[11px]">
          <span className="hidden lg:inline">VitiLevu, Fiji</span>
          <span className="hidden lg:inline text-bone/30">—</span>
          <span className="hidden xs:inline">{time}</span>
          <span className="hidden xs:inline text-bone/30">·</span>
          <span className="hidden sm:inline">EST</span>
        </div>
      </div>

      {menuOpen && (
        <div className="sm:hidden bg-ink/95 border-t border-white/10 px-4 py-3">
          <nav className="flex flex-col gap-3 text-[10px] uppercase tracking-[0.18em]">
            <a href="#work" data-cursor className="hover:text-paper">Work</a>
            <a href="#services" data-cursor className="hover:text-paper">About</a>
            <a href="#contact" data-cursor className="hover:text-paper">Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
}
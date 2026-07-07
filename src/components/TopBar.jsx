import { useEffect, useState } from "react";

export default function TopBar(){
  const [time, setTime] = useState("");
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
    <header className="fixed top-0 left-0 right-0 z-50 text-bone text-[10px] sm:text-[11px] uppercase tracking-[0.18em] bg-ink/85 backdrop-blur-sm">
      <div className="grid grid-cols-3 items-center px-4 sm:px-6 py-3 border-b border-white/5">
        <nav className="flex items-center gap-5 sm:gap-7">
          <a href="#work" data-cursor className="hover:text-paper">Work</a>
          <a href="#services" data-cursor className="hover:text-paper hidden sm:inline">About</a>
          <a href="#contact" data-cursor className="hover:text-paper">Contact</a>
        </nav>

        <div className="flex justify-center">
          <a href="#" data-cursor className="font-bold hover:text-paper">CREATIVE AGENCY.</a>
        </div>

        <div className="flex items-center justify-end gap-2 sm:gap-3 text-bone/70">
          <span className="hidden md:inline">VitiLevu, Fiji</span>
          <span className="hidden md:inline text-bone/30">—</span>
          <span>{time}</span>
          <span className="text-bone/30">·</span>
          <span>EST</span>
        </div>
      </div>
    </header>
  );
}
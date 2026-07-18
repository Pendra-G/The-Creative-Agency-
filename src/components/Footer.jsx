import Magnetic from "./Magnetic.jsx";

export default function Footer(){
  return (
    <footer id="footer" className="bg-white text-ink pt-12 xs:pt-16 sm:pt-20 md:pt-28 pb-6 xs:pb-8 border-t border-black/10">
      <div className="mx-auto max-w-[1500px] px-4 xs:px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 pb-12 sm:pb-16 md:pb-24">
          <div className="grid grid-cols-2 gap-4 xs:gap-6">
            <div>
              <p className="text-[9px] xs:text-[10px] uppercase tracking-[0.2em] text-ink/50 mb-3">Socials</p>
              <ul className="space-y-2">
                {[
                  { name: "Facebook", url: "https://www.facebook.com/profile.php?id=61565173942247" },
                  { name: "Instagram", url: "#" },
                  { name: "LinkedIn", url: "#" }
                ].map(s=>(
                  <li key={s.name}>
                    <a href={s.url} target={s.url !== "#" ? "_blank" : undefined} rel={s.url !== "#" ? "noopener noreferrer" : undefined} data-cursor className="inline-flex items-center gap-2 border border-black/30 rounded-full px-3 py-1.5 xs:py-2 uppercase tracking-[0.15em] text-[9px] xs:text-[10px] hover:bg-black hover:text-white transition-colors whitespace-nowrap">
                      {s.name} <span>→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[9px] xs:text-[10px] uppercase tracking-[0.2em] text-ink/50 mb-3">Contact</p>
              <ul className="space-y-2">
                <li><a href="mailto:hello@creative.agency" data-cursor className="inline-flex items-center gap-2 border border-black/30 rounded-full px-3 py-1.5 xs:py-2 text-[9px] xs:text-[10px] uppercase tracking-[0.15em] hover:bg-black hover:text-white transition-colors truncate">{`contact`}@... <span>→</span></a></li>
                <li><a href="tel:+6792921000" data-cursor className="inline-flex items-center gap-2 border border-black/30 rounded-full px-3 py-1.5 xs:py-2 text-[9px] xs:text-[10px] uppercase tracking-[0.15em] hover:bg-black hover:text-white transition-colors whitespace-nowrap">+679 2921000 <span>→</span></a></li>
                <li><a href="tel:+6792921000" data-cursor className="inline-flex items-center gap-2 border border-black/30 rounded-full px-3 py-1.5 xs:py-2 text-[9px] xs:text-[10px] uppercase tracking-[0.15em] hover:bg-black hover:text-white transition-colors whitespace-nowrap">+679 8091770 <span>→</span></a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-start justify-start sm:justify-center gap-4 xs:gap-6">
            <p className="font-display font-medium text-xl xs:text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tightest text-ink">Clean code. Sharp design. Limitless possibilities.</p>
          </div>
        </div>

        <div className="mt-6 xs:mt-8 pt-4 xs:pt-6 border-t border-black/10 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 xs:gap-3 text-[9px] xs:text-[10px] uppercase tracking-[0.18em] text-ink">
          <p>© {new Date().getFullYear()} Creative Agency. All rights reserved.</p>
          <p>Design and built in Fiji.</p>
        </div>
      </div>
    </footer>
  );
}
import Magnetic from "./Magnetic.jsx";

export default function Footer(){
  return (
    <footer id="contact" className="bg-ink text-bone pt-20 sm:pt-28 pb-8 border-t border-white/10">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-16 sm:pb-24">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-bone/50 mb-3">Socials</p>
              <ul className="space-y-2 text-sm">
                {["Facebook","Instagram","LinkedIn"].map(s=>(
                  <li key={s}><a href="#" data-cursor className="inline-flex items-center gap-2 border border-bone/30 rounded-full px-3 py-1 uppercase tracking-[0.15em] text-[11px] hover:bg-bone hover:text-ink transition-colors">{s} <span>→</span></a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-bone/50 mb-3">Contact</p>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:hello@creative.agency" data-cursor className="inline-flex items-center gap-2 border border-bone/30 rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.15em] hover:bg-bone hover:text-ink transition-colors">contact@creativeagency.com <span>→</span></a></li>
                <li><a href="tel:+6792921000" data-cursor className="inline-flex items-center gap-2 border border-bone/30 rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.15em] hover:bg-bone hover:text-ink transition-colors">+679 2921000 <span>→</span></a></li>
              </ul>
            </div>
          </div>

          <div className="md:pl-8 flex flex-col items-start justify-center gap-6">
            <p className="font-display font-medium text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tightest max-w-md">Clean code. Sharp design. Limitless possibilities.</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] uppercase tracking-[0.18em] text-bone/50">
          <p>© {new Date().getFullYear()} Creative Agency. All rights reserved.</p>
          <p>Design and built in Fiji.</p>
        </div>
      </div>
    </footer>
  );
}
const GIFS=[
 "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
 "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
 "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
 "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
 "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
 "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
 "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
 "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
 "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
 "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
 "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
 "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
 "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
 "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
 "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
 "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
 "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
 "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
 "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
 "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
 "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
];
const R1=GIFS.slice(0,11), R2=GIFS.slice(11,21);
export default function Marquee(){
  return (
    <section className="relative bg-black text-bone pt-16 xs:pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-8 sm:pb-10 overflow-hidden">
      <style>{`
        .marquee-row { display: flex; gap: 0.5rem; align-items: center; width: max-content; }
        @media (min-width: 640px) { .marquee-row { gap: 1rem; } }
        .marquee-right { animation: marquee-right 62s linear infinite; }
        .marquee-left { animation: marquee-left 62s linear infinite; }
        .marquee-row:hover { animation-play-state: paused; }
        @keyframes marquee-right { from { transform: translate3d(-33.333%,0,0); } to { transform: translate3d(0,0,0); } }
        @keyframes marquee-left { from { transform: translate3d(0,0,0); } to { transform: translate3d(-33.333%,0,0); } }
        @media (prefers-reduced-motion: reduce) { .marquee-right, .marquee-left { animation: none; } }
      `}</style>
      <div className="flex flex-col gap-2 xs:gap-2.5 sm:gap-3">
        <div className="marquee-row marquee-right">
          {[...R1,...R1,...R1].map((src,i)=>(<img key={`r1-${i}`} src={src} alt="" loading="lazy" decoding="async" className="marquee-tile"/>))}
        </div>
        <div className="marquee-row marquee-left">
          {[...R2,...R2,...R2].map((src,i)=>(<img key={`r2-${i}`} src={src} alt="" loading="lazy" decoding="async" className="marquee-tile"/>))}
        </div>
      </div>
    </section>
  );
}

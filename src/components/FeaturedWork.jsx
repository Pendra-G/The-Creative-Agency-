import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PLLFI from "../assets/PLLFI.png";
import TropicXImage from "../assets/TropicX.png";
gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { title:"TropicX", url:"https://tropicx-design-studio.framer.website/", type:"Architecture Studio", year:"2026", location:"Nadi, Fiji",
    img:TropicXImage,
    description:"TropicX is a contemporary architecture and design studio based in Nadi, Fiji. Their site needed to feel as considered as the buildings they ship — a cinematic homepage, project index and case-study template that puts their portfolio centre stage while keeping the experience fast on island-mobile networks.",
    scope:["Brand Direction","Web Design","Framer Development","Motion"] },
    
  { title:"PLLFI", url:"https://www.pllfi.org/", type:"NGO Website", year:"2025", location:"Suva, Fiji",
    img:PLLFI,
    description:"PLLFI is a non-governmental organisation in Suva, Fiji, dedicated to community and environmental programmes across the Pacific. We designed and developed a content-first website that surfaces their mission, programmes and impact stories with a calm editorial structure and accessible typography.",
    scope:["Strategy","UX/UI Design","Web Development","CMS"] },
  
];

function ProjectModal({ project, onClose }){
  useEffect(()=>{
    const onKey = (e)=> e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return ()=> { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  },[onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 xs:p-3 p-0 bg-ink/85 backdrop-blur-md" onClick={onClose} data-cursor>
      <div
        className="relative w-full sm:max-w-4xl bg-carbon border border-white/10 rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[calc(100vh-48px)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} aria-label="Close" data-cursor className="absolute top-3 xs:top-4 right-3 xs:right-4 z-10 w-10 h-10 rounded-full border border-bone/30 text-bone hover:bg-bone hover:text-ink transition-colors text-xl leading-none">×</button>
        <div className="relative overflow-hidden flex-shrink-0 h-[200px] xs:h-[300px] sm:h-[45vh]">
          <img src={project.img} alt={project.title} className="w-full h-full object-cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div className="p-4 xs:p-6 sm:p-10 overflow-auto" style={{ flex: '1 1 auto' }}>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4 mb-4">
            <h3 className="font-display font-bold uppercase text-2xl xs:text-4xl sm:text-6xl tracking-tightest">{project.title}</h3>
            <a href={project.url} target="_blank" rel="noreferrer" data-cursor className="link-btn outline text-xs xs:text-sm">Visit Live Site <span>↗</span></a>
          </div>
          <p className="text-[10px] xs:text-[11px] uppercase tracking-[0.2em] text-bone/50 mb-4 xs:mb-6">{project.type} · {project.year} · {project.location}</p>
          <p className="text-bone/80 text-xs xs:text-base sm:text-lg leading-relaxed mb-4 xs:mb-6">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.scope.map(s => (
              <span key={s} className="text-[10px] xs:text-[11px] uppercase tracking-[0.2em] border border-bone/30 rounded-full px-3 py-1.5 xs:py-2 text-bone/80">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedWork(){
  const ref=useRef(null);
  const [open, setOpen] = useState(null);
  useEffect(()=>{
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx=gsap.context(()=>{
      gsap.from(".fw-card",{y:80,opacity:0,duration:1,stagger:.08,ease:"power3.out",scrollTrigger:{trigger:ref.current,start:"top 80%"}});
      gsap.from(".fw-title",{y:80,opacity:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:ref.current,start:"top 80%"}});
    },ref);
    return ()=>ctx.revert();
  },[]);
  return (
    <section id="work" ref={ref} className="bg-ink text-bone py-12 xs:py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-[1500px] px-4 xs:px-5 sm:px-8">
        <h2 className="fw-title font-display font-bold uppercase leading-[0.9] tracking-tightest text-[clamp(2rem,9vw,11rem)]">Featured Work</h2>
        <div className="mt-10 xs:mt-12 sm:mt-14 grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-5 sm:gap-6">
          {PROJECTS.map((p,i)=>(
            <button key={i} type="button" onClick={()=>setOpen(p)} data-cursor className="fw-card group block text-left w-full rounded-2xl transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white/20">
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-carbon">
                <img src={p.img} alt={p.title} loading="lazy" decoding="async" className="w-full h-full object-contain transition-transform duration-[1200ms] ease-out group-hover:scale-105"/>
              </div>
              <div className="mt-2 xs:mt-3 flex flex-col xs:flex-row items-start xs:items-end justify-between gap-2 xs:gap-4">
                <p className="font-display uppercase text-xs xs:text-sm sm:text-base font-medium tracking-[0.04em] flex-1 min-w-0">{p.title}</p>
                <p className="text-[9px] xs:text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-bone/50 whitespace-nowrap">{p.year}</p>
              </div>
              <p className="text-[9px] xs:text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-bone/40 mt-1">{p.type} · {p.location}</p>
            </button>
          ))}
        </div>
      
      </div>
      {open && <ProjectModal project={open} onClose={()=>setOpen(null)}/>}
    </section>
  );
}
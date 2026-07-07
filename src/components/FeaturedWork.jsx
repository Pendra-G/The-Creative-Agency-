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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-ink/85 backdrop-blur-md" onClick={onClose} data-cursor>
      <div className="relative w-full max-w-4xl bg-carbon border border-white/10 rounded-2xl overflow-hidden" onClick={(e)=>e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close" data-cursor className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full border border-bone/30 text-bone hover:bg-bone hover:text-ink transition-colors text-xl leading-none">×</button>
        <div className="relative aspect-[16/9] overflow-hidden">
          <img src={project.img} alt={project.title} className="w-full h-full object-cover"/>
        </div>
        <div className="p-6 sm:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
            <h3 className="font-display font-bold uppercase text-4xl sm:text-6xl tracking-tightest">{project.title}</h3>
            <a href={project.url} target="_blank" rel="noreferrer" data-cursor className="link-btn outline">Visit Live Site <span>↗</span></a>
          </div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-bone/50 mb-6">{project.type} · {project.year} · {project.location}</p>
          <p className="text-bone/80 text-base sm:text-lg leading-relaxed mb-6">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.scope.map(s => (
              <span key={s} className="text-[11px] uppercase tracking-[0.2em] border border-bone/30 rounded-full px-3 py-1 text-bone/80">{s}</span>
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
    <section id="work" ref={ref} className="bg-ink text-bone py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <h2 className="fw-title font-display font-bold uppercase leading-[0.9] tracking-tightest text-[clamp(3rem,12vw,11rem)]">Featured Work</h2>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {PROJECTS.map((p,i)=>(
            <button key={i} type="button" onClick={()=>setOpen(p)} data-cursor className="fw-card group block text-left w-full">
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-carbon">
                <img src={p.img} alt={p.title} loading="lazy" decoding="async" className="w-full h-full object-contain transition-transform duration-[1200ms] ease-out group-hover:scale-105"/>
              </div>
              <div className="mt-3 flex items-end justify-between gap-4">
                <p className="font-display uppercase text-sm sm:text-base font-medium tracking-[0.04em]">{p.title}</p>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-bone/50">{p.year}</p>
              </div>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-bone/40 mt-1">{p.type} · {p.location}</p>
            </button>
          ))}
        </div>
      
      </div>
      {open && <ProjectModal project={open} onClose={()=>setOpen(null)}/>}
    </section>
  );
}
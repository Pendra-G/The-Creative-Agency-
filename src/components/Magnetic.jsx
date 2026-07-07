import { useEffect, useRef } from "react";
export default function Magnetic({as:Tag="button",className="",children,...rest}){
  const ref=useRef(null);
  useEffect(()=>{
    const el=ref.current; if(!el) return;
    let raf=null;
    const move=(e)=>{ const r=el.getBoundingClientRect(); const x=e.clientX-r.left-r.width/2, y=e.clientY-r.top-r.height/2; if(raf) cancelAnimationFrame(raf); raf=requestAnimationFrame(()=>{ el.style.transform=`translate3d(${x*.25}px,${y*.25}px,0)`; }); };
    const leave=()=>{ if(raf) cancelAnimationFrame(raf); el.style.transform="translate3d(0,0,0)"; };
    el.addEventListener("mousemove",move); el.addEventListener("mouseleave",leave);
    return ()=>{ el.removeEventListener("mousemove",move); el.removeEventListener("mouseleave",leave); if(raf) cancelAnimationFrame(raf); };
  },[]);
  return <Tag ref={ref} className={`magnetic-target ${className}`} {...rest}>{children}</Tag>;
}
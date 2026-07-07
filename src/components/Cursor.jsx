import { useEffect, useRef } from "react";
export default function Cursor(){
  const d=useRef(null), f=useRef(null);
  useEffect(()=>{
    if(window.matchMedia("(hover: none)").matches) return;
    const dot=d.current, fol=f.current;
    let mx=-100,my=-100,fx=-100,fy=-100,raf;
    const move=(e)=>{ mx=e.clientX; my=e.clientY; dot.style.transform=`translate3d(${mx}px,${my}px,0) translate(-50%,-50%)`; };
    const tick=()=>{ fx+=(mx-fx)*.18; fy+=(my-fy)*.18; fol.style.transform=`translate3d(${fx}px,${fy}px,0) translate(-50%,-50%)`; raf=requestAnimationFrame(tick); };
    const over=(e)=>{ if(e.target.closest("a,button,[data-cursor]")) fol.classList.add("hovering"); };
    const out=(e)=>{ if(e.target.closest("a,button,[data-cursor]")) fol.classList.remove("hovering"); };
    window.addEventListener("mousemove",move,{passive:true});
    document.addEventListener("mouseover",over,{passive:true});
    document.addEventListener("mouseout",out,{passive:true});
    raf=requestAnimationFrame(tick);
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener("mousemove",move); document.removeEventListener("mouseover",over); document.removeEventListener("mouseout",out); };
  },[]);
  return (<><div ref={d} className="cursor-dot"/><div ref={f} className="cursor-follower"/></>);
}
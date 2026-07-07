import { useEffect, useState } from "react";
export default function useReducedMotion(){
  const [r,setR]=useState(false);
  useEffect(()=>{
    const m=window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(m.matches);
    const h=(e)=>setR(e.matches);
    m.addEventListener("change",h); return ()=>m.removeEventListener("change",h);
  },[]);
  return r;
}
import gsap from "gsap";
export const split = (el) => {
  if (!el) return [];
  const text = el.textContent;
  el.textContent = "";
  const allCharSpans = [];
  const words = text.split(/(\s+)/);
  words.forEach(word => {
    if (word === "") return;
    if (word.trim() === "") {
      const s = document.createElement("span");
      s.style.display = "inline-block";
      s.textContent = "\u00A0";
      el.appendChild(s);
    } else {
      const wordWrapper = document.createElement("span");
      wordWrapper.style.display = "inline-block";
      wordWrapper.style.whiteSpace = "nowrap";
      [...word].forEach(char => {
        const s = document.createElement("span");
        s.style.display = "inline-block";
        s.style.willChange = "transform,opacity";
        s.textContent = char;
        wordWrapper.appendChild(s);
        allCharSpans.push(s);
      });
      el.appendChild(wordWrapper);
    }
  });
  return allCharSpans;
};
export const reveal=(chars,opts={})=>{ const {y=70,stagger=.025,d=1,delay=0}=opts; gsap.from(chars,{opacity:0,y,stagger,duration:d,delay,ease:"power3.out"}); };
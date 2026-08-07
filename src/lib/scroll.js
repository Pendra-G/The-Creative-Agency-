// Single place that owns the Lenis instance, so anything needing a scroll lock
// (the intro loader today, overlays later) doesn't have to reach into React state.
let lenis = null;

export const setLenis = (instance) => {
  lenis = instance;
};

export const getLenis = () => lenis;

export const stopScroll = () => {
  lenis?.stop();
  document.documentElement.classList.add("is-locked");
};

export const startScroll = () => {
  lenis?.start();
  document.documentElement.classList.remove("is-locked");
};

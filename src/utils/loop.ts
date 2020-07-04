export const loop = (fn: () => void) => {
  window.requestAnimationFrame(() => loop(fn));
  fn();
};

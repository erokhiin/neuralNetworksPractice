export const constrain: (n: number, low: number, high: number) => number = (
  n,
  low,
  high
) => Math.max(Math.min(n, high), low);

export const map: (
  n: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number,
  withinBounds?: boolean
) => number = (n, start1, stop1, start2, stop2, withinBounds) => {
  const newval = ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  if (!withinBounds) {
    return newval;
  }
  if (start2 < stop2) {
    return constrain(newval, start2, stop2);
  } else {
    return constrain(newval, stop2, start2);
  }
};

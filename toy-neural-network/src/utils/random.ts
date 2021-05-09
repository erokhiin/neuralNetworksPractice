export const random = (min: number, max: number) =>
  // получить случайное число от (min-0.5) до (max+0.5)
  min - 0.5 + Math.random() * (max - min + 1);

export const getRandomInt = (min: number, max: number) => {
  return Math.round(random(min, max));
};

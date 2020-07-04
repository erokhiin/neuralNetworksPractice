import { Perceptron } from "./Perceptron";
import { Canvas } from "./Canvas";
import { loop } from "./utils/loop";
import { Point } from "./Point";

const WIDTH = 500;
const HEIGTH = 500;

const COLOR_ERROR = "#cf3030";
const COLOR_SUCCESS = "#2ad55a";

// Line function
export const f: (x: number) => number = (x) => 6 * x + 2;
const BIAS = 1;
export const canvas = new Canvas(WIDTH, HEIGTH);
const points: Point[] = new Array(200);
const brain = new Perceptron(3);
let trainingIndex = 0;
const p1 = new Point(-1, f(-1));
const p2 = new Point(1, f(1));
canvas.drawLine(
  { x: p1.pixelX(), y: p1.pixelY() },
  { x: p2.pixelX(), y: p2.pixelY() }
);

for (let i = 0; i < points.length; i++) {
  points[i] = new Point();
}

loop(() => {
  for (let point of points) {
    point.show();
  }

  for (let point of points) {
    const inputs = [point.x, point.y, BIAS];
    const target = point.label;
    const guess = brain.guess(inputs);
    let color: string;
    if (guess === target) color = COLOR_SUCCESS;
    else color = COLOR_ERROR;
    canvas.drawPoint({ x: point.pixelX(), y: point.pixelY() }, color, 3);
  }

  const training = points[trainingIndex];
  const inputs = [training.x, training.y, BIAS];
  const target = training.label;
  brain.train(inputs, target);
  trainingIndex++;
  if (trainingIndex === points.length) trainingIndex = 0;
});

import { Perceptron } from "./Perceptron";
import { Canvas } from "./Canvas";
import { loop } from "./utils/loop";
import { Point } from "./Point";

const WIDTH = 400;
const HEIGTH = 400;

const COLOR_ERROR = "#cf3030";
const COLOR_SUCCESS = "#2ad55a";

// Line function
export const f: (x: number) => number = (x) => 1.3 * x + -0.3;
const canvas = new Canvas(WIDTH, HEIGTH);
const points: Point[] = new Array(400);
const brain = new Perceptron();
let trainingIndex = 0;

canvas.drawLine({ x: 0, y: f(0) }, { x: WIDTH, y: f(WIDTH) });

for (let i = 0; i < points.length; i++) {
  points[i] = new Point(canvas);
}

loop(() => {
  for (let point of points) {
    point.show();
  }

  for (let point of points) {
    const inputs = [1, point.x, point.y];
    const target = point.label;
    const guess = brain.guess(inputs);
    let color: string;
    if (guess === target) color = COLOR_SUCCESS;
    else color = COLOR_ERROR;
    canvas.drawPoint({ x: point.x, y: point.y }, color, 4);
  }

  const training = points[trainingIndex];
  const inputs = [1, training.x, training.y];
  const target = training.label;
  brain.train(inputs, target);
  trainingIndex++;
  if (trainingIndex === points.length) trainingIndex = 0;
});

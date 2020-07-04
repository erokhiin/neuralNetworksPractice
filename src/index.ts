import { Perceptron } from "./Perceptron";
import { Canvas } from "./Canvas";
import { loop } from "./utils/loop";
import { Point } from "./Point";

const canvas = new Canvas(320, 320);
const points: Point[] = new Array(500);
const brain = new Perceptron();
let trainingIndex = 0;
canvas.drawLine({ x: 0, y: 0 }, { x: 320, y: 320 });

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
    let collor: number;
    if (guess === target) collor = 224;
    else collor = 0;
    canvas.drawPoint({ x: point.x, y: point.y }, collor, 6);
  }
  const training = points[trainingIndex];
  const inputs = [1, training.x, training.y];
  const target = training.label;
  brain.train(inputs, target);
  trainingIndex++;
  if (trainingIndex === points.length) trainingIndex = 0;
});

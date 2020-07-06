import { Perceptron } from "./Perceptron";
import { Canvas } from "../utils/Canvas";
import { loop } from "../utils/loop";
import { Point } from "./Point";

const WIDTH = 500;
const HEIGTH = 500;
const BIAS = 1;

const COLOR_ERROR = "#cf3030";
const COLOR_SUCCESS = "#2ad55a";

export const canvas = new Canvas(
  document.querySelector("#perceptron"),
  WIDTH,
  HEIGTH
);
// Line function
export const f: (x: number) => number = (x) => 0.89 * x + 0.2;
const points: Point[] = new Array(200);
for (let i = 0; i < points.length; i++) {
  points[i] = new Point();
}
const brain = new Perceptron(3, 0.005);
const p1 = new Point(-1, f(-1));
const p2 = new Point(1, f(1));
let count = 0;
export const perceptronModule = () => {
  loop(() => {
    canvas.clear();

    canvas.drawLine(
      { x: p1.pixelX(), y: p1.pixelY() },
      { x: p2.pixelX(), y: p2.pixelY() }
    );
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

    const training = points[count];
    const inputs = [training.x, training.y, BIAS];
    const target = training.label;
    brain.train(inputs, target);
    const p3 = new Point(-1, brain.guessY(-1));
    const p4 = new Point(1, brain.guessY(1));
    canvas.drawLine(
      { x: p3.pixelX(), y: p3.pixelY() },
      { x: p4.pixelX(), y: p4.pixelY() }
    );
    count++;
    if (count === points.length) count = 0;
  });
};

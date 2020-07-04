import { random } from "./utils/random";
import { Canvas } from "./Canvas";
import { f } from ".";

const COLOR_A = "#3eaae0";
const COLOR_B = "#d991ed";
export class Point {
  label: number;
  canvas: Canvas;
  x: number;
  y: number;
  constructor(canvas: Canvas) {
    this.canvas = canvas;
    this.x = random(0, canvas.width);
    this.y = random(0, canvas.height);
    if (this.y < f(this.x)) this.label = -1;
    else this.label = 1;
  }
  show() {
    let color: string;
    if (this.label === 1) color = COLOR_A;
    else color = COLOR_B;
    this.canvas.drawPoint({ x: this.x, y: this.y }, color, 8);
  }
}

import { random } from "./utils/random";
import { Canvas } from "./Canvas";

export class Point {
  label: number;
  canvas: Canvas;
  x: number;
  y: number;
  constructor(canvas: Canvas) {
    this.canvas = canvas;
    this.x = random(0, canvas.width);
    this.y = random(0, canvas.height);
    if (this.y < this.x) this.label =-1;
    else this.label = 1;
  }
  show() {
    let collor: number
    if (this.label === 1) collor = 283
    else collor = 124
    this.canvas.drawPoint({x: this.x, y: this.y}, collor, 10)
  }
}

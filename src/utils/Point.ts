import { random } from "./random";
import { Canvas } from "./Canvas";
import { map } from "./map";

const COLOR_A = "white";
const COLOR_B = "black";
export class Point {
  label: number;
  canvas: Canvas;
  x: number;
  y: number;

  constructor(
    f: (x: number) => number,
    canvas: Canvas,
    x = random(-1, 1),
    y = random(-1, 1),
  ) {
    this.x = x;
    this.y = y;
    this.canvas = canvas;
    if (this.y < f(this.x)) this.label = -1;
    else this.label = 1;
  }
  pixelX() {
    return map(this.x, -1, 1, 0, this.canvas.width);
  }
  pixelY() {
    return map(this.y, -1, 1, this.canvas.height, 0);
  }
  show() {
    let color: string;
    if (this.label === 1) color = COLOR_A;
    else color = COLOR_B;
    this.canvas.drawPoint(
      { x: this.pixelX(), y: this.pixelY() },
      color,
      6,
      true
    );
  }
}

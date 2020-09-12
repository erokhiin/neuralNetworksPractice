import { random } from "./random";
import { Canvas } from "./Canvas";
import { f, canvas } from "../modules/linearClasifierModule";
import { map } from "./map";

const COLOR_A = "white";
const COLOR_B = "black";
export class Point {
  label: number;
  canvas: Canvas;
  x: number;
  y: number;

  constructor(x = random(-1, 1), y = random(-1, 1)) {
    this.x = x;
    this.y = y;
    if (this.y < f(this.x)) this.label = -1;
    else this.label = 1;
  }
  pixelX() {
    return map(this.x, -1, 1, 0, canvas.width);
  }
  pixelY() {
    return map(this.y, -1, 1, canvas.height, 0);
  }
  show() {
    let color: string;
    if (this.label === 1) color = COLOR_A;
    else color = COLOR_B;
    canvas.drawPoint({ x: this.pixelX(), y: this.pixelY() }, color, 6, true);
  }
}

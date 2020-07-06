type Point = {
  x: number;
  y: number;
};
export class Canvas {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  width: number;
  height: number;

  constructor(canvas: HTMLCanvasElement ,width: number, height: number) {
    this.width = width;
    this.height = height;
    this.canvas = canvas;
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext("2d");
  }

  drawPoint(p: Point, color: string, size: number = 6, stroke?: boolean) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, size, 0, 2 * Math.PI, true);
    this.ctx.fill();
    if (stroke) this.ctx.stroke();
  }
  drawLine(start: Point, end: Point) {
    this.ctx.beginPath();
    this.ctx.moveTo(start.x, start.y);
    this.ctx.lineTo(end.x, end.y);
    this.ctx.stroke();
  }
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}

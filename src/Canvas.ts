type Point = {
  x: number;
  y: number;
};
export class Canvas {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.canvas = document.querySelector("canvas");
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  }
  drawPoint(p: Point, color: string, size: number = 6) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, size, 0, 2 * Math.PI, true);
    this.ctx.fill();
  }
  drawLine(start: Point, end: Point) {
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "hsl(250, 0%, 42%)";
    this.ctx.beginPath();
    this.ctx.moveTo(start.x, start.y);
    this.ctx.lineTo(end.x, end.y);
    this.ctx.stroke();
  }
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}

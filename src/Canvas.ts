type Point = {
    x: number;
    y: number
}
export class Canvas {
    private dpi = window.devicePixelRatio || 1;
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width * this.dpi
        this.height = height * this.dpi
        this.canvas = document.querySelector("canvas");
        this.canvas.width = width * this.dpi;
        this.canvas.height = height * this.dpi;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    }
    drawPoint(p: Point, hue: number = 100, size: number = 6) {
        this.ctx.fillStyle = `hsl(${(hue % 360) + 1}, 70%, 50%)`
        this.ctx.beginPath()
        this.ctx.arc(p.x * this.dpi, p.y * this.dpi, size, 0, Math.PI * 2, true)
        this.ctx.fill()
        this.ctx.stroke();
      }
    drawLine(start: Point, end: Point) {
        this.ctx.beginPath();
        this.ctx.moveTo(start.x * this.dpi, start.y* this.dpi);
        this.ctx.lineTo(end.x *  this.dpi ,end.y *  this.dpi);
        this.ctx.stroke();
    }
    clear() {
        this.ctx.clearRect(0, 0, this.width * this.dpi, this.height * this.dpi);
    }
}
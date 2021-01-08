import p5 from "p5";
import { Perceptron } from "../library/Perceptron";
import { random } from "../utils/random";

let brain: Perceptron

const X_MIN = -1;
const Y_MIN = -1;
const X_MAX = 1;
const Y_MAX = 1;
const BIAS = 1;
const LINE_FUNCTION: (x: number) => number = (x) => 0.89 * x + 0.2;

let count = 0;
let training = new Array(2000);

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(400, 400)
    brain = new Perceptron(3, 0.005);

    for (let i = 0; i < training.length; i++) {
      const x = random(-1, 1)
      const y = random(-1, 1)
      const answer = y < LINE_FUNCTION(x) ? -1 : 1
      training[i] = {
        input: [x, y, BIAS],
        output: answer
      }
    }
  }
  p.draw = () => {
    p.background(0);

    p.strokeWeight(1);
    p.stroke(255);
    let x1 = p.map(X_MIN, X_MIN, X_MAX, 0, p.width);
    let y1 = p.map(LINE_FUNCTION(X_MIN), Y_MIN, Y_MAX, p.height, 0);
    let x2 = p.map(X_MAX, X_MIN, X_MAX, 0, p.width);
    let y2 = p.map(LINE_FUNCTION(X_MAX), Y_MIN, Y_MAX, p.height, 0);
    p.line(x1, y1, x2, y2);

    p.stroke(255);
    p.strokeWeight(2);
    x1 = X_MIN;
    y1 = brain.guessY(x1);
    x2 = X_MAX;
    y2 = brain.guessY(x2)

    x1 = p.map(x1, X_MIN, X_MAX, 0, p.width);
    y1 = p.map(y1, Y_MIN, Y_MAX, p.height, 0);
    x2 = p.map(x2, X_MIN, X_MAX, 0, p.width);
    y2 = p.map(y2, Y_MIN, Y_MAX, p.height, 0);
    p.line(x1, y1, x2, y2);


    brain.train(training[count].input, training[count].output);
    count = (count + 1) % training.length;

    for (let i = 0; i < count; i++) {
      p.stroke(255);
      p.strokeWeight(1);
      p.fill(255);
      let guess = brain.guess(training[i].input);
      if (guess > 0) p.noFill();

      let x = p.map(training[i].input[0], X_MIN, X_MAX, 0, p.width);
      let y = p.map(training[i].input[1], Y_MIN, Y_MAX, p.height, 0);
      p.ellipse(x, y, 8, 8);
      p.fill(255);
    }
  }
}

export const linearClasifierModule = (node: HTMLElement) => new p5(sketch, node)

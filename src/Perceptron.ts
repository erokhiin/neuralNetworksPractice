import { random } from "./utils/random";

export class Perceptron {
  private weights: number[];
  private learningRate: number;
  constructor(n: number, lerningRate: number) {
    this.learningRate = lerningRate;
    this.weights = new Array(n);
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] = random(-1, 1);
    }
  }
  private sign(n: number) {
    if (n < 0) return -1;
    return 1;
  }
  guess(inputs: number[]) {
    let sum = 0;
    for (let i = 0; i < this.weights.length; i++) {
      sum += inputs[i] * this.weights[i];
    }
    let output = this.sign(sum);
    return output;
  }
  guessY(x: number) {
    const w = this.weights;
    return -(w[2] / w[1]) - (w[0] / w[1]) * x;
  }
  train(inputs: number[], target: number) {
    const guess = this.guess(inputs);
    const error = target - guess;
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] += error * inputs[i] * this.learningRate;
    }
  }
}

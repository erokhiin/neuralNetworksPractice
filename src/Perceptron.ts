import { random } from "./utils/random";

export class Perceptron {
  private weights: number[];
  private learningRate = 0.01;
  constructor(n: number) {
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
  train(inputs: number[], target: number) {
    const guess = this.guess(inputs);
    const error = target - guess;
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] += error * inputs[i] * this.learningRate;
    }
  }
}

import { Matrix } from "./Matrix";
const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));
export class NeuralNetwork {
  inputNodes: number;
  hiddenNodes: number;
  outputNodes: number;
  weightsIH: Matrix;
  weightsHO: Matrix;
  biasH: Matrix;
  biasO: Matrix;
  constructor(inputNodes: number, hiddenNodes: number, outputNodes: number) {
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;

    this.weightsIH = new Matrix(this.hiddenNodes, this.inputNodes).randomize();
    this.weightsHO = new Matrix(this.outputNodes, this.hiddenNodes).randomize();

    this.biasH = new Matrix(this.hiddenNodes, 1).randomize();
    this.biasO = new Matrix(this.outputNodes, 1).randomize();
  }

  feedforward(input: Matrix) {
    let hidden = Matrix.add(
      Matrix.multiply(this.weightsIH, input),
      this.biasH
    ).forEach(sigmoid);

    let output = Matrix.add(
      Matrix.multiply(this.weightsHO, hidden),
      this.biasO
    ).forEach(sigmoid).print();
    
    return output;
  }
}

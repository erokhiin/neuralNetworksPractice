import { Matrix } from "./Matrix";
const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));
export class NeuralNetwork {
  inputNodes: number;
  hiddenNodes: number;
  outputNodes: number;
  hiddenWeights: Matrix;
  outputWeights: Matrix;
  hiddenBias: Matrix;
  outputBias: Matrix;

  constructor(inputNodes: number, hiddenNodes: number, outputNodes: number) {
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;

    this.hiddenWeights = new Matrix(
      this.hiddenNodes,
      this.inputNodes
    ).randomize();
    this.outputWeights = new Matrix(
      this.outputNodes,
      this.hiddenNodes
    ).randomize();

    this.hiddenBias = new Matrix(this.hiddenNodes, 1).randomize();
    this.outputBias = new Matrix(this.outputNodes, 1).randomize();
  }

  feedforward(input: Matrix) {
    let hiddenLayer = Matrix.add(
      Matrix.multiply(this.hiddenWeights, input),
      this.hiddenBias
    ).forEach(sigmoid);

    let outputLayer = Matrix.add(
      Matrix.multiply(this.outputWeights, hiddenLayer),
      this.outputBias
    ).forEach(sigmoid);

    return outputLayer;
  }

  train(inputs: Matrix, targets: Matrix) {
    let outputs = this.feedforward(inputs);
    let outputErrors = Matrix.subtract(targets, outputs);
    let hiddenErrors = Matrix.multiply(
      Matrix.transpose(this.outputWeights),
      outputErrors
    );
    hiddenErrors.print()

  }
}

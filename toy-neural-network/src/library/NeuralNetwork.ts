import { Matrix } from "./Matrix";
const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));
const dSigmoid = (y: number): number => y * (1 - y);
export class NeuralNetwork {
  inputNodes: number;
  hiddenNodes: number;
  outputNodes: number;
  hiddenWeights: Matrix;
  outputWeights: Matrix;
  hiddenBias: Matrix;
  outputBias: Matrix;
  learningRate: number;

  constructor(inputNodes: number, hiddenNodes: number, outputNodes: number) {
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;
    this.learningRate = 0.1;

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

  feedforward(inputs: Matrix) {
    let hiddenLayer = Matrix.multiply(this.hiddenWeights, inputs)
      .add(this.hiddenBias)
      .forEach(sigmoid);

    let outputLayer = Matrix.multiply(this.outputWeights, hiddenLayer)
      .add(this.outputBias)
      .forEach(sigmoid);

    return outputLayer;
  }

  train(inputs: Matrix, targets: Matrix) {
    let hiddenLayer = Matrix.multiply(this.hiddenWeights, inputs)
      .add(this.hiddenBias)
      .forEach(sigmoid);

    let outputLayer = Matrix.multiply(this.outputWeights, hiddenLayer)
      .add(this.outputBias)
      .forEach(sigmoid);

    //
    //
    // OUTPUT

    let outputErrors = Matrix.subtract(targets, outputLayer);

    // Calculate gradient
    let outputGradients = Matrix.map(outputLayer, dSigmoid);
    outputGradients.multiply(outputErrors);
    outputGradients.multiply(this.learningRate);

    // Calculate delta
    let weightOutputDeltas = Matrix.multiply(
      outputGradients,
      Matrix.transpose(hiddenLayer)
    );

    this.outputWeights.add(weightOutputDeltas);
    this.outputBias.add(outputGradients);

    //
    //
    // HIDDEN

    let hiddenErrors = Matrix.multiply(
      Matrix.transpose(this.outputWeights),
      outputErrors
    );

    // Calculate gradient
    let hiddenGradients = Matrix.map(hiddenLayer, dSigmoid);
    hiddenGradients.multiply(hiddenErrors);
    hiddenGradients.multiply(this.learningRate);

    // Calculate delta
    let weightHiddenDeltas = Matrix.multiply(
      hiddenGradients,
      Matrix.transpose(inputs)
    );

    this.hiddenWeights.add(weightHiddenDeltas);
    this.hiddenBias.add(hiddenGradients);
  }
}

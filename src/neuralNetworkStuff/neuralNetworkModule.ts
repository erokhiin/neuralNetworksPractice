import { NeuralNetwork } from "./NeuralNetwork";
import { Matrix } from "./Matrix";

export const neuralNetworkModule = () => {
  const nn = new NeuralNetwork(3, 2, 1);
  const inputs = Matrix.fromRaw([[1], [2], [3]])
  nn.feedforward(inputs)
};

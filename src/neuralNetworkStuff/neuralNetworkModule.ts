import { NeuralNetwork } from "./NeuralNetwork";
import { Matrix } from "./Matrix";

export const neuralNetworkModule = () => {
  const nn = new NeuralNetwork(2, 2, 2);
  const inputs = Matrix.fromRaw([[1], [2]]);
  const targets = Matrix.fromRaw([[1], [1]]);

  nn.train(inputs, targets);
};

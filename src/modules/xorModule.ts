import { NeuralNetwork } from "../library/NeuralNetwork";
import { Matrix } from "../library/Matrix";
import { getRandomInt } from "../utils/random";
import { loop } from "../utils/loop";

export const xorModule = () => {
  const nn = new NeuralNetwork(2, 2, 1);

  let trainingData = [
    { inputs: Matrix.fromRaw([[0], [0]]), targets: Matrix.fromRaw([[0]]) },
    { inputs: Matrix.fromRaw([[0], [1]]), targets: Matrix.fromRaw([[1]]) },
    { inputs: Matrix.fromRaw([[1], [0]]), targets: Matrix.fromRaw([[1]]) },
    { inputs: Matrix.fromRaw([[1], [1]]), targets: Matrix.fromRaw([[0]]) },
  ];

  loop(() => {
    const data = trainingData[getRandomInt(0, 3)];
    nn.train(data.inputs, data.targets);
  });
};

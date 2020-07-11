import { NeuralNetwork } from "./NeuralNetwork";
import { Matrix } from "./Matrix";
import { getRandomInt } from "../utils/random";

export const neuralNetworkModule = () => {
  const nn = new NeuralNetwork(2, 2, 1);

  let trainingData = [
    { inputs: Matrix.fromRaw([[0], [0]]), targets: Matrix.fromRaw([[0]]) },
    { inputs: Matrix.fromRaw([[0], [1]]), targets: Matrix.fromRaw([[1]]) },
    { inputs: Matrix.fromRaw([[1], [0]]), targets: Matrix.fromRaw([[1]]) },
    { inputs: Matrix.fromRaw([[1], [1]]), targets: Matrix.fromRaw([[0]]) },
  ];

  for (let i = 0; i < 50000; i++) {
    const data = trainingData[getRandomInt(0, 3)];
    nn.train(data.inputs, data.targets);
  }

  nn.feedforward(trainingData[0].inputs).print();
  nn.feedforward(trainingData[1].inputs).print();
  nn.feedforward(trainingData[2].inputs).print();
  nn.feedforward(trainingData[3].inputs).print();
};

import p5 from 'p5'
import { NeuralNetwork } from "../library/NeuralNetwork";
import { Matrix } from "../library/Matrix";
import { getRandomInt } from "../utils/random";

let nn: NeuralNetwork
let lrSlider: p5.Element

let trainingData = [
  { inputs: Matrix.fromRaw([[0], [0]]), targets: Matrix.fromRaw([[0]]) },
  { inputs: Matrix.fromRaw([[0], [1]]), targets: Matrix.fromRaw([[1]]) },
  { inputs: Matrix.fromRaw([[1], [0]]), targets: Matrix.fromRaw([[1]]) },
  { inputs: Matrix.fromRaw([[1], [1]]), targets: Matrix.fromRaw([[0]]) },
];

const sketch = (p: p5) => {
  p.setup = () => {
    nn = new NeuralNetwork(2, 4, 1);
    p.createCanvas(400, 400);

    lrSlider = p.createSlider(0.01, 0.5, 0.1, 0.01);
  };

  p.draw = () => {
    p.background(0);
    for (let i = 0; i < 10; i++) {
      const data = trainingData[getRandomInt(0, 3)];
      nn.train(data.inputs, data.targets);
    }

    nn.learningRate = lrSlider.value() as number;

    let resolution = 10;
    let cols = p.width / resolution;
    let rows = p.height / resolution;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x1 = i / cols;
        let x2 = j / rows;
        let inputs = Matrix.fromRaw([[x1], [x2]]);
        let y = nn.feedforward(inputs).data[0][0];
        p.noStroke();
        p.fill(y * 255);
        p.rect(i * resolution, j * resolution, resolution, resolution);
      }
    }


  };
};

export const xorModule = (node: HTMLElement) => new p5(sketch, node);

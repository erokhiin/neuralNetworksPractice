import p5 from 'p5'
import { Matrix } from '../library/Matrix'
import { NeuralNetwork } from '../library/NeuralNetwork'
import { getRandomInt } from '../utils/random'

let r: number, g: number, b: number, which: Color
type Color = 'white' | 'black'
let trainingData: [inputs: Matrix, targets: Matrix][] = []

const pickColor = () => {
    r = getRandomInt(0, 255)
    g = getRandomInt(0, 255)
    b = getRandomInt(0, 255)
}
const brain = new NeuralNetwork(3, 3, 2)

const colorPrediction = (inputs: Matrix): Color => {
    const output = brain.feedforward(inputs).toArray()
    if (output[0] > output[1]) return 'black'
    else return 'white'
}
const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(600, 300)
        pickColor()
    };
    p.mousePressed = () => {
        const targets = p.mouseX > p.width / 2 ? Matrix.fromRaw([[0], [1]]) : Matrix.fromRaw([[1], [0]])
        const normalize = (x: number) => x / 255
        const inputs = Matrix.fromRaw([[normalize(r)], [normalize(g)], [normalize(b)]])
        trainingData.push([inputs, targets])
        trainingData.forEach(([i, t]) => brain.train(i, t))
        pickColor()
        which = colorPrediction(inputs)

    }
    p.draw = () => {
        p.background(r, g, b)
        p.strokeWeight(4)
        p.stroke(0)
        p.line(p.width / 2, 0, p.width / 2, p.height)
        p.textSize(64)
        p.noStroke()
        p.fill(0)
        p.textAlign(p.CENTER, p.CENTER)
        p.text("black", 150, 100)
        p.fill(255)
        p.text("white", 450, 100)
        if (which === 'black') {
            p.fill(0)
            p.ellipse(150, 200, 60)
        } else {
            p.fill(255)
            p.ellipse(450, 200, 60)
        }

    };
};

export const colorPredictorModule = (node: HTMLElement) => new p5(sketch, node);

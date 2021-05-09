// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&

const BIRDS_TOTAL = 350
let birds = [];
let savedBirds = []
let pipes = [];
let counter = 0
let slider

function setup() {
  createCanvas(640, 480);
  slider = createSlider(1, 100, 1)
  for (let i = 0; i < BIRDS_TOTAL; i++) {
    birds[i] = new Bird()
  }
}

function keyPressed() {
  if (key === 's') {
    let bird = birds[0];
    saveJSON(bird.brain, 'bird.json')
  }
}

function draw() {
  for (let n = 0; n < slider.value(); n++) {
    if (counter % 75 == 0) {
      pipes.push(new Pipe());
    }
    counter++

    for (let i = birds.length - 1; i >= 0; i--) {
      if (birds[i].offScreen()) {
        savedBirds.push(birds.splice(i, 1)[0])
      }
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();

      for (let j = birds.length - 1; j >= 0; j--) {
        if (pipes[i].hits(birds[j])) {
          savedBirds.push(birds.splice(j, 1)[0])
        }
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    for (let bird of birds) {
      bird.think(pipes)
      bird.update();
    }

    if (birds.length === 0) {
      counter = 0
      nextGeneration()
      pipes = []
    }
  }

  // All the drawing stuff

  background(0);

  for (let bird of birds) {
    bird.show();
  }

  for (let pipe of pipes) {
    pipe.show();
  }
}

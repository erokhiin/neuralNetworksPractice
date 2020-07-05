import { random } from "./utils/random";

export class Matrix {
  rows: number;
  columns: number;
  matrix: number[][];
  constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;
    this.matrix = [];

    for (let i = 0; i < this.rows; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < this.columns; j++) {
        this.matrix[i][j] = 0;
      }
    }
  }
  mapMatrix(callback: (e: number, i: number, j: number) => number) {
    return this.matrix.map((row, i) => row.map((e, j) => callback(e, i, j)));
  }

  add(n: number | Matrix) {
    if (n instanceof Matrix) {
      this.matrix = this.mapMatrix((element, i, j) => element + n.matrix[i][j]);
    } else {
      this.matrix = this.mapMatrix((element) => element + n);
    }
  }
  multiply(n: number | Matrix) {
    this.matrix = this.mapMatrix((element) => element * n);
  }
  randomize() {
    this.matrix = this.mapMatrix(() => ~~random(0, 10));
  }
}

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
    if (n instanceof Matrix) {
      if (this.columns !== n.rows) return;
      const result = new Matrix(this.rows, n.columns);
      result.matrix = result.matrix.map((_, i) =>
        this.matrix.map((row) =>
          row.reduce((acc, e, j) => e * n.matrix[j][i] + acc, 0)
        )
      );
      return result;
    } else {
      this.matrix = this.mapMatrix((element) => element * n);
    }
  }

  transpose() {
    const result = new Matrix(this.columns, this.rows);
    this.mapMatrix((e, i, j) => (result.matrix[j][i] = e));
    return result;
  }

  randomize() {
    this.matrix = this.mapMatrix(() => ~~random(0, 10));
  }
}

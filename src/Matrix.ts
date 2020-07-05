import { random } from "./utils/random";

export class Matrix {
  rows: number;
  columns: number;
  data: number[][];

  constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;
    this.data = [];

    for (let i = 0; i < this.rows; i++) {
      this.data[i] = [];
      for (let j = 0; j < this.columns; j++) {
        this.data[i][j] = 0;
      }
    }
  }
  
  mapMatrix(callback: (e: number, i: number, j: number) => number) {
    return this.data.map((row, i) => row.map((e, j) => callback(e, i, j)));
  }

  static add(a: Matrix, b: Matrix) {
    const result = new Matrix(a.rows, a.columns);
    result.data = a.mapMatrix((element, i, j) => element + b.data[i][j]);
    return result;
  }
  add(n: number) {
    this.data = this.mapMatrix((element) => element + n);
    return this;
  }

  static multiply(a: Matrix, b: Matrix) {
    if (a.columns !== b.rows) return;
    const result = new Matrix(a.rows, b.columns);
    result.data = result.data.map((_, i) =>
      a.data.map((row) =>
        row.reduce((acc, e, j) => e * b.data[j][i] + acc, 0)
      )
    );
    return result;
  }
  multiply(n: number) {
    this.data = this.mapMatrix((element) => element * n);
    return this;
  }

  transpose() {
    const result = new Matrix(this.columns, this.rows);
    this.mapMatrix((e, i, j) => (result.data[j][i] = e));
    this.data = result.data;
    return this;
  }

  randomize() {
    this.data = this.mapMatrix(() => ~~random(0, 10));
    return this;
  }

  print() {
    console.table(this.data)
    return this
  }
}

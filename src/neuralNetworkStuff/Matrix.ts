import { random } from "../utils/random";
import { flatMap } from "../utils/map";

export class Matrix {
  rows: number;
  columns: number;
  data: number[][];

  constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;
    this.data = Array(rows).fill(Array(columns).fill(0));
  }

  copy() {
    return Matrix.add(new Matrix(this.rows, this.columns), this);
  }

  static map(
    matrix: Matrix,
    callback: (e: number, i: number, j: number) => number
  ) {
    return matrix.copy().forEach(callback);
  }
  map(callback: (e: number, i: number, j: number) => number) {
    return this.data.map((row, i) => row.map((e, j) => callback(e, i, j)));
  }
  forEach(callback: (e: number, i: number, j: number) => number) {
    this.data = this.map(callback);
    return this;
  }

  static add(a: Matrix, b: Matrix) {
    return new Matrix(a.rows, a.columns).forEach(
      (element, i, j) => element + b.data[i][j]
    );
  }
  add(a: number | Matrix) {
    if (a instanceof Matrix) {
      this.data = this.map((element, i, j) => element + a.data[i][j]);
    } else {
      this.data = this.map((element) => element + a);
    }
    return this;
  }

  static subtract(a: Matrix, b: Matrix) {
    return new Matrix(a.rows, a.columns).forEach(
      (_, i, j) => a.data[i][j] - b.data[i][j]
    );
  }
  subtract(n: number) {
    this.add(n * -1);
    return this;
  }

  static multiply(a: Matrix, b: Matrix) {
    return new Matrix(a.rows, b.columns).forEach((_, i, j) =>
      a.data[i].reduce((acc, e, index) => e * b.data[index][j] + acc, 0)
    );
  }
  multiply(n: number | Matrix) {
    if (n instanceof Matrix) {
      if (this.rows !== n.rows || this.columns !== n.columns) {
        console.log("Columns and Rows of A must match Columns and Rows of B.");
        return;
      }
      // hadamard product
      return this.forEach((e, i, j) => e * n.data[i][j]);
    }
    this.data = this.map((element) => element * n);
    return this;
  }

  static transpose(matrix: Matrix) {
    return new Matrix(matrix.columns, matrix.rows).forEach(
      (_, i, j) => matrix.data[j][i]
    );
  }

  randomize() {
    this.data = this.map(() => random(-1, 1));
    return this;
  }

  print() {
    console.table(this.data);
    return this;
  }

  static fromRaw(data: number[][]) {
    let m = new Matrix(data.length, data[0].length);
    m.data = m.map((_, i, j) => data[i][j]);
    return m;
  }
  toArray() {
    return flatMap(this.data, (e) => e);
  }
}

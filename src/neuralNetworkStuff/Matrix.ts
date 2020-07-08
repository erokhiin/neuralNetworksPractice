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

  map(callback: (e: number, i: number, j: number) => number) {
    return this.data.map((row, i) => row.map((e, j) => callback(e, i, j)));
  }
  forEach(callback: (e: number, i: number, j: number) => number) {
    this.data = this.map(callback);
    return this;
  }

  static add(a: Matrix, b: Matrix) {
    const result = new Matrix(a.rows, a.columns);
    result.data = a.map((element, i, j) => element + b.data[i][j]);
    return result;
  }
  add(n: number) {
    this.data = this.map((element) => element + n);
    return this;
  }

  static subtract(a: Matrix, b: Matrix) {
    return Matrix.add(a, b.multiply(-1));
  }
  subtract(n: number) {
    this.add(n * -1);
    return this;
  }

  static multiply(a: Matrix, b: Matrix) {
    if (a.columns !== b.rows) return;
    const result = new Matrix(a.rows, b.columns);
    result.data = result.map((_, i, j) =>
      a.data[i].reduce((acc, e, index) => e * b.data[index][j] + acc, 0)
    );
    return result;
  }
  multiply(n: number) {
    this.data = this.map((element) => element * n);
    return this;
  }

  static transpose(matrix: Matrix) {
    const result = new Matrix(matrix.columns, matrix.rows);
    result.forEach((_, i, j) => (matrix.data[j][i]));
    return result;
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

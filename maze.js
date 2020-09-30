class Maze {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.matrix = new Array(rows);
    for (let i = 0; i < rows; i++) {
      this.matrix[i] = new Array(cols);
      for (let j = 0; j < cols; j++) {
        this.matrix[i][j] = undefined;
      }
    }
  }

  get Rows() {
    return this.rows;
  }

  get Cols() {
    return this.cols;
  }

  Create(tileMap) {
    for (let i = 0; i < this.rows; i++) {
      let line = tileMap[i].split(" ");
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] = int(line[j]);
      }
    }
  }

  GetValue(i, j) {
    return this.matrix[i][j];
  }

  SetValue(i, j, value) {
    this.matrix[i][j] = value;
  }
}

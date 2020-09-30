class Tile {
  constructor(row, col, width, color) {
    this.row = row;
    this.col = col;
    this.pos = createVector(MAZE_X + col * width, MAZE_Y + row * width);
    this.width = width;
    this.radius = width / 2;
    this.color = color;
    this.visible = true;
  }

  //#region Properties
  get Row() {
    return this.row;
  }

  get Col() {
    return this.row;
  }

  get Position() {
    return this.pos;
  }

  get Width() {
    return this.width;
  }

  get Radius() {
    return this.radius;
  }

  get Color() {
    return this.color;
  }

  get Visible() {
    return this.visible;
  }
  //#endregion

  //#region Methods
  SetColor(color) {
    this.color = color;
  }

  SetVisible(value) {
    this.visible = value;
  }

  SetPosition(row, col) {
    this.row = row;
    this.col = col;
    let x = MAZE_X + col * this.width;
    let y = MAZE_Y + row * this.width;
    this.pos.set(x, y);
  }

  SetRandomPosition() {
    let row = int(random(0, MAZE_COLS));
    let col = int(random(0, MAZE_ROWS));
    this.SetPosition(row, col);
  }
}
//#endregion

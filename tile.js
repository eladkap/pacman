class Tile {
  constructor(row, col, x, y, width, color) {
    this.row = row;
    this.col = col;
    this.pos = createVector(x, y);
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
    let x = FRAME_X + col * this.width;
    let y = FRAME_Y + row * this.width;
    this.pos.set(x, y);
  }

  SetRandomPosition() {
    let row = int(random(0, FRAME_COLS));
    let col = int(random(0, FRAME_ROWS));
    this.SetPosition(row, col);
  }
}
//#endregion

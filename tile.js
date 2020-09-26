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

  SetPosition(x, y) {
    this.pos.set(x, y);
  }

  SetPositionRowCol(row, col) {
    this.row = row;
    this.col = col;
    this.pos.x = FRAME_X + col * this.width;
    this.pos.y = FRAME_Y + row * this.width;
  }

  SetRandomPositionRowCol() {
    this.pos.x = FRAME_X + int(random(0, FRAME_COLS)) * this.width;
    this.pos.y = FRAME_Y + int(random(0, FRAME_ROWS)) * this.width;
  }
}
//#endregion

class Fruit extends Tile {
  constructor(row, col, x, y, width, color, name, symbol, points) {
    super(row, col, x, y, width, color);
    this.name = name;
    this.symbol = symbol;
    this.points = points;
  }

  get Points() {
    return this.points;
  }

  Draw() {
    if (this.visible) {
      noStroke();
      fill(this.color);
      textSize(this.width * 0.6);
      let x = FRAME_X + this.col * this.width;
      let y = FRAME_Y + this.row * this.width;
      text(this.symbol, x, y + this.width * 0.7);
    }
  }
}

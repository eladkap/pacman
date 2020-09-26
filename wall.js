class Wall extends Tile {
  constructor(row, col, x, y, width, color) {
    super(row, col, x, y, width, color);
  }

  Draw() {
    noStroke();
    fill(this.color);
    rect(this.pos.x, this.pos.y, this.width, this.width);
  }
}

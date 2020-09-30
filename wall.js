class Wall extends Tile {
  constructor(row, col, width, color) {
    super(row, col, width, color);
  }

  Draw() {
    noStroke();
    fill(this.color);
    rect(this.pos.x, this.pos.y, this.width, this.width);
  }
}

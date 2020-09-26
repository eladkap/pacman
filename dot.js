class Dot extends Tile {
  constructor(row, col, x, y, width, color) {
    super(row, col, x, y, width, color);
  }

  Draw() {
    noStroke();
    fill(this.color);
    ellipse(
      this.pos.x + this.radius,
      this.pos.y + this.radius,
      0.1 * this.width,
      0.1 * this.width
    );
  }
}

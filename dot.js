class Dot extends Tile {
  constructor(row, col, width, color, symbol, points) {
    super(row, col, width, color, symbol);
    this.points = points;
  }

  get Points() {
    return this.points;
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

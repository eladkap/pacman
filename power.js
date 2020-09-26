class PowerPellet extends Tile {
  constructor(row, col, x, y, width, color) {
    super(row, col, x, y, width, color);
  }

  Draw() {
    noStroke();
    fill(this.color);
    ellipse(
      this.pos.x + this.radius,
      this.pos.y + this.radius,
      this.radius,
      this.radius
    );
  }
}

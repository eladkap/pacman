class PowerPellet extends Tile {
  constructor(row, col, width, color, points) {
    super(row, col, width, color);
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
      this.radius,
      this.radius
    );
  }
}

/*
Entity represents moving object (pacman or ghost)
*/
class Entity extends Tile {
  constructor(row, col, x, y, width, color, speed) {
    super(row, col, x, y, width, color);
    this.speed = speed;
    this.velocity = createVector(0, 0);
  }
}

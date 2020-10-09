class Pacman extends Entity {
  constructor(row, col, width, color, symbol, points,speed, maze, tileType, lives) {
    super(row, col, width, color, symbol, points, speed, maze, tileType);
    this.lives = lives;
  }

  get Lives() {
    return this.lives;
  }

  Draw() {
    noStroke();
    fill(this.color);
    textSize(this.width * 0.6);
    text(this.symbol, this.pos.x, this.pos.y + this.width * 0.7);
    // ellipse(
    //   this.pos.x + this.radius,
    //   this.pos.y + this.radius,
    //   0.7 * this.width,
    //   0.7 * this.width
    // );
  }

  IncrementLives() {
    this.lives++;
  }

  DecrementLives() {
    this.lives--;
  }
}

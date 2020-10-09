class Stats {
  constructor(x, y, w, h, lives) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.score = 0;
    this.totalScore = 0;
    this.lives = lives;
    this.levelNum = 1;
    this.msg = "-";
  }

  reset() {
    this.score = 0;
    this.lives = MAX_LIVES;
  }

  increaseScore(amount) {
    this.score += amount;
  }

  decreaseLives() {
    this.lives--;
  }

  SetNextLevel() {
    this.totalScore += this.score;
    this.levelNum++;
  }

  draw() {
    noStroke();
    textSize(36);
    fill(255);
    text(
      `Level: ${this.levelNum}\t\tScore: ${this.score}\t\t Lives: ${this.lives}\t\t${currentFruit.symbol}`,
      this.x,
      this.y
    );
  }
}

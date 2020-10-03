class Fruit extends Tile {
  constructor(row, col, width, color, name, symbol, points) {
    super(row, col, width, color);
    this.name = name;
    this.symbol = symbol;
    this.points = points;
    this.timer = 0;
  }

  get Points() {
    return this.points;
  }

  Draw() {
    if (this.visible) {
      noStroke();
      fill(this.color);
      textSize(this.width * 0.6);
      text(this.symbol, this.pos.x, this.pos.y + this.width * 0.7);
    }
  }

  Update() {
    if (frameCount % FPS == 0) {
      this.timer++;
      if (this.timer == FRUIT_SHOW_DELAY) {
        this.timer = 0;
        this.SetVisible(true);
      }
    }
  }

  Reset() {
    this.timer = 0;
  }
}

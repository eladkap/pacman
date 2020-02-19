class Fruit extends Tile{
  constructor(i, j, x, y, w, col, fruitNum){
    super(i, j, x, y, w, col);
    this.fruitNum = fruitNum;
    this.setNumber(fruitNum);
  }

  draw(){
    if (this.visible){
      noStroke();
      fill(255);
      textSize(this.w * 0.6);
      text(this.symbol, this.pos.x, this.pos.y + this.w * 0.7);
    }
  }

  setNumber(fruitNum){
    this.name = FRUIT_NAMES[fruitNum];
    this.symbol = FRUIT_SYMBOLS[fruitNum];
    this.pts = FRUIT_POINTS[fruitNum];
  }

  setRandomLocation(){
    let optionalRows = [1, 4, 7, 12];
    let row_index = int(random(0, optionalRows.length - 1));
    let col_index = int(random(1, FRAME_COLS - 1));
    this.pos.x = FRAME_X + col_index * TILE_SIZE;
    this.pos.y = FRAME_Y + optionalRows[row_index] * TILE_SIZE;
  }
}

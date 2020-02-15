class Tile{
  constructor(i, j, x, y, w, col){
    this.pos = createVector(x, y);
    this.w = w;
    this.r = w / 2;
    this.col = col;
    this.visible = true;
  }

  // show(){
  //   noStroke();
  //   fill(this.col);
  //   ellipse(this.pos.x, this.pos.y, this.w / 6, this.w / 6);
  // }

  setVisible(value){
    this.visible = value;
  }

  setLocation(x, y){
    this.pos.set(x, y);
  }

  setLocationRowCol(rowIndex, colIndex){
    this.pos.x = FRAME_X + colIndex * TILE_SIZE;
    this.pos.y = FRAME_Y + rowIndex * TILE_SIZE;
  }

  changeLocation(){
    this.pos.x = FRAME_X + int(random(0, FRAME_COLS)) * TILE_SIZE;
    this.pos.y = FRAME_Y + int(random(0, FRAME_ROWS)) * TILE_SIZE;
  }
}

class Wall extends Tile{
  constructor(i, j, x, y, w, col){
    super(i, j, x, y, w, col);
  }

  show(){
    // strokeWeight(1);
    // stroke(65, 105, 225);
    // fill(0);
    // rect(this.pos.x, this.pos.y, this.w, this.w);
    noStroke();
    fill(this.col);
    rect(this.pos.x, this.pos.y, this.w, this.w);
  }
}

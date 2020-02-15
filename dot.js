class Dot extends Tile{
  constructor(i, j, x, y, w, col){
    super(i, j, x, y, w, col);
  }

  show(){
    noStroke();
    fill(this.col);
    ellipse(this.pos.x + this.r, this.pos.y + this.r, 0.1 * this.w, 0.1 * this.w);
  }
}

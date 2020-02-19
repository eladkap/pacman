class PowerPellet extends Tile{
  constructor(i, j, x, y, w, col){
    super(i, j, x, y, w, col);
  }

  draw(){
    noStroke();
    // if (frameCount % (fps * 0.3)){
      // fill(0);
    // }
    // else{
      fill(this.col);
    // }
    ellipse(this.pos.x + this.r, this.pos.y + this.r, this.w * 0.5, this.w * 0.5);
  }
}

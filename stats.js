class Stats{
  constructor(x, y, w, h, lives){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.score = 0;
    this.totalScore = 0;
    this.lives = lives;
    this.levelNum = 1;
  }

  reset(){
    this.score = 0;
    this.lives = MAX_LIVES;
    //this.level = levels[0];
  }

  increaseScore(amount){
    this.score += amount;
  }

  decreaseLives(){
    this.lives -= 1;
  }

  nextLevel(){
    this.totalScore += this.score;
    this.levelNum++;
  }

  draw(){
    noStroke();
    textSize(36);
    fill(255);
    text(`Time: --\t\tLevel: ${this.levelNum}\t\tScore: ${this.score}\t\t Lives: ${this.lives}\t\t${fruit.symbol}`, this.x, this.y);
  }
}

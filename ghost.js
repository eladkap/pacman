class Ghost{
  constructor(i, j, x, y, w, speed, col){
    this.i = i;
    this.j = j;
    this.pos = createVector(x, y);
    this.w = w;
    this.r = w / 2;
    this.velocity = createVector(0, 0);
    this.direction = createVector(0, 0);
    this.speed = speed;
    this.isMoving = false;
    this.col = col;
    this.originalCol = col;
    this.isVulnerable = false;
    this.isBlinking = false;
    this.isEaten = false;
    this.movingCount = 0;
    this.prevDirection = createVector(0, 0);
    this.setRandomDirection(['R', 'L', 'U', 'D']);
    //this.mat = copyMatrix(stats.level.matrix);
  }

  reset(){
    this.isVulnerable = false;
    this.isEaten = false;
  }

  setVulnerable(b){
    this.isVulnerable = b;
    if (b == false){
      this.col = this.originalCol;
      this.speed *= 2;
    }
    else{
      this.col = color(0, 0, 120);
  		this.speed *= 0.5;
    }
  }

  setBlinking(b){
    this.isBlinking = b;
  }

  setColor(col){
    this.col = col;
  }

  setSpeed(speed){
    this.speed = speed;
  }

  goRight(){
    if (this.pos.x < FRAME_X + FRAME_WIDTH - this.w && !this.isMoving){
      this.direction.set(1, 0);
      this.isMoving = true;
      this.j++;
    }
  }

  goLeft(){
    if (this.pos.x > FRAME_X && !this.isMoving){
      this.direction.set(-1, 0);
      this.isMoving = true;
      this.j--;
    }
  }

  goUp(){
    if (this.pos.y > FRAME_Y && !this.isMoving){
      this.direction.set(0, -1);
      this.isMoving = true;
      this.i--;
    }
  }

  goDown(){
    if (this.pos.y < FRAME_Y + FRAME_HEIGHT - this.w && !this.isMoving){
      this.direction.set(0, 1);
      this.isMoving = true;
      this.i++;
    }
  }

  stop(){
    this.direction.set(0, 0);
    this.velocity.set(0, 0);
  }

  show(){
    noStroke();
    if (this.isVulnerable){
      fill(this.col);
    }
    else{
      fill(this.originalCol);
    }
    if (this.isBlinking){
      if (frameCount % (fps * 0.4)){
        fill(255);
      }
      else{
        fill(this.col);
      }
    }
    ellipse(this.pos.x + this.r, this.pos.y + this.r, this.w * 0.7, this.w * 0.7);
  }

  update(){
    if (this.isMoving){
      let x = lerp(this.pos.x, this.pos.x + this.direction.x * this.speed, LERP_UNIT);
      let y = lerp(this.pos.y, this.pos.y + this.direction.y * this.speed, LERP_UNIT);
      this.pos.set(x, y);
      this.movingCount++;
      if (this.movingCount == 1 / LERP_UNIT){
        this.updateIndex();
        this.movingCount = 0;
        this.isMoving = false;
        this.prevDirection = this.direction;
      }
    }
  }

  updateIndex(){
    this.j += this.direction.x;
    this.i += this.direction.y;
  }

  setLocation(x, y){
    this.pos.set(x, y);
  }

  setRandomDirection(options){
    let d = int(random(0, options.length - 1));
    if (options[d] == 'R'){
      // this.direction.set(1, 0);
      this.goRight();
    }
    else if (options[d] == 'L'){
      // this.direction.set(-1, 0);
      this.goLeft();
    }
    else if (options[d] == 'D'){
      // this.direction.set(0, 1);
      this.goDown();
    }
    else{
      // this.direction.set(0, -1);
      this.goUp();
    }
  }

  destroy(){
    this.isEaten = true;
  }
}

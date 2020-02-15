class Pacman{
  constructor(i, j, x, y, w, speed, col){
    this.i = i;
    this.j = j;
    this.pos = createVector(x, y);
    this.w = w;
    this.r = w / 2;
    this.speed = speed;
    this.velocity = createVector(0, 0);
    this.direction = createVector(0, 0);
    this.col = col;
    this.life = 100;
    this.isMoving = false;
    this.movingCount = 0;
    this.stop();
  }

  reset(){
    let murphy_x = FRAME_X + int(random(0, FRAME_COLS)) * TILE_SIZE;
    let murphy_y = FRAME_Y + int(random(0, FRAME_ROWS)) * TILE_SIZE;
    this.pos = createVector(murphy_x, murphy_y);
    this.stop();
  }

  goRight(){
    if (this.pos.x < FRAME_X + FRAME_WIDTH - this.w && !this.isMoving){
      this.direction.set(1, 0);
      this.isMoving = true;
      level.matrix[this.i][this.j] = 0;
      this.j++;
      level.matrix[this.i][this.j] = 5;
    }
  }

  goLeft(){
    if (this.pos.x > FRAME_X && !this.isMoving){
      this.direction.set(-1, 0);
      this.isMoving = true;
      level.matrix[this.i][this.j] = 0;
      this.j--;
      level.matrix[this.i][this.j] = 5;
    }
  }

  goUp(){
    if (this.pos.y > FRAME_Y && !this.isMoving){
      this.direction.set(0, -1);
      this.isMoving = true;
      level.matrix[this.i][this.j] = 0;
      this.i--;
      level.matrix[this.i][this.j] = 5;
    }
  }

  goDown(){
    if (this.pos.y < FRAME_Y + FRAME_HEIGHT - this.w && !this.isMoving){
      this.direction.set(0, 1);
      this.isMoving = true;
      level.matrix[this.i][this.j] = 0;
      this.i++;
      level.matrix[this.i][this.j] = 5;
    }
  }

  stop(){
    this.direction.set(0, 0);
    this.velocity.set(0, 0);
  }

  getDirection(){
    if (this.velocity.x > 0){
      return 'R';
    }
    if (this.velocity.x < 0){
      return 'L';
    }
    if (this.velocity.y > 0){
      return 'D';
    }
    return 'U';
  }

  show(){
    noStroke();
    fill(this.col);
    ellipse(this.pos.x + this.r, this.pos.y + this.r, 0.7 * this.w, 0.7 * this.w);
  }

  update(){
    if (this.isMoving){
      let x = lerp(this.pos.x, this.pos.x + this.direction.x * this.speed, LERP_UNIT);
      let y = lerp(this.pos.y, this.pos.y + this.direction.y * this.speed, LERP_UNIT);
      this.pos.set(x, y);
      this.movingCount++;
      if (this.movingCount == 1 / LERP_UNIT){
        this.movingCount = 0;
        this.isMoving = false;
      }
    }
  }

  setLocationRowCol(rowIndex, colIndex){
    this.i = rowIndex;
    this.j = colIndex;
    this.pos.x = FRAME_X + colIndex * TILE_SIZE;
    this.pos.y = FRAME_Y + rowIndex * TILE_SIZE;
  }

  setLocation(x, y){
    this.pos.set(x, y);
  }

  collide(entity){
    var d = dist(this.pos.x, this.pos.y, entity.pos.x, entity.pos.y);
    return d < 1;
  }
}

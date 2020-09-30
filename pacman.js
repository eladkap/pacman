class Pacman2 {
  constructor(i, j, x, y, w, speed, col) {
    this.i = i;
    this.j = j;
    this.pos = createVector(x, y);
    this.w = w;
    this.r = w / 2;
    this.speed = speed;
    this.direction = createVector(0, 0);
    this.col = col;
    this.life = 100;
    this.isMoving = false; // redundant property - velocity already indicates this property
    this.movingCount = 0;
    this.stop();
  }

  reset() {
    let x = FRAME_X + int(random(0, FRAME_COLS)) * TILE_SIZE;
    let y = FRAME_Y + int(random(0, FRAME_ROWS)) * TILE_SIZE;
    this.pos = createVector(x, y);
    this.stop();
  }

  goRight() {
    if (this.pos.x < FRAME_X + FRAME_WIDTH - this.w && !this.isMoving) {
      this.direction.set(1, 0);
      this.isMoving = true;
      level.matrix[this.i][this.j] = TILE_EMPTY;
      this.j++;
      level.matrix[this.i][this.j] = TILE_PACMAN;
    }
  }

  goLeft() {
    if (this.pos.x > FRAME_X && !this.isMoving) {
      this.direction.set(-1, 0);
      this.isMoving = true;
      level.matrix[this.i][this.j] = TILE_EMPTY;
      this.j--;
      level.matrix[this.i][this.j] = TILE_PACMAN;
    }
  }

  goUp() {
    if (this.pos.y > FRAME_Y && !this.isMoving) {
      this.direction.set(0, -1);
      this.isMoving = true;
      level.matrix[this.i][this.j] = TILE_EMPTY;
      this.i--;
      level.matrix[this.i][this.j] = TILE_PACMAN;
    }
  }

  goDown() {
    if (this.pos.y < FRAME_Y + FRAME_HEIGHT - this.w && !this.isMoving) {
      this.direction.set(0, 1);
      this.isMoving = true;
      level.matrix[this.i][this.j] = TILE_EMPTY;
      this.i++;
      level.matrix[this.i][this.j] = TILE_PACMAN;
    }
  }

  stop() {
    this.direction.set(0, 0);
  }

  getDirection() {
    if (this.direction.x > 0) {
      return "R";
    }
    if (this.direction.x < 0) {
      return "L";
    }
    if (this.direction.y > 0) {
      return "D";
    }
    return "U";
  }

  Draw() {
    noStroke();
    fill(this.col);
    ellipse(
      this.pos.x + this.r,
      this.pos.y + this.r,
      0.7 * this.w,
      0.7 * this.w
    );
  }

  Update() {
    if (this.isMoving) {
      let x = lerp(
        this.pos.x,
        this.pos.x + this.direction.x * this.speed,
        LERP_UNIT
      );
      let y = lerp(
        this.pos.y,
        this.pos.y + this.direction.y * this.speed,
        LERP_UNIT
      );
      // if (this.j == FRAME_COLS - 1) {
      //   this.j = 1;
      //   x = FRAME_X + TILE_SIZE;
      // }
      // if (this.j == 1) {
      //   this.j = FRAME_COLS - 1;
      //   x = FRAME_X + FRAME_COLS * TILE_SIZE;
      // }
      this.pos.set(x, y);
      this.movingCount++;
      if (this.movingCount == 1 / LERP_UNIT) {
        this.movingCount = 0;
        this.isMoving = false;
      }
    }
  }

  setLocationRowCol(rowIndex, colIndex) {
    this.i = rowIndex;
    this.j = colIndex;
    this.pos.x = FRAME_X + colIndex * TILE_SIZE;
    this.pos.y = FRAME_Y + rowIndex * TILE_SIZE;
  }

  setLocation(x, y) {
    this.pos.set(x, y);
  }

  Collide(entity) {
    var d = dist(this.pos.x, this.pos.y, entity.pos.x, entity.pos.y);
    return d < 1 && entity.Visible;
  }
}

//***********************************************************************************/

class Pacman extends Entity {
  constructor(row, col, width, color, speed, lives) {
    super(row, col, width, color, speed);
    this.lives = lives;
    this.vulnerable = false;
  }

  get Lives() {
    return this.lives;
  }

  get Vulnerable() {
    return this.vulnerable;
  }

  Draw() {
    noStroke();
    fill(this.color);
    ellipse(
      this.pos.x + this.radius,
      this.pos.y + this.radius,
      0.7 * this.width,
      0.7 * this.width
    );
  }

  Update() {
    this.pos.add(this.velocity);
  }

  IncrementLives() {
    this.lives++;
  }

  DecrementLives() {
    this.lives--;
  }
}

class Ghost2 {
  constructor(i, j, x, y, w, speed, col, index) {
    this.i = i;
    this.j = j;
    this.originalRowIndex = i;
    this.originalColIndex = j;
    this.pos = createVector(x, y);
    this.w = w;
    this.r = w / 2;
    this.direction = createVector(0, 0);
    this.speed = speed;
    this.col = col;
    this.index = index;
    this.originalCol = col;
    this.isVulnerable = false;
    this.visible = true;
    this.isBlinking = false;
    this.isEaten = false;
    this.movingCount = 0;
    this.prevDirection = createVector(0, 0);
    this.setRandomDirection(["R", "L", "U", "D"]);
  }

  reset() {
    this.isVulnerable = false;
    this.isEaten = false;
  }

  get Visible() {
    return this.visible;
  }

  setVulnerable(b) {
    this.isVulnerable = b;
    if (b == false) {
      this.col = this.originalCol;
      this.speed *= 2;
      // LERP_UNIT_GHOST *= 0.5;
    } else {
      this.col = color(0, 0, 120);
      this.speed *= 0.5;
      // LERP_UNIT_GHOST *= 2;
    }
  }

  setBlinking(b) {
    this.isBlinking = b;
  }

  setColor(col) {
    this.col = col;
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  canGoRight() {
    //return this.pos.x > FRAME_X + FRAME_WIDTH - this.w;
    return (
      this.j < level.matrix[0].length - 1 &&
      level.matrix[this.i][this.j + 1] != 1
    );
  }

  canGoLeft() {
    //return this.pos.x > FRAME_X;
    return this.j > 0 && level.matrix[this.i][this.j - 1] != 1;
  }

  canGoUp() {
    //return this.pos.y > FRAME_Y;
    return this.i > 0 && level.matrix[this.i - 1][this.j] != 1;
  }

  canGoDown() {
    //return this.pos.y < FRAME_Y + FRAME_HEIGHT - this.w;
    return (
      this.i < level.matrix.length - 1 && level.matrix[this.i + 1][this.j] != 1
    );
  }

  goRight() {
    if (this.canGoRight()) {
      this.direction.set(1, 0);
      level.matrix[this.i][this.j] = 0;
      this.j++;
      level.matrix[this.i][this.j] = this.index;
    }
  }

  goLeft() {
    if (this.canGoLeft()) {
      this.direction.set(-1, 0);
      level.matrix[this.i][this.j] = 0;
      this.j--;
      level.matrix[this.i][this.j] = this.index;
    }
  }

  goUp() {
    if (this.canGoUp()) {
      this.direction.set(0, -1);
      level.matrix[this.i][this.j] = 0;
      this.i--;
      level.matrix[this.i][this.j] = this.index;
    }
  }

  goDown() {
    if (this.canGoDown()) {
      this.direction.set(0, 1);
      level.matrix[this.i][this.j] = 0;
      this.i++;
      level.matrix[this.i][this.j] = this.index;
    }
  }

  stop() {
    this.direction.set(0, 0);
  }

  draw() {
    noStroke();
    if (this.isVulnerable) {
      fill(this.col);
    } else {
      fill(this.originalCol);
    }
    if (this.isBlinking) {
      if (frameCount % (fps * 2)) {
        fill(255);
      } else {
        fill(this.col);
      }
    }
    ellipse(
      this.pos.x + this.r,
      this.pos.y + this.r,
      this.w * 0.7,
      this.w * 0.7
    );
  }

  setNewDirection() {
    let options = [];
    if (this.canGoRight()) {
      options.push("R");
    }
    if (this.canGoLeft()) {
      options.push("L");
    }
    if (this.canGoUp()) {
      options.push("U");
    }
    if (this.canGoDown()) {
      options.push("D");
    }
    this.setRandomDirection(options);
  }

  canGoSameDirection() {
    let rightCond =
      this.direction.x == 1 && this.direction.y == 0 && this.canGoRight();
    let leftCond =
      this.direction.x == -1 && this.direction.y == 0 && this.canGoLeft();
    let upCond =
      this.direction.x == 0 && this.direction.y == -1 && this.canGoUp();
    let downCond =
      this.direction.x == 0 && this.direction.y == 1 && this.canGoDown();
    return rightCond || leftCond || upCond || downCond;
  }

  update() {
    let x = lerp(
      this.pos.x,
      this.pos.x + this.direction.x * this.speed,
      LERP_UNIT_GHOST
    );
    let y = lerp(
      this.pos.y,
      this.pos.y + this.direction.y * this.speed,
      LERP_UNIT_GHOST
    );
    this.pos.set(x, y);
    this.movingCount++;
    if (this.movingCount >= 1 / LERP_UNIT_GHOST) {
      this.updateIndex();
      this.movingCount = 0;
      this.prevDirection = this.direction;
      if (!this.canGoSameDirection()) {
        this.setNewDirection();
      }
    }
  }

  updateIndex() {
    this.j += this.direction.x;
    this.i += this.direction.y;
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

  setOriginalLocation() {
    this.setLocationRowCol(this.originalRowIndex, this.originalColIndex);
  }

  setRandomDirection(options) {
    let d = random(options);
    if (d == "R") {
      this.direction.set(1, 0);
      //this.goRight();
    } else if (d == "L") {
      this.direction.set(-1, 0);
      //this.goLeft();
    } else if (d == "D") {
      this.direction.set(0, 1);
      //this.goDown();
    } else if (d == "U") {
      this.direction.set(0, -1);
      //this.goUp();
    }
  }

  destroy() {
    this.isEaten = true;
  }
}

/***************************************************************************/

class Ghost extends Entity {
  constructor(row, col, width, color, symbol, speed, maze, tileType) {
    super(row, col, width, color, symbol, speed, maze, tileType);
  }

  Draw() {
    noStroke();
    fill(this.color);
    textSize(this.width * 0.6);
    text(this.symbol, this.pos.x, this.pos.y + this.width * 0.7);
  }

  GetPossibleDirections() {
    let possibleDirections = [];
    if (this.CanGoLeft()) {
      possibleDirections.push("L");
    }
    if (this.CanGoRight()) {
      possibleDirections.push("R");
    }
    if (this.CanGoUp()) {
      possibleDirections.push("U");
    }
    if (this.CanGoDown()) {
      possibleDirections.push("D");
    }
    return possibleDirections;
  }

  SetRandomDirection() {
    let possibleDirections = this.GetPossibleDirections();
    let chosenDirection = random(possibleDirections);
    this.GotoDirection(chosenDirection);
  }

  ChangeDirection() {
    var currentDirection;
    var oppositeDirection;
    if (this.direction.x < 0) {
      currentDirection = "L";
      oppositeDirection = "R";
    }
    if (this.direction.x > 0) {
      currentDirection = "R";
      oppositeDirection = "L";
    }
    if (this.direction.y < 0) {
      currentDirection = "U";
      oppositeDirection = "D";
    }
    if (this.direction.y > 0) {
      currentDirection = "D";
      oppositeDirection = "U";
    }
    let possibleDirections = this.GetPossibleDirections();

    if (possibleDirections.length == 1) {
      this.GotoDirection(possibleDirections[0]);
    } else {
      let index = possibleDirections.indexOf(oppositeDirection);
      possibleDirections.splice(index, 1);
      let chosenDirection = random(possibleDirections);
      this.GotoDirection(chosenDirection);
    }
    this.isMoving = true;
  }
}

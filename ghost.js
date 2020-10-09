class Ghost extends Entity {
  constructor(row, col, width, color, symbol,points, speed, maze, tileType) {
    super(row, col, width, color, symbol, points, speed, maze, tileType);
    this.vulnerabilityTimer = 0;
    this.recoveryTimer = 0;
    this.timer = 0;
    this.recoveryMode = false;
    this.vulnerabilityDuration = GHOST_VULNERABILITY_DURATION_SEC;
    this.recoveryDuration = GHOST_RECOVERY_DURATION_SEC;
  }

  Draw() {
    noStroke();
    if (this.vulnerable) {
      if (this.recoveryMode) {
        if (frameCount % (FPS / 2) == 0) {
          this.timer++;
        }
        if (this.timer % 2 == 0) {
          fill(NAVY);
        } else {
          fill(WHITE);
        }
      } else {
        fill(NAVY);
      }
      ellipse(
        this.pos.x + this.radius,
        this.pos.y + this.radius,
        0.7 * this.width,
        0.7 * this.width
      );
    } else {
      fill(this.color);
      textSize(this.width * 0.6);
      text(this.symbol, this.pos.x, this.pos.y + this.width * 0.7);
    }
  }

  Reset(){
    this.vulnerabilityTimer = 0;
    this.recoveryTimer = 0;
    this.timer = 0;
    this.recoveryMode = false;
    this.SetVulnerable(false);
  }

  UpdateState() {
    if (this.vulnerable && !this.recoveryMode) {
      if (frameCount % FPS == 0) {
        this.vulnerabilityTimer++;
      }
      if (this.vulnerabilityTimer >= this.vulnerabilityDuration) {
        this.recoveryMode = true;
        this.vulnerabilityTimer = 0;
      }
    }
    if (this.recoveryMode) {
      if (frameCount % FPS == 0) {
        this.recoveryTimer++;
      }
      if (this.recoveryTimer >= this.recoveryDuration) {
        this.SetVulnerable(false);
        this.recoveryTimer = 0;
        this.recoveryMode = false;
      }
    }
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

  SetVulnerable(value) {
    // let chosenDirection = this.ResetMovement();
    // let nextPosition = this.GetNextPosition(chosenDirection);
    // this.SetPosition(nextPosition[0], nextPosition[1]);
    this.vulnerable = value;
    if (value == true) {
      // this.lerpUnit /= 2;
    } else {
      // this.lerpUnit *= 2;
    }
  }

  GetNextPosition(chosenDirection) {
    if (chosenDirection == "L") {
      return [this.Row, this.Col - 1];
    }
    if (chosenDirection == "R") {
      return [this.Row, this.Col + 1];
    }
    if (chosenDirection == "U") {
      return [this.Row - 1, this.Col];
    }
    return [this.Row + 1, this.Col];
  }

  ChangeDirection() {
    // Change direction and return the next position
    var currentDirection = null;
    var oppositeDirection = null;
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

    let chosenDirection;
    if (possibleDirections.length == 1) {
      this.GotoDirection(possibleDirections[0]);
      chosenDirection = possibleDirections[0];
    } else {
      let index = possibleDirections.indexOf(oppositeDirection);
      possibleDirections.splice(index, 1);
      let chosenDirection = random(possibleDirections);
      this.GotoDirection(chosenDirection);
    }
    this.isMoving = true;
    return this.GetNextPosition(chosenDirection);
  }
}

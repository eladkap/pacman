class Ghost extends Entity {
  constructor(row, col, width, color, symbol, speed, maze, tileType) {
    super(row, col, width, color, symbol, speed, maze, tileType);
    this.vulnerabilityTimer = 0;
  }

  Draw() {
    noStroke();
    if (this.vulnerable) {
      fill(NAVY);
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
    this.vulnerable = value;
    if (value == false) {
      // this.speed *= 2;
      this.lerpUnit *= 2;
    } else {
      // this.speed *= 0.5;
      // this.lerpUnit *= 0.5;
    }
  }

  ChangeDirection() {
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

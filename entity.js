/*
Entity represents moving object (pacman or ghost)
*/
class Entity extends Tile {
  constructor(row, col, width, color, symbol, speed, maze, tileType) {
    super(row, col, width, color, symbol);
    this.speed = speed;
    this.direction = createVector(0, 0);
    this.maze = maze;
    this.tileType = tileType;
    this.movingCount = 0;
    this.isMoving = false;
    this.vulnerable = false;
  }

  //#region Properties
  get Speed() {
    return this.speed;
  }

  get Direction() {
    return this.direction;
  }

  get Vulnerable() {
    return this.vulnerable;
  }
  //#endregion

  //#region Methods
  Draw() {}

  ChangeDirection() {}

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
      this.pos.set(x, y);
      this.movingCount++;
      if (this.movingCount == 1 / LERP_UNIT) {
        this.movingCount = 0;
        this.isMoving = false;
        this.ChangeDirection();
      }
    }
  }

  SetVulnerable(value) {
    this.vulnerable = value;
  }

  SetDirection(directionX, directionY) {
    this.direction.set(directionX, directionY);
  }

  CanGoLeft() {
    // return this.pos.x > MAZE_X && !this.isMoving;
    return (
      this.col > 0 &&
      this.maze.GetValue(this.row, this.col - 1) != TILE_WALL &&
      !this.isMoving
    );
  }

  CanGoRight() {
    // return this.pos.x < MAZE_X + MAZE_WIDTH - this.width && !this.isMoving;
    return (
      this.col + 1 < this.maze.Cols - 1 &&
      this.maze.GetValue(this.row, this.col + 1) != TILE_WALL &&
      !this.isMoving
    );
  }

  CanGoUp() {
    // return this.pos.y < MAZE_Y + MAZE_HEIGHT - this.width && !this.isMoving;
    return (
      this.row > 0 &&
      this.maze.GetValue(this.row - 1, this.col) != TILE_WALL &&
      !this.isMoving
    );
  }

  CanGoDown() {
    // return this.pos.y > MAZE_Y && !this.isMoving;
    return (
      this.row + 1 < this.maze.Rows - 1 &&
      this.maze.GetValue(this.row + 1, this.col) != TILE_WALL &&
      !this.isMoving
    );
  }

  GotoDirection(direction) {
    switch (direction) {
      case "L":
        this.GoLeft();
        break;
      case "R":
        this.GoRight();
        break;
      case "U":
        this.GoUp();
        break;
      default:
        this.GoDown();
        break;
    }
  }

  GoLeft() {
    if (this.CanGoLeft()) {
      this.direction.set(-1, 0);
      this.isMoving = true;
      this.maze.SetValue(this.row, this.col, TILE_EMPTY);
      this.col--;
      this.maze.SetValue(this.row, this.col, this.tileType);
    }
  }

  GoRight() {
    if (this.CanGoRight()) {
      this.direction.set(1, 0);
      this.isMoving = true;
      this.maze.SetValue(this.row, this.col, TILE_EMPTY);
      this.col++;
      this.maze.SetValue(this.row, this.col, this.tileType);
    }
  }

  GoUp() {
    if (this.CanGoUp()) {
      this.direction.set(0, -1);
      this.isMoving = true;
      this.maze.SetValue(this.row, this.col, TILE_EMPTY);
      this.row--;
      this.maze.SetValue(this.row, this.col, this.tileType);
    }
  }

  GoDown() {
    if (this.CanGoDown()) {
      this.direction.set(0, 1);
      this.isMoving = true;
      this.maze.SetValue(this.row, this.col, TILE_EMPTY);
      this.row++;
      this.maze.SetValue(this.row, this.col, this.tileType);
    }
  }

  Stop() {
    this.SetDirection(0, 0);
  }

  Collide(entity) {
    var d = dist(this.pos.x, this.pos.y, entity.pos.x, entity.pos.y);
    return d < 1 && entity.Visible;
  }
  //#endregion
}

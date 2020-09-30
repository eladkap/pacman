/*
Entity represents moving object (pacman or ghost)
*/
class Entity extends Tile {
  constructor(row, col, width, color, speed) {
    super(row, col, width, color);
    this.speed = speed;
    this.velocity = createVector(0, 0);
  }

  //#region Properties
  get Speed() {
    return this.speed;
  }

  get Velocity() {
    return this.velocity;
  }
  //#endregion

  //#region Methods
  Draw() {}

  Update() {
    this.pos.add(this.velocity);
  }

  SetVelocity(velocityX, velocityY) {
    this.velocity.set(velocityX, velocityY);
  }

  CanGoLeft() {}

  CanGoRight() {}

  CanGoUp() {}

  CanGoDown() {}

  SetDirection(direction) {
    if (direction == "R") {
      this.SetVelocity(this.speed, 0);
    } else if (direction == "L") {
      this.SetVelocity(-this.speed, 0);
    } else if (direction == "U") {
      this.SetVelocity(0, -this.speed);
    } else {
      this.SetVelocity(0, this.speed);
    }
  }

  Stop() {
    this.SetVelocity(0, 0);
  }

  Collide(entity) {
    var d = dist(this.pos.x, this.pos.y, entity.pos.x, entity.pos.y);
    return d < 1 && entity.Visible;
  }

  //#endregion
}

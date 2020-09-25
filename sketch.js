var fps;
var pacman;
var ghosts;
var walls;
var dots;
var powerPellets;
var fruit;

var eatenGhostNum = 0;

var gameIsOver = false;
var gameIsPaused = false;
var isLevelCompleted = false;

var tileMap;
var stats;
var level;
var currLevelIndex = 0;

var vulnerabilityTimer = 0;
var recoveryTimer = 0;
var fruitTimer = 0;
var recoveryMode = false;

function preload() {
  //tileMap = loadStrings('tilemap.txt');
  tileMap = TILEMAP;
}

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT + STATS_HEIGHT);
  fps = FPS;
  frameRate(fps);
  setLevel();
  setStats();
  setFruit();
}

function draw() {
  background(0);
  drawFrame();
  stats.draw();
  fruit.draw();
  pacman.draw();
  pacman.update();
  drawWalls();
  drawDots();
  drawPowerPellets();
  drawGhosts();
  //   moveGhosts();

  checkPacmanEatDot();
  checkPacmanEatPowerPellet();
  checkPacmanEatFruit();
  checkPacmanGhostCollision();
  handleGhostsVulnerability();
  handleFruitTimer();

  checkKeyIsDown();
}

function resetGame() {
  print("Reset game");
  gameIsOver = false;
  tileMap = TILEMAP;
  setLevel(tileMap);
  stats.reset();
  pacman.stop();
  loop();
}

function resetRound() {
  print("Reset round");
  gameIsOver = false;
  pacman.stop();
  pacman.setLocationRowCol(PACMAN_ROW, PACMAN_COL);
  for (let ghost of ghosts) {
    ghost.setOriginalLocation();
  }
  loop();
}

function handleGhostsVulnerability() {
  if (ghosts[0].isVulnerable && !recoveryMode) {
    if (frameCount % FPS == 0) {
      vulnerabilityTimer++;
      console.log(vulnerabilityTimer);
    }
    if (vulnerabilityTimer >= GHOST_VULNERABILITY_DURATION) {
      recoverGhosts();
      vulnerabilityTimer = 0;
    }
  }
  if (recoveryMode) {
    if (frameCount % FPS == 0) {
      recoveryTimer++;
    }
    if (recoveryTimer >= GHOST_BLINKING_DURATION) {
      setGhostsInvulnerable();
      recoveryTimer = 0;
      recoveryMode = false;
    }
  }
}

function handleFruitTimer() {
  if (frameCount % fps == 0) {
    fruitTimer++;
    if (fruitTimer == FRUIT_SHOW_DELAY) {
      fruitTimer = 0;
      fruit.setVisible(true);
      print("show fruit");
    }
  }
}

function drawWalls() {
  for (let wall of walls) {
    wall.show();
  }
}

function drawDots() {
  for (let dot of dots) {
    dot.draw();
  }
}

function drawPowerPellets() {
  for (let pellet of powerPellets) {
    pellet.draw();
  }
}

function drawGhosts() {
  for (let ghost of ghosts) {
    ghost.draw();
    ghost.update();
  }
}

function setStats() {
  stats = new Stats(200, 50, 100, STATS_HEIGHT, MAX_LIVES);
}

function drawFrame() {
  strokeWeight(1);
  stroke(65, 105, 225);
  noFill();
  rect(FRAME_X, FRAME_Y, FRAME_WIDTH, FRAME_HEIGHT);
}

function setLevel() {
  level = new Level(1, tileMap);
  dots = [];
  powerPellets = [];
  walls = [];
  ghosts = [];
  var ghostColor;

  for (let i = 0; i < level.matrix.length; i++) {
    for (let j = 0; j < level.matrix[i].length; j++) {
      if (level.matrix[i][j] == TILE_WALL) {
        let wall = new Wall(i, j, 0, 0, TILE_SIZE, BLUE);
        wall.setLocation(FRAME_X + j * TILE_SIZE, FRAME_Y + i * TILE_SIZE);
        walls.push(wall);
      } else if (level.matrix[i][j] == TILE_DOT) {
        dot = new Dot(i, j, 0, 0, TILE_SIZE, color(255));
        dot.setLocation(FRAME_X + j * TILE_SIZE, FRAME_Y + i * TILE_SIZE);
        dots.push(dot);
      } else if (level.matrix[i][j] == TILE_POWER) {
        pellet = new PowerPellet(i, j, 0, 0, TILE_SIZE, color(GRAY3));
        pellet.setLocation(FRAME_X + j * TILE_SIZE, FRAME_Y + i * TILE_SIZE);
        powerPellets.push(pellet);
      } else if (
        [TILE_GHOST1, TILE_GHOST2, TILE_GHOST3, TILE_GHOST4].includes(
          level.matrix[i][j]
        )
      ) {
        let ghostNum = level.matrix[i][j];
        let ghost_x = FRAME_X + j * TILE_SIZE;
        let ghost_y = FRAME_Y + i * TILE_SIZE;
        if (ghostNum == TILE_GHOST1) {
          ghostColor = RED;
        } else if (ghostNum == TILE_GHOST2) {
          ghostColor = PINK;
        } else if (ghostNum == TILE_GHOST3) {
          ghostColor = ORANGE;
        } else {
          ghostColor = AQUA;
        }
        ghost = new Ghost(
          i,
          j,
          ghost_x,
          ghost_y,
          TILE_SIZE,
          GHOST_SPEED,
          ghostColor,
          ghostNum
        );
        ghosts.push(ghost);
      } else if (level.matrix[i][j] == TILE_PACMAN) {
        let pacman_x = FRAME_X + j * TILE_SIZE;
        let pacman_y = FRAME_Y + i * TILE_SIZE;
        pacman = new Pacman(
          i,
          j,
          pacman_x,
          pacman_y,
          TILE_SIZE,
          PACMAN_SPEED,
          YELLOW
        );
      }
    }
  }
}

function setFruit() {
  fruit = new Fruit(0, 0, 0, 0, TILE_SIZE, color(WHITE), currLevelIndex);
  fruit.setLocationRowCol(FRUIT_ROW, FRUIT_COL);
  fruit.setVisible(false);
}

function gameOver() {
  gameIsOver = true;
  displayGameOver();
  stats.decreaseLives();
  if (stats.lives < 0) {
    displayGameOver();
  }
  noLoop();
}

function levelCompleted() {
  displayLevelCompleted();
  isLevelCompleted = true;
  noLoop();
}

function displayLevelCompleted() {
  let msg_x = SCREEN_WIDTH / 2 - 100;
  let msg_y = SCREEN_HEIGHT / 2;
  let msg = "Level completed. Press ENTER for level " + (currLevelIndex + 2);
  displayMessage(msg, msg_x, msg_y, color(0, 255, 0), 24);
}

function displayMessage(msg, x, y, col, font_size) {
  fill(col);
  textSize(font_size);
  text(msg, x, y);
}

function displayGameOver() {
  let msg_x = SCREEN_WIDTH / 2 - 100;
  let msg_y = SCREEN_HEIGHT / 2;
  let msg = "Game over. Press SPACE to restart game";
  displayMessage(msg, msg_x, msg_y, color(255, 0, 0), 24);
}

function displayPause() {
  let msg_x = SCREEN_WIDTH / 2 - 100;
  let msg_y = SCREEN_HEIGHT / 2;
  let msg = "Game is Paused. Press ESC to resume";
  displayMessage(msg, msg_x, msg_y, color(255), 24);
}

function pauseGame() {
  gameIsPaused = true;
  stats.msg = "Game is Paused";
  noLoop();
}

function resumeGame() {
  gameIsPaused = false;
  stats.msg = "";
  loop();
}

function pauseResumeGame() {
  if (gameIsPaused) {
    resumeGame();
  } else {
    pauseGame();
  }
}

function setNextLevel() {
  stats.nextLevel();
  setLevel();
  currLevelIndex++;
  if (currLevelIndex == FRUITS_NUM) {
    finishGame();
  } else {
    fruit.setNumber(currLevelIndex);
    loop();
  }
}

function finishGame() {
  let msg_x = SCREEN_WIDTH / 2 - 100;
  let msg_y = SCREEN_HEIGHT / 2;
  let msg = "Game Finished";
  displayMessage(msg, msg_x, msg_y, color(0, 255, 0), 24);
  noLoop();
}

function checkPacmanEatDot() {
  for (let i = dots.length - 1; i >= 0; i--) {
    if (pacman.collide(dots[i])) {
      dots.splice(i, 1);
      stats.increaseScore(DOT_PTS);
      if (dots.length == 0) {
        levelCompleted();
        print("Level completed");
      }
    }
  }
}

function checkPacmanEatPowerPellet() {
  for (let i = powerPellets.length - 1; i >= 0; i--) {
    if (pacman.collide(powerPellets[i])) {
      powerPellets.splice(i, 1);
      stats.increaseScore(POWER_PTS);
      setGhostsVulnerable();
    }
  }
}

function setGhostsVulnerable() {
  vulnerabilityTimer = 0;
  recoveryTimer = 0;
  recoveryMode = false;
  for (let ghost of ghosts) {
    ghost.setVulnerable(true);
    ghost.setBlinking(false);
  }
}

function setGhostsInvulnerable() {
  for (let ghost of ghosts) {
    ghost.setBlinking(false);
    ghost.setVulnerable(false);
  }
}

function checkPacmanEatFruit() {
  if (pacman.collide(fruit)) {
    stats.increaseScore(fruit.pts);
    fruit.setVisible(false);
    fruitTimer = 0;
  }
}

async function checkPacmanGhostCollision() {
  for (let ghost of ghosts) {
    if (pacman.collide(ghost)) {
      if (ghost.isVulnerable) {
        let gx = ghost.pos.x;
        let gy = ghost.pos.y;
        console.log(GHOST_POINTS[eatenGhostNum]);
        stats.increaseScore(GHOST_POINTS[eatenGhostNum]);
        let ghost_x = FRAME_X + 9 * TILE_SIZE;
        let ghost_y = FRAME_Y + 9 * TILE_SIZE;
        ghost.setLocationRowCol(9, 9);
        displayMessage(GHOST_POINTS[eatenGhostNum], gx, gy, GRAY3, 16);
        eatenGhostNum++;
        noLoop();
        await sleep(DELAY_AFTER_EATING_GHOST);
        loop();
      } else {
        gameOver();
      }
    }
  }
}

function recoverGhosts() {
  eatenGhostNum = 0;
  for (let ghost of ghosts) {
    // ghost.setVulnerable(false);
    ghost.setBlinking(true);
  }
  recoveryMode = true;
}

function canGoRight(ghost) {
  return ghost.j + 1 < FRAME_COLS && level.matrix[ghost.i][ghost.j + 1] != 1;
}

function canGoLeft(ghost) {
  return ghost.j - 1 > 0 && level.matrix[ghost.i][ghost.j - 1] != 1;
}

function canGoUp(ghost) {
  return ghost.i - 1 > 0 && level.matrix[ghost.i - 1][ghost.j] != 1;
}

function canGoDown(ghost) {
  return ghost.j + 1 < FRAME_ROWS && level.matrix[ghost.i + 1][ghost.j] != 1;
}

// Ghost AI
function moveGhost(ghost) {
  if (frameCount % (FPS * 2) == 0) {
    var path = findPath(ghost.mat, ghost.i, ghost.j, pacman.i, pacman.j);
    // console.log(path);
    if (path.length > 0) {
      let nextDirection = path[0];
      if (nextDirection == "R") {
        ghost.goRight();
      } else if (nextDirection == "L") {
        ghost.goLeft();
      } else if (nextDirection == "U") {
        ghost.goUp();
      } else {
        ghost.goDown();
      }
    }
  }
}

function moveGhosts() {
  for (let ghost of ghosts) {
    moveGhost(ghost);
  }
}

function movePacman(direction) {
  if (direction == "L") {
    if (pacman.j - 1 > 0 && level.matrix[pacman.i][pacman.j - 1] != 1) {
      pacman.goLeft();
    }
  }
  if (direction == "R") {
    if (
      pacman.j + 1 < FRAME_COLS &&
      level.matrix[pacman.i][pacman.j + 1] != 1
    ) {
      pacman.goRight();
    }
  }
  if (direction == "U") {
    if (pacman.i - 1 > 0 && level.matrix[pacman.i - 1][pacman.j] != 1) {
      pacman.goUp();
    }
  }
  if (direction == "D") {
    if (
      pacman.j + 1 < FRAME_ROWS &&
      level.matrix[pacman.i + 1][pacman.j] != 1
    ) {
      pacman.goDown();
    }
  }
}

function checkKeyIsDown() {
  if (keyIsDown(RIGHT_ARROW)) {
    movePacman("R");
  } else if (keyIsDown(LEFT_ARROW)) {
    movePacman("L");
  } else if (keyIsDown(UP_ARROW)) {
    movePacman("U");
  } else if (keyIsDown(DOWN_ARROW)) {
    movePacman("D");
  }
}

function keyPressed() {
  if (gameIsOver && key == " ") {
    resetRound();
  }
  if (!gameIsOver && isLevelCompleted && keyCode == ENTER) {
    setNextLevel();
  }
  if (!gameIsOver && keyCode === ESCAPE) {
    pauseResumeGame();
  }
  if (keyCode === RIGHT_ARROW) {
    movePacman("R");
  } else if (keyCode === LEFT_ARROW) {
    movePacman("L");
  } else if (keyCode === UP_ARROW) {
    movePacman("U");
  } else if (keyCode === DOWN_ARROW) {
    movePacman("D");
  }
}

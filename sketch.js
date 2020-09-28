var pacman;
var ghosts;
var walls;
var dots;
var powerPellets;
var fruits;
var currentFruit;

var eatenGhostNum = 0;

var gameStatus;

var tileMap;
var stats;
var level;
var currLevelIndex = 0;

var vulnerabilityTimer = 0;
var recoveryTimer = 0;
var fruitTimer = 0;
var recoveryMode = false;

//#region Main Functions
function LoadTileMap() {
  tileMap = ReadTextFile("tilemap.txt");
}

function preload() {
  LoadTileMap();
}

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT + STATS_HEIGHT);
  frameRate(FPS);
  setLevel();
  setStats();
  SetFruits();
  gameStatus = GAME_READY;
  noLoop();
}

async function draw() {
  background(0);
  drawFrame();
  stats.draw();
  currentFruit.Draw();
  currentFruit.Update();
  pacman.Draw();
  pacman.Update();
  DrawWalls();
  DrawDots();
  DrawPowerPellets();
  // drawGhosts();
  //   moveGhosts();

  if (gameStatus == GAME_READY) {
    console.log("Game ready.");
    DisplayReady();
    await Sleep(READY_DELAY_MS);
    gameStatus = GAME_PLAY;
    console.log("Game started.");
    loop();
  }

  // checkPacmanEatDot();
  // checkPacmanEatPowerPellet();
  // checkPacmanEatFruit();
  // checkPacmanGhostCollision();
  // handleGhostsVulnerability();

  // CheckKeyIsDown();
}
//#endregion

function resetGame() {
  print("Reset game");
  gameIsOver = false;
  LoadTileMap();
  setLevel();
  stats.reset();
  pacman.stop();
  loop();
}

function resetRound() {
  print("Reset round");
  gameStatus = GAME_PLAY;
  currentFruit.SetVisible(false);
  fruitTimer = 0;
  pacman.stop();
  pacman.setLocationRowCol(PACMAN_ROW, PACMAN_COL);
  for (let ghost of ghosts) {
    ghost.setOriginalLocation();
  }
  loop();
}

//todo: this function should be managed in Ghost class in Update() method
function handleGhostsVulnerability() {
  if (ghosts[0].isVulnerable && !recoveryMode) {
    if (frameCount % FPS == 0) {
      vulnerabilityTimer++;
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

//#region Draw Functions
function DrawWalls() {
  for (let wall of walls) {
    wall.Draw();
  }
}

function DrawDots() {
  for (let dot of dots) {
    dot.Draw();
  }
}

function DrawPowerPellets() {
  for (let pellet of powerPellets) {
    pellet.Draw();
  }
}

function drawGhosts() {
  for (let ghost of ghosts) {
    ghost.draw();
    ghost.update();
  }
}

function drawFrame() {
  strokeWeight(1);
  stroke(NAVY);
  noFill();
  rect(FRAME_X, FRAME_Y, FRAME_WIDTH, FRAME_HEIGHT);
}
//#endregion

function setStats() {
  stats = new Stats(200, 50, 100, STATS_HEIGHT, MAX_LIVES);
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
        wall.SetPosition(i, j);
        walls.push(wall);
      } else if (level.matrix[i][j] == TILE_DOT) {
        dot = new Dot(i, j, 0, 0, TILE_SIZE, color(WHITE), DOT_PTS);
        dot.SetPosition(i, j);
        dots.push(dot);
      } else if (level.matrix[i][j] == TILE_POWER) {
        pellet = new PowerPellet(
          i,
          j,
          0,
          0,
          TILE_SIZE,
          color(GRAY3),
          POWER_PTS
        );
        pellet.SetPosition(i, j);
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
          YELLOW,
          PACMAN_SPEED,
          MAX_LIVES
        );
      }
    }
  }
}

function SetFruits() {
  fruits = [];
  for (let friutObj of FRUIT_DICT) {
    let fruit = new Fruit(
      0,
      0,
      0,
      0,
      TILE_SIZE,
      color(WHITE),
      friutObj.name,
      friutObj.symbol,
      friutObj.points
    );
    fruit.SetPosition(FRUIT_ROW, FRUIT_COL);
    fruits.push(fruit);
    currentFruit = fruits[0];
    currentFruit.SetVisible(false);
  }
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
  gameStatus = GAME_LEVEL_COMPLETED;
}

function displayLevelCompleted() {
  console.log("Level completed.");
  let msg_x = SCREEN_WIDTH * 0.3;
  let msg_y = SCREEN_HEIGHT * 0.71;
  let msg = "Level completed. Press ENTER for level " + (currLevelIndex + 2);
  displayMessage(msg, msg_x, msg_y, GREEN, 24);
  noLoop();
}

function displayMessage(msg, x, y, col, font_size) {
  fill(col);
  textSize(font_size);
  textFont(BOLD);
  text(msg, x, y);
}

function DisplayReady() {
  let msg_x = (FRAME_X + SCREEN_WIDTH) * 0.35;
  let msg_y = SCREEN_HEIGHT * 0.71;
  displayMessage("READY!", msg_x, msg_y, YELLOW, 24);
}

function displayGameOver() {
  let msg_x = SCREEN_WIDTH / 2 - 100;
  let msg_y = SCREEN_HEIGHT / 2;
  let msg = "Game over. Press SPACE to restart game";
  displayMessage(msg, msg_x, msg_y, RED, 24);
}

function DisplayPause() {
  let msg_x = SCREEN_WIDTH / 2 - 100;
  let msg_y = SCREEN_HEIGHT / 2;
  let msg = "Game is Paused. Press ESC to resume";
  displayMessage(msg, msg_x, msg_y, WHITE, 24);
}

function PauseGame() {
  console.log("Game paused.");
  gameStatus = GAME_PAUSED;
  stats.msg = "Game is Paused";
  DisplayPause();
  noLoop();
}

function ResumeGame() {
  console.log("Game resumed");
  gameStatus = GAME_PLAY;
  stats.msg = "";
  loop();
}

function setNextLevel() {
  currLevelIndex++;
  if (currLevelIndex == fruits.length) {
    finishGame();
  } else {
    stats.SetNextLevel();
    setLevel();
    gameStatus = GAME_PLAY;
    currentFruit = fruits[currLevelIndex];
    loop();
    currentFruit.SetVisible(false);
    fruitTimer = 0;
  }
}

function finishGame() {
  let msg_x = SCREEN_WIDTH / 2 - 100;
  let msg_y = SCREEN_HEIGHT / 2;
  let msg = "Game Finished";
  gameStatus = GAME_FINISHED;
  displayMessage(msg, msg_x, msg_y, color(0, 255, 0), 24);
  noLoop();
}

function checkPacmanEatDot() {
  for (let i = dots.length - 1; i >= 0; i--) {
    if (pacman.Collide(dots[i])) {
      let dot = dots.splice(i, 1)[0];
      stats.increaseScore(dot.Points);
      if (dots.length == 0) {
        levelCompleted();
      }
    }
  }
}

function checkPacmanEatPowerPellet() {
  for (let i = powerPellets.length - 1; i >= 0; i--) {
    if (pacman.Collide(powerPellets[i])) {
      let power = powerPellets.splice(i, 1)[0];
      stats.increaseScore(power.Points);
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
  if (pacman.Collide(currentFruit)) {
    stats.increaseScore(currentFruit.Points);
    currentFruit.SetVisible(false);
    fruitTimer = 0;
  }
}

async function checkPacmanGhostCollision() {
  for (let ghost of ghosts) {
    if (pacman.Collide(ghost)) {
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
        await Sleep(DELAY_AFTER_EATING_GHOST);
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

function MovePacman(direction) {
  if (direction == "L") {
    console.log("Left");
    if (
      pacman.Col - 1 > 0 &&
      level.matrix[pacman.Row][pacman.Col - 1] != TILE_WALL
    ) {
      pacman.SetDirection("L");
    }
  }
  if (direction == "R") {
    if (
      pacman.Col + 1 < FRAME_COLS &&
      level.matrix[pacman.Row][pacman.Col + 1] != TILE_WALL
    ) {
      pacman.SetDirection("R");
    }
  }
  if (direction == "U") {
    if (
      pacman.Row - 1 > 0 &&
      level.matrix[pacman.Row - 1][pacman.Col] != TILE_WALL
    ) {
      pacman.SetDirection("U");
    }
  }
  if (direction == "D") {
    if (
      pacman.Col + 1 < FRAME_ROWS &&
      level.matrix[pacman.Row + 1][pacman.Col] != TILE_WALL
    ) {
      pacman.SetDirection("D");
    }
  }
}

//#region Keyboard Events
function CheckKeyIsDown() {
  if (keyIsDown(RIGHT_ARROW)) {
    MovePacman("R");
  } else if (keyIsDown(LEFT_ARROW)) {
    MovePacman("L");
  } else if (keyIsDown(UP_ARROW)) {
    MovePacman("U");
  } else if (keyIsDown(DOWN_ARROW)) {
    MovePacman("D");
  }
}

function keyPressed() {
  if (gameStatus == GAME_OVER && key == " ") {
    resetRound();
  }
  if (gameStatus == GAME_LEVEL_COMPLETED && keyCode == ENTER) {
    setNextLevel();
  }
  if (gameStatus == GAME_PLAY && keyCode === ESCAPE) {
    PauseGame();
    return;
  }
  if (gameStatus == GAME_PAUSED && keyCode === ESCAPE) {
    ResumeGame();
  }
  if (gameStatus == GAME_PLAY) {
    if (keyCode === RIGHT_ARROW) {
      MovePacman("R");
    } else if (keyCode === LEFT_ARROW) {
      MovePacman("L");
    } else if (keyCode === UP_ARROW) {
      MovePacman("U");
    } else if (keyCode === DOWN_ARROW) {
      MovePacman("D");
    } else if (key == " ") {
      pacman.Stop();
    }
  }
}
//#endregion

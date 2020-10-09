var pacman;
var ghosts;
var walls;
var dots;
var powerPellets;
var fruits;
var currentFruit;
var lifeTile;

var eatenGhostNum = 0;

var gameStatus;

var tileMap;
var stats;
var maze;
var currLevelIndex = 0;

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
  SetMaze(tileMap);
  SetTiles();
  setStats();
  SetFruits();
  SetLifeTile();
  gameStatus = GAME_READY;
  noLoop();
}

async function draw() {
  background(0);
  DrawMaze();
  stats.draw();
  currentFruit.Draw();
  currentFruit.Update();
  // lifeTile.Draw();
  // lifeTile.Update();
  DrawWalls();
  DrawDots();
  DrawPowerPellets();
  pacman.Draw();
  pacman.Update();
  MoveGhosts();

  if (gameStatus == GAME_READY) {
    DisplayReady();
  }

  CheckPacmanEatDot();
  CheckPacmanEatPowerPellet();
  CheckPacmanEatFruit();
  CheckPacmanGhostCollision();

  CheckKeyIsDown();
}
//#endregion

function ResetRound() {
  print("Reset round");
  gameStatus = GAME_PLAY;
  currentFruit.Reset();
  pacman.Stop();
  pacman.SetOriginalPosition();
  for (let ghost of ghosts) {
    ghost.SetOriginalPosition();
    ghost.Reset();
    ghost.Stop();
  }
  loop();
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

function MoveGhosts() {
  for (let ghost of ghosts) {
    ghost.Draw();
    ghost.Update();
    ghost.UpdateState();
  }
}

function DrawMaze() {
  strokeWeight(1);
  stroke(NAVY);
  noFill();
  rect(MAZE_X, MAZE_Y, MAZE_WIDTH, MAZE_HEIGHT);
}
//#endregion

function setStats() {
  stats = new Stats(STATS_POS_X, STATS_POS_Y, STATS_WIDTH, STATS_HEIGHT, MAX_LIVES);
}

function SetMaze(tileMap) {
  maze = new Maze(MAZE_ROWS, MAZE_COLS);
  maze.Create(tileMap);
}

function ResetMaze() {
  maze.Create(tileMap);
  SetTiles();
}

function SetTiles() {
  dots = [];
  powerPellets = [];
  walls = [];
  ghosts = [];
  var ghostColor;

  for (let i = 0; i < maze.Rows; i++) {
    for (let j = 0; j < maze.Cols; j++) {
      if (maze.GetValue(i, j) == TILE_WALL) {
        let wall = new Wall(i, j, TILE_SIZE, BLUE, "#", 0);
        walls.push(wall);
      } else if (maze.GetValue(i, j) == TILE_DOT) {
        dot = new Dot(i, j, TILE_SIZE, WHITE, ".", DOT_PTS);
        dots.push(dot);
      } else if (maze.GetValue(i, j) == TILE_POWER) {
        pellet = new PowerPellet(i, j, TILE_SIZE, GRAY3, "O", POWER_PTS);
        powerPellets.push(pellet);
      } else if (
        [TILE_GHOST1, TILE_GHOST2, TILE_GHOST3, TILE_GHOST4].includes(
          maze.GetValue(i, j)
        )
      ) {
        let ghostNum = maze.GetValue(i, j);
        let ghostIndex = 0;
        if (ghostNum == TILE_GHOST1) {
          ghostColor = RED;
          ghostSymbol = GHOST1_SYMBOL;
        } else if (ghostNum == TILE_GHOST2) {
          ghostColor = PINK;
          ghostSymbol = GHOST2_SYMBOL;
        } else if (ghostNum == TILE_GHOST3) {
          ghostColor = ORANGE;
          ghostSymbol = GHOST3_SYMBOL;
        } else {
          ghostColor = AQUA;
          ghostSymbol = GHOST4_SYMBOL;
        }
        let ghost = new Ghost(
          i,
          j,
          TILE_SIZE,
          ghostColor,
          ghostSymbol,
          GHOST_POINTS[ghostIndex],
          GHOST_SPEED,
          maze,
          ghostNum
        );
        ghosts.push(ghost);
        ghostIndex++;
      } else if (maze.GetValue(i, j) == TILE_PACMAN) {
        pacman = new Pacman(
          i,
          j,
          TILE_SIZE,
          YELLOW,
          PACMAN_SYMBOL,
          0,
          PACMAN_SPEED,
          maze,
          TILE_PACMAN,
          MAX_LIVES
        );
      }
    }
  }
  for (let i = 0; i < maze.Rows; i++) {
    for (let j = 0; j < maze.Cols; j++) {
      let tileType = maze.GetValue(i, j);
      if (tileType == TILE_DOT || tileType == TILE_POWER) {
        maze.SetValue(i, j, TILE_EMPTY);
      }
    }
  }
}

function SetFruits() {
  fruits = [];
  for (let friutObj of FRUIT_DICT) {
    let fruit = new Fruit(
      FRUIT_ROW,
      FRUIT_COL,
      TILE_SIZE,
      WHITE,
      friutObj.name,
      friutObj.symbol,
      friutObj.points
    );
    fruits.push(fruit);
    currentFruit = fruits[0];
    currentFruit.SetVisible(false);
  }
}

function SetLifeTile() {
  // lifeTile = new Tile(FRUIT_ROW, FRUIT_COL, TILE_SIZE, WHITE, LIFE_SYMBOL);
}

function Busted() {
  console.log("Basted");
  stats.decreaseLives();
  if (stats.lives < 0) {
    gameStatus = GAME_OVER;
    DisplayGameOver();
  } else {
    gameStatus = GAME_BUSTED;
    DisplayBusted();
  }
}

function LevelCompleted() {
  console.log("Level completed.");
  DisplayLevelCompleted();
  gameStatus = GAME_LEVEL_COMPLETED;
  noLoop();
}

function DisplayLevelCompleted() {
  let msg_x = SCREEN_WIDTH * 0.3;
  let msg_y = SCREEN_HEIGHT * 0.71;
  let msg = "Level completed. Press ENTER for level " + (currLevelIndex + 2);
  DisplayMessage(msg, msg_x, msg_y, GREEN, 24);
}

function DisplayMessage(msg, x, y, col, font_size) {
  fill(col);
  textSize(font_size);
  textFont(BOLD);
  text(msg, x, y);
}

function DisplayReady() {
  let msg_x = (MAZE_X + SCREEN_WIDTH) * 0.32;
  let msg_y = SCREEN_HEIGHT * 0.71;
  DisplayMessage("Press SPACE to start", msg_x, msg_y, YELLOW, 24);
}

function DisplayBusted() {
  let msg_x = (MAZE_X + SCREEN_WIDTH) * 0.32;
  let msg_y = SCREEN_HEIGHT * 0.71;
  let msg = "Busted. Press SPACE to resume.";
  DisplayMessage(msg, msg_x, msg_y, RED, 24);
}

function DisplayGameOver() {
  let msg_x = (MAZE_X + SCREEN_WIDTH) * 0.32;
  let msg_y = SCREEN_HEIGHT * 0.71;
  let msg = "GAME OVER";
  DisplayMessage(msg, msg_x, msg_y, RED, 24);
}

function DisplayPause() {
  let msg_x = (MAZE_X + SCREEN_WIDTH) * 0.32;
  let msg_y = SCREEN_HEIGHT * 0.71;
  let msg = "Game is Paused. Press ESC to resume";
  DisplayMessage(msg, msg_x, msg_y, WHITE, 24);
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
  for (let ghost of ghosts) {
    ghost.SetRandomDirection();
  }
  loop();
}

function SetNextLevel() {
  currLevelIndex++;
  if (currLevelIndex == fruits.length) {
    finishGame();
  } else {
    stats.SetNextLevel();
    ResetMaze();
    // gameStatus = GAME_PLAY;
    gameStatus = GAME_READY;
    currentFruit = fruits[currLevelIndex];
    loop();
    currentFruit.SetVisible(false);
    currentFruit.Reset();
  }
}

function finishGame() {
  let msg_x = SCREEN_WIDTH / 2 - 100;
  let msg_y = SCREEN_HEIGHT / 2;
  let msg = "Game Finished";
  gameStatus = GAME_FINISHED;
  DisplayMessage(msg, msg_x, msg_y, GREEN, 24);
  noLoop();
}

function CheckPacmanEatDot() {
  for (let i = dots.length - 1; i >= 0; i--) {
    if (pacman.Collide(dots[i])) {
      let dot = dots.splice(i, 1)[0];
      stats.increaseScore(dot.Points);
      if (dots.length == 0) {
        LevelCompleted();
      }
    }
  }
}

function CheckPacmanEatPowerPellet() {
  for (let i = powerPellets.length - 1; i >= 0; i--) {
    if (pacman.Collide(powerPellets[i])) {
      let power = powerPellets.splice(i, 1)[0];
      stats.increaseScore(power.Points);
      SetGhostsVulnerable();
      eatenGhostNum = 0;
    }
  }
}

function SetGhostsVulnerable() {
  for (let ghost of ghosts) {
    ghost.SetVulnerable(true);
  }
}

function CheckPacmanEatFruit() {
  if (pacman.Collide(currentFruit)) {
    stats.increaseScore(currentFruit.Points);
    currentFruit.SetVisible(false);
    currentFruit.Reset();
  }
}

async function EatGhost(ghost) {
  let gx = ghost.pos.x;
  let gy = ghost.pos.y;
  console.log(GHOST_POINTS[eatenGhostNum]);
  stats.increaseScore(GHOST_POINTS[eatenGhostNum]);
  ghost.SetOriginalPosition();
  ghost.Stop();
  ghost.SetVulnerable(false);
  ghost.SetRandomDirection();
  DisplayMessage(GHOST_POINTS[eatenGhostNum], gx, gy, WHITE, POINTS_FONT_SIZE);
  eatenGhostNum++;
  if (eatenGhostNum == ghosts.length) {
    eatenGhostNum = 0;
  }
  noLoop();
  await Sleep(DELAY_AFTER_EATING_GHOST);
  loop();
}

async function CheckPacmanGhostCollision() {
  for (let ghost of ghosts) {
    if (pacman.Collide(ghost)) {
      if (ghost.Vulnerable) {
        EatGhost(ghost);
      } else {
        noLoop();
        Busted();
        return;
      }
    }
  }
}

function canGoRight(ghost) {
  return (
    ghost.j + 1 < MAZE_COLS && level.matrix[ghost.i][ghost.j + 1] != TILE_WALL
  );
}

function canGoLeft(ghost) {
  return ghost.j - 1 > 0 && level.matrix[ghost.i][ghost.j - 1] != TILE_WALL;
}

function canGoUp(ghost) {
  return ghost.i - 1 > 0 && level.matrix[ghost.i - 1][ghost.j] != TILE_WALL;
}

function canGoDown(ghost) {
  return (
    ghost.j + 1 < MAZE_ROWS && level.matrix[ghost.i + 1][ghost.j] != TILE_WALL
  );
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

//#region Keyboard Events
function CheckKeyIsDown() {
  if (gameStatus == GAME_PLAY) {
    if (keyIsDown(RIGHT_ARROW)) {
      pacman.GoRight();
    } else if (keyIsDown(LEFT_ARROW)) {
      pacman.GoLeft();
    } else if (keyIsDown(UP_ARROW)) {
      pacman.GoUp();
    } else if (keyIsDown(DOWN_ARROW)) {
      pacman.GoDown();
    }
  }
}

function keyPressed() {
  if (gameStatus == GAME_READY && key == " ") {
    ResumeGame();
  }
  if (gameStatus == GAME_BUSTED && key == " ") {
    ResetRound();
  }
  if (gameStatus == GAME_LEVEL_COMPLETED && keyCode == ENTER) {
    SetNextLevel();
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
      pacman.GoRight();
    } else if (keyCode === LEFT_ARROW) {
      pacman.GoLeft();
    } else if (keyCode === UP_ARROW) {
      pacman.GoUp();
    } else if (keyCode === DOWN_ARROW) {
      pacman.GoDown();
    }
  }
}
//#endregion

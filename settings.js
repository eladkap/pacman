const SCREEN_WIDTH = 1400; // TILE_SIZE * FRAME_ROWS;
const SCREEN_HEIGHT = 960; // TILE_SIZE * FRAME_COLS;

const FPS = 30;

const TILE_SIZE = 50;

const MAZE_X = 100;
const MAZE_Y = 100;

const MAZE_ROWS = 20;
const MAZE_COLS = 20;

const MAZE_WIDTH = MAZE_ROWS * TILE_SIZE;
const MAZE_HEIGHT = MAZE_COLS * TILE_SIZE;

const LERP_UNIT = 0.2; // Linear Interpolation - Animation movement unit

/* COLORS */
const BLACK = [0, 0, 0];
const BLACK1 = [20, 20, 20];
const WHITE = [255, 255, 255];
const GRAY1 = [100, 100, 100];
const GRAY2 = [150, 150, 150];
const GRAY3 = [200, 200, 200];
const RED = [220, 0, 0];
const ORANGE = [255, 150, 50];
const PINK = [250, 100, 150];
const YELLOW = [255, 255, 0];
const GREEN = [0, 250, 0];
const AQUA = [100, 255, 255];
const BLUE = [0, 0, 250];
const PURPLE = [200, 0, 250];
const NAVY = [0, 0, 128];

const PACMAN_RADIUS = TILE_SIZE / 2;

const PACMAN_SPEED = 1 * TILE_SIZE;
const GHOST_SPEED = 1 * TILE_SIZE;
const PACMAN_ROW = 15;
const PACMAN_COL = 9;

const DOT_PTS = 10;
const POWER_PTS = 50;

/* Tile Symbols */
const PACMAN_SYMBOL = "🙂";
const GHOST1_SYMBOL = "👽";
const GHOST2_SYMBOL = "🎃";
const GHOST3_SYMBOL = "🤡";
const GHOST4_SYMBOL = "😈";
const LIFE_SYMBOL = "❤️";
const STOP_GHOSTS_SYMBOL = "🛑";

const FRUIT_DICT = [
  { symbol: "🍒", name: "Cherry", points: 100 },
  { symbol: "🍓", name: "Strawberry", points: 300 },
  { symbol: "🍊", name: "Orange", points: 500 },
  { symbol: "🍎", name: "Apple", points: 700 },
  { symbol: "🍈", name: "Melon", points: 1000 },
  { symbol: "🔔", name: "Bell", points: 3000 },
  { symbol: "🔑", name: "Key", points: 5000 },
];

const FRUIT_ROW = 11;
const FRUIT_COL = 9;
const FRUIT_SHOW_DELAY = 7;
const DELAY_AFTER_EATING_GHOST = 500;

const GHOST_POINTS = [200, 400, 800, 1600];

const GHOST_VULNERABILITY_DURATION_SEC = 8;
const GHOST_RECOVERY_DURATION_SEC = 5;
const READY_DELAY_MS = 2000;

const STATS_POS_X = 300;
const STATS_POS_Y = 50;
const STATS_WIDTH = 100;
const STATS_HEIGHT = 200;
const MAX_LIVES = 5;

/* Game States */
const GAME_READY = 0;
const GAME_PLAY = 1;
const GAME_LEVEL_COMPLETED = 2;
const GAME_BUSTED = 3;
const GAME_PAUSED = 4;
const GAME_FINISHED = 5;
const GAME_OVER = 6;

const LEVEL_FILE_PATH = "levels/levels.txt";

const TILE_EMPTY = 0;
const TILE_WALL = 1;
const TILE_DOT = 2;
const TILE_POWER = 3;
const TILE_PACMAN = 4;
const TILE_GHOST1 = 5;
const TILE_GHOST2 = 6;
const TILE_GHOST3 = 7;
const TILE_GHOST4 = 8;

/*
POINTS SCORES
Dot: 10 points.
Power: 50 points.
Vulnerable Ghosts:
#1 in succession - 200 points.
#2 in succession - 400 points.
#3 in succession - 800 points.
#4 in succession - 1600 points.

🍒 Cherry: 100 points
🍓 Strawberry: 300 points
🍊 Orange: 500 points
🍎 Apple: 700 points
🍈 Melon: 1000 points
🔔 Bell: 3000 points
🔑 Key: 5000 points
*/

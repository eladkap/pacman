const SCREEN_WIDTH = 1400; // TILE_SIZE * FRAME_ROWS;
const SCREEN_HEIGHT = 960; // TILE_SIZE * FRAME_COLS;

const TILE_SIZE = 50;

const FRAME_X = 100;
const FRAME_Y = 100;

const FRAME_ROWS = 20;
const FRAME_COLS = 20;

const FRAME_WIDTH = FRAME_ROWS * TILE_SIZE;
const FRAME_HEIGHT = FRAME_COLS * TILE_SIZE;

const LERP_UNIT = 0.2; // Linear Interpolation - Animation movement unit


var FPS = 30;

const PACMAN_RADIUS = TILE_SIZE / 2;

const PACMAN_SPEED = 1 * TILE_SIZE;
const GHOST_SPEED = 1 * TILE_SIZE;
const PACMAN_ROW = 15;
const PACMAN_COL = 9;

const DOT_PTS = 10;
const POWER_PTS = 50;

const FRUITS_NUM = 7;
const FRUIT_POINTS = [100, 300, 500, 700, 1000, 3000, 5000, 0];
const FRUIT_NAMES = ['Cherry', 'Strawberry', 'Orange', 'Apple', 'Melon', 'Bell', 'Key', '-'];
const FRUIT_SYMBOLS = ['🍒', '🍓', '🍊', '🍎', '🍈', '🔔', '🔑', '-'];
const FRUIT_ROW = 11;
const FRUIT_COL = 9;
const FRUIT_SHOW_DELAY = 7;

const GHOST_POINTS = [200, 400, 800, 1600];
const GHOST_VULNERABILITY_DURATION = 8; // sec
const GHOST_BLINKING_DURATION = 5; // sec

const STATS_HEIGHT = 200;
const MAX_LIVES = 3;

const LEVEL_FILE_PATH = 'levels/levels.txt';

const TILEMAP = ["1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1", 
	"1 3 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 3 1",
	"1 2 1 1 1 1 2 1 1 1 1 1 1 2 1 1 1 1 2 1",
	"1 2 1 1 1 1 2 1 1 1 1 1 1 2 1 1 1 1 2 1",
	"1 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 1",
	"1 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 1",
	"1 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 1",
	"1 2 2 2 2 2 0 0 0 0 0 0 0 2 2 2 2 2 2 1",
	"1 2 1 1 1 1 0 1 1 4 1 1 0 1 1 1 1 1 2 1",
	"1 2 1 1 1 1 0 1 0 0 0 1 0 1 1 1 1 1 2 1",
	"1 2 1 1 1 1 0 1 1 1 1 1 0 1 1 1 1 1 2 1",
	"1 2 2 2 2 2 0 0 0 0 0 0 0 2 2 2 2 2 2 1",
	"1 2 1 1 1 1 2 1 1 1 1 1 2 1 1 1 1 1 2 1",
	"1 2 1 1 1 1 2 1 1 1 1 1 2 1 1 1 1 1 2 1",
	"1 2 1 1 1 1 2 1 1 1 1 1 2 1 1 1 1 1 2 1",
	"1 2 2 2 2 2 2 2 2 5 2 2 2 2 2 2 2 2 2 1",
	"1 2 1 1 1 1 2 1 1 1 1 1 2 1 1 1 1 1 2 1",
	"1 2 1 1 1 1 2 1 1 1 1 1 2 1 1 1 1 1 2 1",
	"1 3 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 3 1",
	"1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1"]

const LEVEL_START_NUM = 1; //15 ,9

const TYPES = ['E', 'W', 'D', 'C', 'G', 'P'];
/*	E - Empty - 0
		W - Wall - 1
		D - Dot - 3
		C - Cherry - 3
		G - Ghost - 4
		P - Pacman - 5
*/

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

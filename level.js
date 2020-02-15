class Level{
  constructor(num, tileMap){
    this.num = int(num);
    this.createMatrix(tileMap);
  }

  createMatrix(tileMap){
    this.matrix = new Array(FRAME_ROWS);
    for (let i = 0; i < FRAME_ROWS; i++){
      this.matrix[i] = new Array(FRAME_COLS);
      let line = tileMap[i].split(" ");
      for (let j = 0; j < FRAME_COLS; j++){
        this.matrix[i][j] = int(line[j]);
      }
    }
  }

  set(num, tileMap){
    this.num= int(num);
    this.createMatrix(tileMap);
  }
}

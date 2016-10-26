const Coordinates = require('./coordinates');

class Snake {
  constructor(board) {
    this.board = board;
    this.direction = "N";
    this.turning = false;
    const center = new Coordinates(12, 8);
    this.segments = [center];
  }

  head(){
    return this.segments.slice(-1)[0];
  }

  move(){
    this.segments.push(this.head().plus(Snake.DIRECTIONS[this.direction]));
    this.segments.shift();
    this.turning = false;

    if (!this.validMove()) {
      this.segments = [];
    }
  }

  validMove(){
    if (!this.board.validPosition(this.head())) {
      return false;
    }

    return true;
  }

  turn(direction){
    if (!(Snake.DIRECTIONS[this.direction].isOpposite(Snake.DIRECTIONS[direction]) ||
      this.turning)) {
      this.turning = true;
      this.direction = direction;
    }
  }

  occupying(array){
    this.segments.forEach( segment => {
      if (segment.i === array[0] && segment.j === array[1]) { return true; }
    });

    return false;
  }
}

Snake.DIRECTIONS = {
  "N": new Coordinates(-1, 0),
  "S": new Coordinates(1, 0),
  "E": new Coordinates(0, 1),
  "W": new Coordinates(0, -1)
};

Snake.symbol = "S";

module.exports = Snake;

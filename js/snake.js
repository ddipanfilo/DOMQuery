const Coordinates = require('./coordinates');

class Snake {
  constructor(board) {
    this.direction = "N";
    const center = new Coordinates(4, 4);
    this.segments = [center];
  }

  head(){
    return this.segments.slice(-1)[0];
  }

  move(){
    this.segments.push(this.head().plus(Snake.DIFFS[this.direction]));
  }

  turn(direction){
    this.direction = direction;
  }
}

Snake.DIRECTIONS = {
  "N": new Coordinates(-1, 0),
  "S": new Coordinates(1, 0),
  "E": new Coordinates(0, 1),
  "W": new Coordinates(0, -1)
};

module.exports = Snake;

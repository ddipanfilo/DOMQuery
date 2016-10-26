const Coordinates = require('./coordinates');

class Snake {
  constructor(board) {
    this.board = board;
    this.direction = "N";
    this.turning = false;
    const center = new Coordinates(12, 8);
    this.segments = [center];
    this.growTurns = 0;
  }

  head(){
    return this.segments.slice(-1)[0];
  }

  move(){
    this.segments.push(this.head().plus(Snake.DIRECTIONS[this.direction]));
    this.turning = false;

    if (this.eatApple()) {
      this.board.apple.spawn();
    }

    if (this.growTurns > 0) {
      this.growTurns -= 1;
    } else {
      this.segments.shift();
    }

    if (!this.validMove()) {
      this.segments = [];
    }
  }

  eatApple(){
    if (this.head().equals(this.board.apple.position)) {
      this.growTurns += 2;
      return true;
    } else {
      return false;
    }
  }

  validMove(){
    if (!this.board.validPosition(this.head())) {
      return false;
    }

    for (let i = 0; i < this.segments.length - 1; i++) {
      if (this.segments[i].equals(this.head())) {
        return false;
      }
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
    let result = false;

    this.segments.forEach( segment => {
      if (segment.i === array[0] && segment.j === array[1]) {
        result = true;
        return true;
      }
    });

    return result;
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

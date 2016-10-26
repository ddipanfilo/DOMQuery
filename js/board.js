const Snake = require('./snake');
const Apple = require('./apple');

class Board {
  constructor(dim) {
    this.dim = dim;

    this.snake = new Snake(this);
    this.apple = new Apple(this);
    this.score = 0;
  }

  validPosition(coordinate) {
    return (coordinate.i >= 0) && (coordinate.i < this.dim) &&
    (coordinate.j >= 0) && (coordinate.j < this.dim);
  }
}

module.exports = Board;

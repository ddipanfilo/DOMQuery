const Snake = require('./snake');

class Board {
  constructor(dim) {
    this.dim = dim;

    this.snake = new Snake(this);
  }
}

module.exports = Board;

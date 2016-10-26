const Coordinate = require("./coordinates");

class Apple {
  constructor(board) {
    this.board = board;
    this.spawn();
  }

  spawn() {
    let x = Math.floor(Math.random() * this.board.dim);
    let y = Math.floor(Math.random() * this.board.dim);

    while (this.board.snake.occupying([x, y])) {
      x = Math.floor(Math.random() * this.board.dim);
      y = Math.floor(Math.random() * this.board.dim);
    }

    this.position = new Coordinate(x, y);
  }
}

module.exports = Apple;

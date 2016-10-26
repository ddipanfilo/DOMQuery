const Snake = require('./snake');
const Apple = require('./apple');

class Board {
  constructor(dim) {
    this.dim = dim;

    this.snake = new Snake(this);
    this.apple = new Apple(this);
  }

  static blankGrid(dim) {
    const grid = [];

    for (let i = 0; i < dim; i++) {
      const row = [];
      for (let j = 0; j < dim; j++) {
        row.push(".");
      }
      grid.push(row);
    }

    return grid;
  }

  render() {
    const blankGrid = Board.blankGrid(this.dim);

    this.snake.segments.forEach( segment => {
      blankGrid[segment.i][segment.j] = "S";
    });

    const rowStrs = [];
    blankGrid.map( row => row.join("") ).join("\n");
  }

  validPosition(coordinate) {
    return (coordinate.i >= 0) && (coordinate.i < this.dim) &&
    (coordinate.j >= 0) && (coordinate.j < this.dim);
  }
}

module.exports = Board;

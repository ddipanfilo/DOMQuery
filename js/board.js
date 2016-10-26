const Snake = require('./snake');

class Board {
  constructor(dim) {
    this.dim = dim;

    this.snake = new Snake(this);
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
}

module.exports = Board;

const Board = require('./board.js');

class View {
  constructor($el) {
    this.$el = $el;
    this.board = new Board(20);
    this.setupBoard();

    this.invervalId = window.setInterval(this.step.bind(this), 100);

    // $l(window).on("keydown", this.handleKeyEvent.bind(this));
  }

  handleKeyEvent(event) {

  }

  setupBoard(){
    const $board = $l('<ul>');
    $board.addClass("board");

    for (let i = 0; i < Math.pow(this.board.dim, 2); i++) {
      let $li = $l('<li>');
      $board.append($li);
    }

    this.$el.append($board);
    this.$lis = this.$el.find("li");
  }

  render(){
    // this.$el.html(this.board.render());
    let snakeCoordinates = this.board.snake.segments;
    snakeCoordinates.forEach(coordinate => {
      const flatCoordinateIndex = (coordinate.i * this.board.dim) + coordinate.j;
      this.$lis.eq(flatCoordinateIndex).addClass("snake");
    });
  }

  step() {
    if (this.board.snake.segments.length > 0) {
      this.board.snake.move();
      this.render();
    }
  }
}

View.MOVES = { 38: "N", 40: "S", 39: "E", 37: "W"};

module.exports = View;

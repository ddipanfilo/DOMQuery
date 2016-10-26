const Board = require('./board.js');

class View {
  constructor($el) {
    this.$el = $el;
    this.board = new Board(20);
    this.setupBoard();

    this.invervalId = window.setInterval(this.step.bind(this), 100);

    $l(window).on("keydown", this.handleKeyEvent.bind(this));
  }

  handleKeyEvent(e) {
    if (View.MOVES[e.keyCode]) {
      this.board.snake.turn(View.MOVES[event.keyCode]);
    }
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
    let snakeCoordinates = this.board.snake.segments;
    let appleCoordinates = [this.board.apple.position];

    (this.$lis).removeClass("snake");
    (this.$lis).removeClass("apple");

    snakeCoordinates.forEach(coordinate => {
      let flatCoordinateIndex = (coordinate.i * this.board.dim) + coordinate.j;
      this.$lis.eq(flatCoordinateIndex).addClass("snake");
    });

    appleCoordinates.forEach(coordinate => {
      let flatCoordinateIndex = (coordinate.i * this.board.dim) + coordinate.j;
      this.$lis.eq(flatCoordinateIndex).addClass("apple");
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

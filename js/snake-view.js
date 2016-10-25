const Board = require('./board.js');

class View {
  constructor($el) {
    this.$el = $el;
    this.board = new Board(20);
    this.setupBoard();
  }

  setupBoard(){
    const $board = $l('<ul>');
    $board.addClass("board");
    $board.addClass("group");

    for (let i = 0; i < Math.pow(this.board.dim, 2); i++) {
      let $li = $l('<li>');
      $li.addClass('tile');
      $board.append($li);
    }

    this.$el.append($board);
  }
}

module.exports = View;

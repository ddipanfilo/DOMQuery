const Board = require('./board.js');

class View {
  constructor($el) {
    this.$el = $el;

    this.board = new Board(20);
  }

  setupBoard(){
    const $board = $l('<ul>');
    $board.addClass("board");

    for (let i = 0; i < Math.pow(this.board.size, 2); i++) {
      let $li = $l('<li>');
      $li.addClass('tile');
      $board.append($li);
    }

    this.$el.append($board);
  }
}

module.exports = View;

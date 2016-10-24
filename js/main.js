const SnakeView = require('./snake-view');

$l(function () {
  const rootEl = $l('.snake-game');
  new SnakeView(rootEl);
});

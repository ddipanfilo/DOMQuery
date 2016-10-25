const View = require('./snake-view');

$l(function () {
  const rootEl = $l('.snake-game');
  new View(rootEl);
});

const View = require('./snake-view.js');

$l(() => {
  const rootEl = $l('.snake-game');
  new View(rootEl);
});

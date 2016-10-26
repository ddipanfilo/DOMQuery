const View = require('./snake-view.js');

window.$l(() => {
  const rootEl = $l('.snake-game');
  new View(rootEl);
});

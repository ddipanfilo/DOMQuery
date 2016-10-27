/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const $l = __webpack_require__(1);
	const View = __webpack_require__(3);
	
	$l(() => {
	  const rootEl = $l('.snake-game');
	  new View(rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// import DOMNodeCollection from './dom_node_collection.js';
	const DOMNodeCollection = __webpack_require__(2);
	
	const readyCallbacks = [];
	let ready = false;
	
	$l = arg => {
	  switch(typeof(arg)){
	    case "object":
	      if (arg instanceof HTMLElement || arg === window) {
	        return new DOMNodeCollection([arg]);
	      }
	      break;
	    case "string":
	      if (arg[0] === "<") {
	        const tag = arg.slice(1, -1);
	        return new DOMNodeCollection([document.createElement(tag)]);
	      } else {
	        const nodes = document.querySelectorAll(arg);
	        const nodes_array = Array.from(nodes);
	        return new DOMNodeCollection(nodes_array);
	      }
	      break;
	    case "function":
	      return handleReadyCallback(arg);
	  }
	};
	
	$l.extend = (base, ...remainingObjs) => {
	  remainingObjs.forEach( obj => {
	    for (let prop in obj){
	      base[prop] = obj[prop];
	    }
	  });
	
	  return base;
	};
	
	$l.ajax = options => {
	  const request = new XMLHttpRequest();
	
	  const defaults = {
	    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	    method: "GET",
	    url: "",
	    success: () => {},
	    error: () => {},
	    data: {},
	  };
	
	  options = $l.extend(defaults, options);
	  options.method = options.method.toUpperCase();
	
	  if (options.method === "GET") {
	    options.url += "?" + toQueryString(options.data);
	  }
	
	  request.open(options.method, options.url, true);
	  request.onload = e => {
	    if (request.status === 200) {
	      options.success(request.response);
	    } else {
	      options.error(request.response);
	    }
	  };
	
	  request.send(JSON.stringify(options.data));
	};
	
	toQueryString = obj => {
	  let result = "";
	
	  for (let prop in obj){
	    if (obj.hasOwnProperty(prop)){
	      result += prop + "=" + obj[prop] + "&";
	    }
	  }
	
	  return result.substring(0, result.length - 1);
	};
	
	handleReadyCallback = func => {
	  if (!ready) {
	    readyCallbacks.push(func);
	  } else {
	    func();
	  }
	};
	
	document.addEventListener('DOMContentLoaded', () => {
	  ready = true;
	  readyCallbacks.forEach( func => func() );
	});
	
	module.exports = $l;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(nodes) {
	    this.nodes = nodes;
	  }
	
	  html(arg) {
	    if (typeof arg === "string") {
	      this.nodes.forEach(node => node.innerHTML = arg);
	    } else {
	      return this.nodes[0].innerHTML;
	    }
	  }
	
	  empty() {
	    this.html("");
	  }
	
	  append(elToAppend) {
	    if (typeof elToAppend === "object" && !(elToAppend instanceof DOMNodeCollection)) {
	      elToAppend = $l(elToAppend);
	    }
	
	    if (typeof elToAppend === "string") {
	      this.nodes.forEach(node => node.innerHTML += elToAppend);
	    } else if (elToAppend instanceof DOMNodeCollection) {
	      this.nodes.forEach(node => {
	        elToAppend.nodes.forEach(childNode => {
	          node.appendChild(childNode.cloneNode(true));
	          // Node.cloneNode() method returns a duplicate of the node on which
	          // this method was called.
	          // true if the children of the node should also be cloned
	        });
	      });
	    }
	  }
	
	  attr(attribute, value) {
	    if (typeof value === "string") {
	      this.nodes.forEach(node => node.setAttribute(attribute, value));
	    } else {
	      return this.nodes[0].getAttribute(attribute);
	    }
	  }
	
	  addClass(newClass) {
	    this.nodes.forEach(node => node.classList.add(newClass));
	  }
	
	  removeClass(oldClass) {
	    this.nodes.forEach(node => node.classList.remove(oldClass));
	  }
	
	  toggleClass(toggleClass) {
	    this.nodes.forEach(node => node.classList.toggle(toggleClass));
	  }
	
	  children(){
	    let childNodes = [];
	    this.nodes.forEach(node => {
	      childNodes = childNodes.concat(Array.from(node.children));
	    });
	
	    return new DOMNodeCollection(childNodes);
	  }
	
	  parent(){
	    const parentNodes = [];
	    this.nodes.forEach(node => parentNodes.push(node.parentNode));
	
	    return new DOMNodeCollection(parentNodes);
	  }
	
	  find(selector) {
	    let nodes = [];
	    this.nodes.forEach(node => {
	      const nodeList = node.querySelectorAll(selector);
	      nodes = nodes.concat(Array.from(nodeList));
	    });
	
	    return new DOMNodeCollection(nodes);
	  }
	
	  remove() {
	    this.nodes.forEach(node => node.parentNode.removeChild(node));
	  }
	
	  on(eventType, callback) {
	    this.nodes.forEach(node => {
	      node.addEventListener(eventType, callback);
	    });
	  }
	
	  off(eventType, callback) {
	    this.nodes.forEach(node => {
	      node.removeEventListener(eventType, callback);
	    });
	  }
	
	  eq(index) {
	    return $l(this.nodes[index]);
	  }
	
	  text(string) {
	    this.nodes.forEach(node => {
	      node.textContent = string;
	    });
	  }
	}
	
	module.exports = DOMNodeCollection;
	// export default DOMNodeCollection;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(4);
	
	class View {
	  constructor($el) {
	    this.$el = $el;
	    this.board = new Board(20);
	    this.setupBoard();
	
	    this.intervalId = window.setInterval(this.step.bind(this), 100);
	
	    $l(window).on("keydown", this.handleKeyEvent.bind(this));
	
	    this.populateScores();
	  }
	
	  handleKeyEvent(e) {
	    if (View.MOVES[e.keyCode]) {
	      this.board.snake.turn(View.MOVES[event.keyCode]);
	    } else if (e.keyCode === 13 ){
	      window.location = "http://www.daviddipanfilo.com/DOMQuery";
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
	
	    this.populateScores();
	  }
	
	  step() {
	    if (this.board.snake.segments.length > 0) {
	      this.board.snake.move();
	      this.render();
	    } else {
	      const currentScore = this.board.score;
	      if (window.localStorage.highScore === undefined ||
	        currentScore > parseInt(window.localStorage.highScore)) {
	        localStorage.setItem("highScore", currentScore);
	      }
	      window.clearInterval(this.intervalId);
	    }
	  }
	
	  populateScores(){
	    let highScore = localStorage.getItem("highScore") || 150;
	    let currentScore = this.board.score;
	
	    if (currentScore > highScore) {
	      $l(".high-score").text(`Highscore: ${currentScore}`);
	    } else {
	      $l(".high-score").text(`Highscore: ${highScore}`);
	    }
	    $l(".current-score").text(`Current Score: ${currentScore}`);
	  }
	}
	
	View.MOVES = { 38: "N", 40: "S", 39: "E", 37: "W"};
	
	module.exports = View;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Snake = __webpack_require__(5);
	const Apple = __webpack_require__(7);
	
	class Board {
	  constructor(dim) {
	    this.dim = dim;
	
	    this.snake = new Snake(this);
	    this.apple = new Apple(this);
	    this.score = 0;
	  }
	
	  validPosition(coordinate) {
	    return (coordinate.i >= 0) && (coordinate.i < this.dim) &&
	    (coordinate.j >= 0) && (coordinate.j < this.dim);
	  }
	}
	
	module.exports = Board;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Coordinates = __webpack_require__(6);
	
	class Snake {
	  constructor(board) {
	    this.board = board;
	    this.direction = "N";
	    this.turning = false;
	    const center = new Coordinates(12, 8);
	    this.segments = [center];
	    this.growTurns = 0;
	  }
	
	  head(){
	    return this.segments.slice(-1)[0];
	  }
	
	  move(){
	    this.segments.push(this.head().plus(Snake.DIRECTIONS[this.direction]));
	    this.turning = false;
	
	    if (this.eatApple()) {
	      this.board.apple.spawn();
	      this.board.score += 10;
	    }
	
	    if (this.growTurns > 0) {
	      this.growTurns -= 1;
	    } else {
	      this.segments.shift();
	    }
	
	    if (!this.validMove()) {
	      this.segments = [];
	    }
	  }
	
	  eatApple(){
	    if (this.head().equals(this.board.apple.position)) {
	      this.growTurns += 2;
	      return true;
	    } else {
	      return false;
	    }
	  }
	
	  validMove(){
	    if (!this.board.validPosition(this.head())) {
	      return false;
	    }
	
	    for (let i = 0; i < this.segments.length - 1; i++) {
	      if (this.segments[i].equals(this.head())) {
	        return false;
	      }
	    }
	
	    return true;
	  }
	
	  turn(direction){
	    if (!(Snake.DIRECTIONS[this.direction].isOpposite(Snake.DIRECTIONS[direction]) ||
	      this.turning)) {
	      this.turning = true;
	      this.direction = direction;
	    }
	  }
	
	  occupying(array){
	    let result = false;
	
	    this.segments.forEach( segment => {
	      if (segment.i === array[0] && segment.j === array[1]) {
	        result = true;
	        return true;
	      }
	    });
	
	    return result;
	  }
	}
	
	Snake.DIRECTIONS = {
	  "N": new Coordinates(-1, 0),
	  "S": new Coordinates(1, 0),
	  "E": new Coordinates(0, 1),
	  "W": new Coordinates(0, -1)
	};
	
	Snake.symbol = "S";
	
	module.exports = Snake;


/***/ },
/* 6 */
/***/ function(module, exports) {

	class Coordinates {
	  constructor(i, j) {
	    this.i = i;
	    this.j = j;
	  }
	
	  equals(coordinate2) {
	    if ((this.i === coordinate2.i) && (this.j === coordinate2.j)) {
	      return (this.i === coordinate2.i) && (this.j === coordinate2.j);
	    }
	  }
	
	  plus(coordinate2) {
	    return new Coordinates(this.i + coordinate2.i, this.j + coordinate2.j);
	  }
	
	  isOpposite(coordinate2){
	    return (this.i === -1 * coordinate2.i) && (this.j === (-1 * coordinate2.j));
	  }
	}
	
	module.exports = Coordinates;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const Coordinate = __webpack_require__(6);
	
	class Apple {
	  constructor(board) {
	    this.board = board;
	    this.spawn();
	  }
	
	  spawn() {
	    let x = Math.floor(Math.random() * this.board.dim);
	    let y = Math.floor(Math.random() * this.board.dim);
	
	    while (this.board.snake.occupying([x, y])) {
	      x = Math.floor(Math.random() * this.board.dim);
	      y = Math.floor(Math.random() * this.board.dim);
	    }
	
	    this.position = new Coordinate(x, y);
	  }
	}
	
	module.exports = Apple;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
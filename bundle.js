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

	const View = __webpack_require__(1);
	
	$l(() => {
	  const rootEl = $l('.snake-game');
	  new View(rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(2);
	
	class View {
	  constructor($el) {
	    this.$el = $el;
	    this.board = new Board(20);
	    this.setupBoard();
	
	    this.intervalId = window.setInterval(this.step.bind(this), 100);
	
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
	    } else {
	      const currentScore = this.board.score;
	      if (currentScore > parseInt(window.localStorage.highScore)) {
	        localStorage.setItem("highScore", currentScore);
	      }
	      window.clearInterval(this.intervalId);
	    }
	  }
	}
	
	View.MOVES = { 38: "N", 40: "S", 39: "E", 37: "W"};
	
	module.exports = View;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Snake = __webpack_require__(3);
	const Apple = __webpack_require__(5);
	
	class Board {
	  constructor(dim) {
	    this.dim = dim;
	
	    this.snake = new Snake(this);
	    this.apple = new Apple(this);
	    this.score = 0;
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
	
	  validPosition(coordinate) {
	    return (coordinate.i >= 0) && (coordinate.i < this.dim) &&
	    (coordinate.j >= 0) && (coordinate.j < this.dim);
	  }
	}
	
	module.exports = Board;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Coordinates = __webpack_require__(4);
	
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
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Coordinate = __webpack_require__(4);
	
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
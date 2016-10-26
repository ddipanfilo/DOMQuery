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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Snake = __webpack_require__(3);
	
	class Board {
	  constructor(dim) {
	    this.dim = dim;
	
	    this.snake = new Snake(this);
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
	}
	
	module.exports = Board;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Coordinates = __webpack_require__(4);
	
	class Snake {
	  constructor(board) {
	    this.direction = "N";
	    const center = new Coordinates(12, 8);
	    this.segments = [center];
	  }
	
	  head(){
	    return this.segments.slice(-1)[0];
	  }
	
	  move(){
	    this.segments.push(this.head().plus(Snake.DIRECTIONS[this.direction]));
	  }
	
	  turn(direction){
	    this.direction = direction;
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
	    return (this.i == coordinate2) && (this.j == coord2.j);
	  }
	
	  plus(coordinate2) {
	    return new Coordinates(this.i + coordinate2.i, this.j + coordinate2.j);
	  }
	
	  isOpposite(coordinate){
	    return (this.i == -1 * coordinate2.i) && (this.j == (-1 * coordinate.j));
	  }
	}
	
	module.exports = Coordinates;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
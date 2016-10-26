/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// import DOMNodeCollection from './dom_node_collection.js';
	const DOMNodeCollection = __webpack_require__(1);

	const readyCallbacks = [];
	let ready = false;

	window.$l = arg => {
	  console.log("loading");
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


/***/ },
/* 1 */
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


/***/ }
/******/ ]);
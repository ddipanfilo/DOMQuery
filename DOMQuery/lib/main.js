// import DOMNodeCollection from './dom_node_collection.js';
const DOMNodeCollection = require('./dom_node_collection.js');

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

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

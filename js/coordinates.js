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

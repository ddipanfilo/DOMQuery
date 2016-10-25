class Coordinates {
  constructor(i, j) {
    this.i = i;
    this.j = j;
  }

  equals(coordinate2) {
    return (this.i == coordinate2) && (this.j == coord2.j);
  }

  plus(coordinate2) {
    return new Coord(this.i + coordinate2.i, this.j + coordinate2.j);
  }

  isOpposite(coordinate){
    return (this.i == -1 * coordinate2.i) && (this.j == (-1 * coordinate.j));
  }
}

module.exports = Coordinates;

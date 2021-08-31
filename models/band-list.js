const Band = require('./band');

class BandList {
  constructor() {
    this.bands = [
      new Band('Metallica'),
      new Band('Bunbury'),
      new Band('Heroes del Silencio'),
      new Band('Apocaliptica'),
    ];
  }

  addBand(name) {
    const newBand = new Band(name);
    this.bands.push(newBand);
    return this.bands;
  }

  removeBand(id) {
    this.bands = this.bands.filter((b) => b.id !== id);
  }

  getBands() {
    return this.bands;
  }

  increaseVote(id) {
    this.bands = this.bands.map((b) => {
      if (b.id === id) {
        b.votes += 1;
      }
      return b;
    });
  }

  changeName(id, newName) {
    this.bands = this.bands.map((b) => {
      if (b.id === id) {
        b.name = newName;
      }
      return b;
    });
  }
}

module.exports = BandList;

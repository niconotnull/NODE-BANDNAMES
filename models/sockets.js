const BandList = require('./band-list');

class Sockets {
  constructor(io) {
    this.io = io;
    this.bandList = new BandList();

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on('connection', (socket) => {
      console.log('Cliente conectado');

      // Emitir  al cliente  conectado, todas las bandas actuales
      socket.emit('current-bands', this.bandList.getBands());

      // Votar la por la banda
      socket.on('votar-banda', (id) => {
        this.bandList.increaseVote(id);
        // socket.emit('current-bands', this.bandList.getBands());  // emite el cambio solo al socket
        this.io.emit('current-bands', this.bandList.getBands());
      });

      socket.on('borrar-banda', (id) => {
        this.bandList.removeBand(id);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      socket.on('cambiar-nombre', ({ id, nombre }) => {
        this.bandList.changeName(id, nombre);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      socket.on('agregar-banda', ({ name }) => {
        this.bandList.addBand(name);
        this.io.emit('current-bands', this.bandList.getBands());
      });
    });
  }
}

module.exports = Sockets;

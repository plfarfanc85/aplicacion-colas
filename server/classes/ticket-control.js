const fs = require("fs");

class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

class TicketControl {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.tickets = [];
    this.utlimos4 = [];

    let data = require("../data/data.json");

    if (data.hoy === this.hoy) {
      this.ultimo = data.ultimo;
      this.tickets = data.tickets;
      this.utlimos4 = data.utlimos4;
    } else {
      this.reiniciarConteo();
    }
  }

  siguiente() {
    this.ultimo += 1;
    let ticket = new Ticket(this.ultimo, null);
    this.tickets.push(ticket);
    this.grabarArchivo();

    return `Ticket ${this.ultimo}`;
  }

  getUltimoTicket() {
    return `Ticket ${this.ultimo}`;
  }

  getUltimos4() {
    return this.utlimos4;
  }

  atenderTicket(escritorio) {
    if (this.tickets.length === 0) {
      return "No hay tickets";
    }

    let numeroTicket = this.tickets[0].numero;
    this.tickets.shift();

    let atenderTicket = new Ticket(numeroTicket, escritorio);

    this.utlimos4.unshift(atenderTicket);

    if (this.utlimos4.length > 4) {
      this.utlimos4.splice(-1, 1); // Borra el ultimo
    }

    console.log("Ultimos 4");
    console.log(this.utlimos4);

    this.grabarArchivo();

    return atenderTicket;
  }

  reiniciarConteo() {
    this.ultimo = 0;
    this.tickets = [];
    this.utlimos4 = [];

    console.log("Se ha iniciado el sistema");
    this.grabarArchivo();
  }

  grabarArchivo() {
    let jsonData = {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      utlimos4: this.utlimos4,
    };

    let jsonDataString = JSON.stringify(jsonData);

    fs.writeFileSync("./server/data/data.json", jsonDataString);
  }
}

module.exports = {
  TicketControl,
};

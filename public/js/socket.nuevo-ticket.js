var socket = io();

var label = $("#lblNuevoTicket");

// Conexión
socket.on("connect", function () {
  console.log("Conectado al servidor");
});

socket.on("disconnect", function () {
  console.log("Perdimos la conexión con el servidor");
});

// Ticket actual al cargar la pagina
socket.on("estadoActual", function (ticket) {
  label.text(ticket.actual);
});

// Boton siguiente ticket
$("button").on("click", function () {
  socket.emit("siguienteTicket", null, function (siguienteTicket) {
    label.text(siguienteTicket);
  });
});

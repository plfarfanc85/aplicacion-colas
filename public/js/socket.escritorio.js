var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es necesario"); // el código javascript no se va a seguir ejecutando
}

var escritorio = searchParams.get("escritorio");
var label = $("small");
console.log(escritorio);

$("h1").text("Escritorio " + escritorio);

// Conexión
socket.on("connect", function () {
  console.log("Conectado al servidor");
});

socket.on("disconnect", function () {
  console.log("Perdimos la conexión con el servidor");
});

$("button").on("click", function () {
  socket.emit("atenderTicket", { escritorio: escritorio }, function (resp) {
    console.log(resp);

    if (resp === "No hay tickets") {
      label.text(resp);
      return;
    }

    label.text("Ticket " + resp.numero);
  });
});

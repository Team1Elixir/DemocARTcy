const { request } = require("express");

const app = require("../app.js");
const port = process.env.PORT || 3000;

const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

const users = {};

io.on("connection", (socket) => {
  if (!users[socket.id]) {
    users[socket.id] = socket.id;
    console.log("Client connected: " + socket.id);
  }
  socket.emit("yourID", socket.id);

  io.sockets.emit("allUsers", users);
  socket.on("disconnect", () => {
    delete users[socket.id];
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("hey", {
      signal: data.signalData,
      from: data.from,
    });
  });

  socket.on("acceptCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });

  //Drawing Canvas socket
  socket.on("mouse", (data) => {
    socket.broadcast.emit("mouse", data);
  });

  socket.on("clear", () => {
    socket.broadcast.emit("clear");
  });

  socket.on("disconnect", () => console.log("Client Canvass has disconnected"));
});

server.listen(port, () => console.log("server is running on port" + port));

// app.listen(port , console.log('connected PORT:', port));

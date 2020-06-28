require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router");
const errHandler = require("./middleware/errHandler");
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);
app.use(errHandler);

const users = {};

io.on("connection", (socket) => {
  socket.on("room", (room) => {
    socket.join(room);
  });

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
    socket.broadcast.to(data.room).emit("mouse", data);
  });

  socket.on("clear", (data) => {
    socket.broadcast.to(data.room).emit("clear");
  });

  socket.on("disconnect", () => console.log("Client Canvass has disconnected"));
});

module.exports = server;

const server = require("../app.js");
const port = process.env.PORT || 3000;
const { addUser, removeUser, getUser, getUsersInRoom } = require("../users");
const socket = require("socket.io");
const io = socket(server);

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    console.log("Client connected: " + socket.id + " at Room:" + room);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room ${user.room}.`,
    });

    socket.emit("yourID", socket.id);

    // socket.broadcast.to(user.room).emit("allUsers", users);

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("exit", (name) => {
    removeUser(socket.id);
    console.log("EXTTTTT");
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    console.log("DISCONNECTEDDDDDDDDD");

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("hey", {
      signal: data.signalData,
      from: data.from,
      fromName: data.fromName,
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

  // socket.on("disconnect", () => console.log("Client Canvass has disconnected"));
});

server.listen(port, () => console.log("server is running on port" + port));

// app.listen(port , console.log('connected PORT:', port));

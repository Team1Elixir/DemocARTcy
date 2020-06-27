const { request } = require("express");

const server = require("../app.js");
const port = process.env.PORT || 3000;

server.listen(port, () => console.log("server is running on port" + port));

// app.listen(port , console.log('connected PORT:', port));

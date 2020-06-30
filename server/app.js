if (process.env.NODE_ENV && (process.env.NODE_ENV.trim() === 'development' || process.env.NODE_ENV.trim() === 'test')) {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router");
const errHandler = require("./middleware/errHandler");
const http = require("http");
const server = http.createServer(app);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);
app.use(errHandler);

module.exports = server;

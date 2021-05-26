const express = require("express");

const app = express();
// create server
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

const rooms = new Map();

//config web
app.get("/rooms", (req, res) => {
  res.json(rooms);
});

app.post("/rooms", (req, res) => {
  console.log('Hello world');
});

//config socket
io.on("connection", (socket) => {
  console.log("user connected", socket.id);
});

//config server
server.listen(9999, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log("##########  Server run! ##########");
});

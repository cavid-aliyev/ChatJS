const express = require("express");

const app = express();
// create server
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }  
});;

const rooms = new Map();

//config web
app.get("/rooms", (req, res) => {
  res.json(rooms);
});

//config socket
io.on("connection", (socket) => {
  console.log("user connected", socket.id);
});

//config server
server.listen(8888, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log("##########  Server run! ##########");
});

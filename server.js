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

//parsing request
app.use(express.json());

const rooms = new Map();

//config web
app.get("/rooms", (req, res) => {
  res.json(rooms);
});

app.post("/rooms", (req, res) => {
  const { roomId, userName } = req.body;
  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ["users", new Map()],
        ["messages", []],
      ])
    );
  }

  res.send();
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

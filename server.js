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

//db
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
  socket.on("ROOM_JOIN", ({ roomId, userName }) => {
    //join the room that id is typed
    socket.join(roomId);
    rooms.get(roomId).get("users").set(socket.id, userName);
    const users = rooms.get(roomId).get("users").values();
    //request all rooms except me bcs I should see other users in my chat
    socket.to(roomId).broadcats.emit("ROOM_JOINED", users);
  });

  socket.on('disconnected', ()=>{
    rooms.forEach((value, roomId) => {
      if(value.get('users').delete(socket.id))
    });
  })
  console.log("user connected", socket.id);
});

//config server
server.listen(9999, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log("##########  Server run! ##########");
});

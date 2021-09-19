// sever setup
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");
const PORT = process.env.PORT || 5000;

app.use(cors());

// game setup
let players = {};

// socket connections
io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);

  socket.on("add_player", (name) => {
    if (Object.keys(players).length <= 4) {
      console.log(`[ADD PLAYER] ${socket.id} username: ${name}`);
      players[socket.id] = {
        id: socket.id,
        username: name,
      };
      console.log(`[PLAYERS] ${JSON.stringify(players)}`);

      socket.emit("login", {
        player: players[socket.id],
        players: players,
      });

      socket.broadcast.emit("player_joined", {
        player: players[socket.id],
        players: players,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} ${players[socket.id].username} disconnected`);
    const disconnected_player = players[socket.id]; // so we can still notify who left
    delete players[socket.id];

    socket.broadcast.emit("player_left", {
      player: disconnected_player,
      players: players,
    });
  });
});

app.get("/", (req, res) => {
  res.send("Server is up and running");
});

http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});

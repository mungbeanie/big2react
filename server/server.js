// sever setup
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");
const PORT = process.env.PORT || 5000;

app.use(cors());

// game setup
let players = {};

const getKeyFromObj = (key, players_object) => {
  return Object.values(players_object).map((players) => players[key]);
};

const playerReadyObj = (players_object) => {
  // username: { ready_status: ?? }
  let obj = [];
  obj = Object.keys(players_object).map((players) => {
    return players_object[players];
  });
  return obj;
};

// socket connections
io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);

  socket.on("add_player", (name) => {
    if (Object.keys(players).length <= 4) {
      console.log(`[ADD PLAYER] ${socket.id} username: ${name}`);
      players[socket.id] = {
        id: socket.id,
        username: name,
        ready_status: "waiting",
      };
      console.log(`[PLAYERS] ${JSON.stringify(players)}`);

      socket.emit("login", {
        player: players[socket.id],
        players: getKeyFromObj("username", players),
      });

      socket.broadcast.emit("player_joined", {
        player: players[socket.id],
        players: getKeyFromObj("username", players),
      });
    }
    playerReadyObj(players);
  });

  socket.on("player_status", (value, callback) => {
    console.log("player_status");
    players[socket.id] = {
      ...players[socket.id],
      ready_status: value,
    };
    callback(value);
    // socket.broadcast.emit("player_status", { username: ready_status);
    console.log(`[PLAYERS] ${JSON.stringify(players)}`);
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

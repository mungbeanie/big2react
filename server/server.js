// sever setup
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");
const PORT = process.env.PORT || 5000;

app.use(cors());

// game setup
// socket_id: {username, ready_status, action}
let connected_sockets = {};
let game = {
  status: "waiting", // waiting | ready | in-game
  whose_turn: null,
  last_played_card: null,
};

// socket connections
io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);

  socket.emit("test");

  socket.on("add_player", (name, callback) => {
    if (Object.keys(connected_sockets).length <= 4) {
      console.log(`[ADD PLAYER] ${socket.id} username: ${name}`);
      connected_sockets[socket.id] = {
        username: name,
        ready_status: "waiting",
        action: null,
      };
      callback(socket.id);
      console.log(`[PLAYERS] ${JSON.stringify(connected_sockets)}`);

      io.emit("player_joined", {
        player: connected_sockets[socket.id],
        players: connected_sockets,
      });
    }
  });

  socket.on("update_player_status", (value, callback) => {
    console.log("player_status");
    connected_sockets[socket.id] = {
      ...connected_sockets[socket.id],
      ready_status: value,
    };
    callback({ players: connected_sockets });

    io.emit("return_player_status", {
      players: connected_sockets,
    });

    const connected_player_keys = Object.keys(connected_sockets);
    let game_status = "waiting";
    if (
      connected_player_keys.length >= 2 &&
      connected_player_keys.length <= 4 &&
      connected_player_keys.every(
        (id) => connected_sockets[id].ready_status === "ready"
      )
    ) {
      console.log("game is ready");
      game_status = "ready";
    }
    game = {
      ...game,
      status: game_status,
    };

    io.emit("return_game_status", {
      game: game,
    });

    console.log(`[PLAYERS] ${JSON.stringify(connected_sockets)}`);
  });

  socket.on("update_game_status", (value) => {
    console.log("update_game_status");
    if (value === "ready") {
      game = {
        ...game,
        status: "in-game",
      };
      io.emit("return_game_status", {
        game: game,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log(
      `${socket.id} ${connected_sockets[socket.id].username} disconnected`
    );
    const disconnected_player = connected_sockets[socket.id]; // so we can still notify who left
    delete connected_sockets[socket.id];

    io.emit("player_left", {
      player: disconnected_player,
      players: connected_sockets,
    });
  });
});

app.get("/", (req, res) => {
  res.send("Server is up and running");
});

http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});

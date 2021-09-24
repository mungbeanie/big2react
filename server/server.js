// https://daidi.io/

// sever setup
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");
const { start } = require("repl");
const PORT = process.env.PORT || 5000;

app.use(cors());

const { Deck } = require("../src/CardDeck/CardDeck");
const deck = new Deck();

// socket_id: {username, ready_status, action, cards}
let connected_sockets = {};
let gameState = {};
let clientIds = [];
let startGame = false;
let currentPlayer = "";
let lastPlayed = { player: "", cards: [] };

const getGameState = () => {
  const gameState = {
    clientIds: clientIds,
    players: connected_sockets,
    startGame: startGame,
    currentPlayer: currentPlayer,
    lastPlayed: lastPlayed,
  };

  return gameState;
};

// socket connections
io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);
  socket.on("add_player", (name, callback) => {
    clientIds.push(socket.id);
    if (clientIds.length <= 4) {
      console.log(`[ADD PLAYER] ${socket.id} username: ${name}`);
      connected_sockets[socket.id] = {
        username: name,
        cards: [],
        connected: true,
        pass: false,
      };
      callback(socket.id);
      console.log(`[PLAYERS] ${JSON.stringify(connected_sockets)}`);

      io.emit("update_game", {
        type: "update",
        payload: {
          gameState: getGameState(),
        },
      });
    }
  });

  socket.on("update_game", (value) => {
    console.log(value);
    switch (value.type) {
      case "start_game":
        startGame = true;
        io.emit("update_game", {
          type: "update",
          payload: {
            gameState: getGameState(),
          },
        });
        break;
      default:
        break;
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

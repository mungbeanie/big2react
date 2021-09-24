// https://daidi.io/

// sever setup
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");
const PORT = process.env.PORT || 5000;

app.use(cors());

// const { Deck } = require("../src/CardDeck/CardDeck");
const { Deck } = require("../src/CardDeck/CardDeck2");
// const deck = new Deck();
const deck2 = new Deck();

let connectedSockets = {};
let clientIds = [];
let startGame = false;
let currentPlayer = "";
let lastPlayed = { player: "", cards: [] };

const getGameState = () => {
  const gameState = {
    clientIds: clientIds,
    players: connectedSockets,
    startGame: startGame,
    currentPlayer: currentPlayer,
    lastPlayed: lastPlayed,
  };

  return gameState;
};

// socket connections
io.on("connection", (socket) => {
  socket.on("add_player", (name, callback) => {
    clientIds.push(socket.id);
    if (clientIds.length <= 4) {
      console.log(`[ADD PLAYER] ${socket.id} username: ${name}`);
      connectedSockets[socket.id] = {
        username: name,
        cards: [],
        connected: true,
        pass: false,
      };
      callback(socket.id);
      console.log(`[PLAYERS] ${JSON.stringify(connectedSockets)}`);

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
        deck2.shuffle();
        const cardsToDeal = deck2.deal(clientIds);
        clientIds.forEach((id) => {
          connectedSockets[id] = {
            ...connectedSockets[id],
            cards: cardsToDeal[id],
          };
        });
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
      `${socket.id} ${connectedSockets[socket.id].username} disconnected`
    );
    const disconnected_player = connectedSockets[socket.id]; // so we can still notify who left
    delete connectedSockets[socket.id];

    io.emit("player_left", {
      player: disconnected_player,
      players: connectedSockets,
    });
  });
});

app.get("/", (req, res) => {
  res.send("Server is up and running");
});

http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});

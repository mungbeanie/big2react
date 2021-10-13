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
let turnOrder = [];
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
  console.log("currentGameState", gameState);
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
        id: socket.id,
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

  socket.on("update_game", (payload) => {
    console.log(payload);
    if (payload.type === "start_game") {
      startGame = true;
      deck2.shuffle();
      const cardsToDeal = deck2.deal(clientIds);
      clientIds.forEach((id) => {
        connectedSockets[id] = {
          ...connectedSockets[id],
          cards: cardsToDeal[id],
        };
      });
      // set first player to be the one with 3 diamonds
      currentPlayer = Object.values(connectedSockets).find((player) =>
        player.cards.includes("3d")
      ).username;
      io.emit("update_game", {
        type: "update",
        payload: {
          gameState: getGameState(),
        },
      });
    } else if (payload.type === "player_move") {
      if (deck2.checkIsValidMove(payload.payload.cards, lastPlayed.cards)) {
        lastPlayed = {
          player: payload.payload.player,
          cards: payload.payload.cards,
        }; // username or id?
        deck2.discard(payload.payload.cards);
        // updating cards for current player
        connectedSockets[[payload.payload.player]] = {
          ...connectedSockets[payload.payload.player],
          cards: connectedSockets[payload.payload.player].cards.filter(
            (cards) => !payload.payload.cards.includes(cards)
          ),
        };
        // updating turn order
        const currentPlayerId = Object.values(connectedSockets).find(
          (player) => player.username === currentPlayer
        ).id;
        let currentPlayerIdIndex = clientIds.indexOf(currentPlayerId);
        if (clientIds[currentPlayerIdIndex + 1]) {
          currentPlayer =
            connectedSockets[clientIds[currentPlayerIdIndex + 1]].username;
        } else {
          // end of array, go to first id
          currentPlayer = connectedSockets[clientIds[0]].username;
        }
        io.emit("update_game", {
          type: "update",
          payload: {
            gameState: getGameState(),
          },
        });
      }
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

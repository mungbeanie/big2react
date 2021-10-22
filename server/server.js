// https://daidi.io/

// sever setup
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");
const PORT = process.env.PORT || 5000;

app.use(cors());

const cardHelper = require("../src/CardDeck/ServerCardHelperFunctions");

// const { Deck } = require("../src/CardDeck/CardDeck");
const { Deck } = require("../src/CardDeck/CardDeck2");
// const deck = new Deck();
const deck2 = new Deck();

let connectedSockets = {};
let clientIds = [];
let playerTurnOrder = [];
let turnNumber = 0;
let startGame = false;
let currentPlayer = null;
let lastPlayed = { player: null, cards: [] };

const getGameState = () => {
  const gameState = {
    clientIds: clientIds,
    players: connectedSockets,
    startGame: startGame,
    currentPlayer: currentPlayer,
    lastPlayed: lastPlayed,
    turnNumber: turnNumber,
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
      // console.log(`[PLAYERS] ${JSON.stringify(connectedSockets)}`);

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
      playerTurnOrder = [...clientIds];
      // set first player to be the one with lowest card
      currentPlayer = Object.values(connectedSockets).find((player) =>
        player.cards.includes(deck2.getLowestCardInDeck())
      ).username;
      turnNumber++;
    } else if (payload.type === "player_move") {
      const playedCards = cardHelper.sortCards(payload.payload.cards, "value");
      if (deck2.checkIsValidMove(playedCards, lastPlayed.cards, turnNumber)) {
        lastPlayed = {
          player: payload.payload.player,
          cards: playedCards,
        }; // username or id?
        deck2.discard(playedCards);
        // updating cards for current player
        connectedSockets[[payload.payload.player]] = {
          ...connectedSockets[payload.payload.player],
          cards: connectedSockets[payload.payload.player].cards.filter(
            (cards) => !playedCards.includes(cards)
          ),
        };
        if (connectedSockets[[payload.payload.player]].cards.length === 0) {
          console.log(
            `${connectedSockets[[payload.payload.player]].username} wins`
          );
          return;
        } else {
          // updating turn order
          const currentPlayerId = Object.values(connectedSockets).find(
            (player) => player.username === currentPlayer
          ).id;
          let currentPlayerIdIndex = playerTurnOrder.indexOf(currentPlayerId);
          if (playerTurnOrder[currentPlayerIdIndex + 1]) {
            currentPlayer =
              connectedSockets[playerTurnOrder[currentPlayerIdIndex + 1]]
                .username;
          } else {
            // end of array, go to first id
            currentPlayer = connectedSockets[playerTurnOrder[0]].username;
          }
        }
      }
    } else if (payload.type === "player_pass") {
      connectedSockets[[payload.payload.player]] = {
        ...connectedSockets[payload.payload.player],
        pass: true,
      };
      // updating turn order
      const currentPlayerId = Object.values(connectedSockets).find(
        (player) => player.username === currentPlayer
      ).id;
      let currentPlayerIdIndex = playerTurnOrder.indexOf(currentPlayerId);
      playerTurnOrder.splice(currentPlayerIdIndex, 1);
      if (playerTurnOrder.length === 1) {
        console.log(
          `${connectedSockets[playerTurnOrder[0]].username} wins hand`
        );
        // start new turn
        currentPlayer = connectedSockets[lastPlayed.player].username;
        lastPlayed = { player: null, cards: [] };
        clientIds.forEach(
          (id) =>
            (connectedSockets[id] = {
              ...connectedSockets[id],
              pass: false,
            })
        );
        console.log(clientIds);
        playerTurnOrder = [...clientIds];
        turnNumber++;
      }
      // removing passed player from turn array
      else if (currentPlayerIdIndex === playerTurnOrder.length) {
        currentPlayer = connectedSockets[playerTurnOrder[0]].username;
      } else {
        currentPlayer =
          connectedSockets[playerTurnOrder[currentPlayerIdIndex]].username;
      }
    }
    io.emit("update_game", {
      type: "update",
      payload: {
        gameState: getGameState(),
      },
    });
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

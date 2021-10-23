import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";

import { sortCards } from "./CardHelperFunctions";

import {
  useSocketStore,
  useGameStore,
  useUserStore,
} from "../../../Stores/stores";

const PlayerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
`;

const PlayerDisplay = ({ player }) => {
  const socketStore = useSocketStore();
  const gameStore = useGameStore();
  const userStore = useUserStore();

  const [sortType, setSortType] = useState("value");
  const [selectedCards, setSelectedCards] = useState([]);
  const [move, setMove] = useState({ move: null });

  const canPass = () => {
    return (
      gameStore.currentPlayer === userStore.username &&
      !gameStore.players[userStore.id].pass &&
      gameStore.lastPlayed.cards.length !== 0
    );
  };

  const canPlay = () => {
    return (
      gameStore.currentPlayer === userStore.username &&
      !gameStore.players[userStore.id].pass
    );
  };

  useEffect(() => {
    setSelectedCards([]);
  }, [gameStore.lastPlayed]);

  useEffect(() => {
    setMove({ move: null });
  }, [gameStore.turnNumber]);

  return (
    <div>
      <p>{player.username}</p>
      {gameStore.currentPlayer === userStore.username && <p>Your Turn</p>}
      {gameStore.currentPlayer === userStore.username &&
        gameStore.lastPlayed.cards.length === 0 && <p>Free Turn</p>}
      {move.move === "invalid" && <p>{move.move} move</p>}
      {gameStore.currentPlayer === userStore.username &&
        gameStore.players[userStore.id].pass && <p>Passed</p>}
      <button onClick={() => setSortType("value")}>Sort by value</button>
      <button onClick={() => setSortType("suit")}>Sort by suit</button>

      <div>
        <button
          disabled={!canPlay()}
          onClick={() => {
            selectedCards.length !== 0 &&
              socketStore.socket.emit(
                "update_game",
                {
                  type: "player_move",
                  payload: { player: player.id, cards: selectedCards },
                },
                (response) => {
                  setMove(response);
                }
              );
          }}
        >
          Play
        </button>
      </div>

      <div>
        <button
          disabled={!canPass()}
          onClick={() => {
            socketStore.socket.emit("update_game", {
              type: "player_pass",
              payload: { player: player.id, pass: true },
            });
          }}
        >
          Pass
        </button>
      </div>

      <PlayerContainer>
        {sortCards(player.cards, sortType).map((card) => (
          <Card
            key={card}
            card={card}
            isSelected={selectedCards.includes(card)}
            selectedCards={selectedCards}
            setSelectedCards={setSelectedCards}
          />
        ))}
      </PlayerContainer>
    </div>
  );
};

export default PlayerDisplay;

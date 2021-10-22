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

  useEffect(() => {
    setSelectedCards([]);
  }, [gameStore.lastPlayed]);

  return (
    <div>
      <p>{player.username}</p>
      {gameStore.currentPlayer === userStore.username && <p>Your Turn</p>}
      {gameStore.currentPlayer === userStore.username &&
        gameStore.players[userStore.id].pass && <p>Passed</p>}
      <button onClick={() => setSortType("value")}>Sort by value</button>
      <button onClick={() => setSortType("suit")}>Sort by suit</button>

      {gameStore.currentPlayer === userStore.username &&
        selectedCards.length !== 0 &&
        !gameStore.players[userStore.id].pass && (
          <div>
            <button
              onClick={() => {
                socketStore.socket.emit("update_game", {
                  type: "player_move",
                  payload: { player: player.id, cards: selectedCards },
                });
              }}
            >
              Play
            </button>
          </div>
        )}
      {gameStore.currentPlayer === userStore.username &&
        !gameStore.players[userStore.id].pass && (
          <div>
            <button
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
        )}

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

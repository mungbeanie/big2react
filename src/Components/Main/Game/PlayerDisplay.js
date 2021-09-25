import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";

import { sortCards } from "./CardHelperFunctions";

import { useSocketStore } from "../../../Stores/stores";
import { useGameStore } from "../../../Stores/stores";

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

  const [sortType, setSortType] = useState("value");
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    setSelectedCards([]);
  }, [gameStore.lastPlayed]);

  return (
    <div>
      <p>{player.username}</p>
      <button onClick={() => setSortType("value")}>Sort by value</button>
      <button onClick={() => setSortType("suit")}>Sort by suit</button>
      {selectedCards.length !== 0 && (
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

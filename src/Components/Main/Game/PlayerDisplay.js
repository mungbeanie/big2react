import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";

import { sortCards } from "./CardHelperFunctions";

const PlayerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
`;

const PlayerDisplay = ({ player }) => {
  const [sortType, setSortType] = useState("value");

  return (
    <div>
      <p>{player.username}</p>
      <button onClick={() => setSortType("value")}>Sort by value</button>
      <button onClick={() => setSortType("suit")}>Sort by suit</button>
      <PlayerContainer>
        {sortCards(player.cards, sortType).map((card) => (
          // {player.cards.map((card) => (
          <Card key={card} card={card} />
        ))}
      </PlayerContainer>
    </div>
  );
};

export default PlayerDisplay;

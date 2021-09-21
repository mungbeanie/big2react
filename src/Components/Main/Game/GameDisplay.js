import styled from "styled-components";
import { useGameStore } from "../../../Stores/stores";

// const cardStyle = styled.div`
//   height: 20px;
//   width: 20px;
//   border: 1px black solid;
// `;

const GameDisplay = ({ cards }) => {
  const gameStore = useGameStore();

  // return gameStore.deck.cards.map((card) => <cardStyle>{card.suit}</cardStyle>);
  return (
    <>
      <h1>connected:</h1>
      {gameStore.players.map((name) => (
        <div key={name}>
          <span>{name}</span>
        </div>
      ))}
    </>
  );
};

export default GameDisplay;

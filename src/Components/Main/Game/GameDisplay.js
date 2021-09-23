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

      {Object.keys(gameStore.players).map((player_id) => (
        <div key={player_id}>
          <span>{gameStore.players[player_id].username}</span>
          <span>{gameStore.players[player_id].ready_status}</span>
        </div>
      ))}
    </>
  );
};

export default GameDisplay;

import styled from "styled-components";
import { useGameStore } from "../../../Stores/stores";

const GameDisplay = ({ cards }) => {
  const gameStore = useGameStore();

  const cardStyle = styled.div`
    height: 20px;
    width: 20px;
    border: 1px black solid;
  `;

  return gameStore.deck.cards.map((card) => <cardStyle>{card.suit}</cardStyle>);
};

export default GameDisplay;

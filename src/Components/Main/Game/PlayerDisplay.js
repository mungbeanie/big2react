import styled from "styled-components";
import Card from "./Card";

const PlayerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
`;

const PlayerDisplay = ({ player }) => {
  return (
    <div>
      <p>{player.username}</p>
      <PlayerContainer>
        {player.cards.map((card) => (
          <Card card={card} />
        ))}
      </PlayerContainer>
    </div>
  );
};

export default PlayerDisplay;

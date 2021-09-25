import styled from "styled-components";
import PlayerDisplay from "./PlayerDisplay";
import { useGameStore } from "../../../Stores/stores";
import Card from "./Card";

const CardAreaHeader = styled.div`
  font-weight: bold;
  font-size: 2rem;
  justify-self: start;
`;

const CardAreaSurface = styled.div`
  width: 100vw;
  min-height: 50vh;
  padding: 1rem;
  background: green;
  border: 1px black solid;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const JustPlayedContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
`;

const CardArea = () => {
  const gameStore = useGameStore();

  return (
    <>
      <CardAreaSurface>
        <CardAreaHeader>Card Area</CardAreaHeader>
        {gameStore.lastPlayed.player && (
          <>
            <CardAreaHeader>Just Played:</CardAreaHeader>
            {gameStore.players[gameStore.lastPlayed.player].username}
            <JustPlayedContainer>
              {gameStore.lastPlayed.cards.map((card) => (
                <Card key={card} card={card} isReadOnly />
              ))}
            </JustPlayedContainer>
          </>
        )}
        <div>
          {gameStore.clientIds.map((id) => (
            <PlayerDisplay player={gameStore.players[id]} />
          ))}
        </div>
      </CardAreaSurface>
    </>
  );
};

export default CardArea;

import styled from "styled-components";
import PlayerDisplay from "./PlayerDisplay";
import { useGameStore, useUserStore } from "../../../Stores/stores";
import Card from "./Card";

const CardAreaHeader = styled.div`
  font-weight: bold;
  font-size: 2rem;
  justify-self: start;
`;

const CardAreaSurface = styled.div`
  min-width: 80vw;
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
  const userStore = useUserStore();

  return (
    <>
      <CardAreaSurface>
        <CardAreaHeader>Card Area</CardAreaHeader>

        {Object.values(gameStore.players).map((player) => (
          <div key={player + player.username}>
            <p>{player.username}</p>
            {player.pass && <p>Passed</p>}
            <p>Cards Remaining: {player.cards.length}</p>
          </div>
        ))}

        <CardAreaHeader>Turn: {gameStore.turnNumber}</CardAreaHeader>
        {gameStore.lastPlayed.player && (
          <>
            <CardAreaHeader>
              {gameStore.players[gameStore.lastPlayed.player].username}
            </CardAreaHeader>
            <CardAreaHeader>Just Played:</CardAreaHeader>

            <JustPlayedContainer>
              {gameStore.lastPlayed.cards.map((card) => (
                <Card key={card} card={card} isReadOnly />
              ))}
            </JustPlayedContainer>
          </>
        )}
        <div>
          <PlayerDisplay player={gameStore.players[userStore.id]} />
        </div>
      </CardAreaSurface>
    </>
  );
};

export default CardArea;

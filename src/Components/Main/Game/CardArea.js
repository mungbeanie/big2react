import styled from "styled-components";
import PlayerDisplay from "./PlayerDisplay";
import { useGameStore } from "../../../Stores/stores";

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

const CardArea = () => {
  const gameStore = useGameStore();

  return (
    <>
      <CardAreaSurface>
        <CardAreaHeader>Card Area</CardAreaHeader>
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

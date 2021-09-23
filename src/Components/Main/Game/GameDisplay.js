import styled from "styled-components";
import { useGameStore } from "../../../Stores/stores";
import CardArea from "./CardArea";

const ConnectedSpan = styled.span`
  padding: 0 0.5rem;
`;

const GameDisplay = () => {
  const gameStore = useGameStore();

  return (
    <>
      <h1>connected:</h1>

      {Object.keys(gameStore.players).map((player_id) => (
        <div key={player_id}>
          <ConnectedSpan>{gameStore.players[player_id].username}</ConnectedSpan>
          <ConnectedSpan>
            {gameStore.players[player_id].ready_status}
          </ConnectedSpan>
        </div>
      ))}

      {gameStore.status.startsWith("game") && <CardArea />}
    </>
  );
};

export default GameDisplay;

import { useGameStore } from "../../../Stores/stores";
import CardArea from "./CardArea";

const GameDisplay = () => {
  const gameStore = useGameStore();

  return (
    <>
      <h1>connected:</h1>
      <ul>
        {gameStore.clientIds.map((id) => (
          <li key={id}>{gameStore.players[id].username}</li>
        ))}
      </ul>

      {gameStore.startGame && <CardArea />}
    </>
  );
};

export default GameDisplay;

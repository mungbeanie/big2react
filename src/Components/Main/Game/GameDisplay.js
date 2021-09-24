import { useGameStore } from "../../../Stores/stores";

import ConnectedPlayers from "./ConnectedPlayers";
import CardArea from "./CardArea";

const GameDisplay = () => {
  const gameStore = useGameStore();

  return (
    <>
      <ConnectedPlayers />
      {gameStore.startGame && <CardArea />}
    </>
  );
};

export default GameDisplay;

import { useGameStore } from "../../../Stores/stores";

const GameButtons = ({ deck }) => {
  const gameStore = useGameStore();

  return (
    <>
      <button onClick={() => gameStore.shuffleDeck()}>Shuffle</button>
    </>
  );
};

export default GameButtons;

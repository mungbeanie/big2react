import { useGameStore, useSocketStore } from "../../../Stores/stores";

const GameButtons = () => {
  const gameStore = useGameStore();
  const socketStore = useSocketStore();

  return (
    <>
      {gameStore.clientIds.length > 1 && !gameStore.startGame && (
        <button
          onClick={() => {
            socketStore.socket.emit("update_game", { type: "start_game" });
          }}
        >
          Play
        </button>
      )}
      {gameStore.endGameCondition && <h1>{gameStore.endGameCondition}</h1>}
    </>
  );
};

export default GameButtons;

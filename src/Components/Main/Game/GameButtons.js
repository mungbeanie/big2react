import {
  useGameStore,
  useSocketStore,
  useUserStore,
} from "../../../Stores/stores";

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
    </>
  );
};

export default GameButtons;

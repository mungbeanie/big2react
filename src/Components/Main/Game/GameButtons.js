import {
  useGameStore,
  useSocketStore,
  useUserStore,
} from "../../../Stores/stores";

const GameButtons = () => {
  const gameStore = useGameStore();
  const socketStore = useSocketStore();
  const userStore = useUserStore();

  return (
    <>
      {gameStore.status === "waiting" && userStore.readyStatus === "waiting" && (
        <button
          onClick={() => {
            socketStore.socket.emit("player_status", "ready", (response) => {
              userStore.setState("readyStatus", response);
            });
          }}
        >
          Play
        </button>
      )}
    </>
  );
};

export default GameButtons;

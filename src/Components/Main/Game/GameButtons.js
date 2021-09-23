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
      <button
        onClick={() => {
          socketStore.socket.emit(
            "update_player_status",
            userStore.readyStatus === "ready" ? "waiting" : "ready",
            (response) => {
              userStore.setState(
                "readyStatus",
                response.players[userStore.id].ready_status
              );
              gameStore.setState("players", response.players);
            }
          );
        }}
      >
        {userStore.readyStatus === "ready" ? "Unready" : "Ready"}
      </button>
      {gameStore.status === "ready" && (
        <button
          onClick={() => {
            socketStore.socket.emit("update_game_status", "ready");
          }}
        >
          Play
        </button>
      )}
    </>
  );
};

export default GameButtons;

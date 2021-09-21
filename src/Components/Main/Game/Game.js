import GameButtons from "./GameButtons";
import GameDisplay from "./GameDisplay";
import {
  useUserStore,
  useSocketStore,
  useGameStore,
} from "../../../Stores/stores";
import { useEffect } from "react";

const Game = () => {
  const userStore = useUserStore();
  const gameStore = useGameStore();
  const socketStore = useSocketStore();

  useEffect(() => {
    socketStore.socket.emit("add_player", userStore.username);
  }, []);

  useEffect(() => {
    const loginListener = (data) => {
      console.log("login", data);
      gameStore.setState("players", data.players);
    };

    const playerJoinedListener = (data) => {
      console.log(`${data.player.username} joined`, data);
      gameStore.setState("players", data.players);
    };

    const playerLeftListener = (data) => {
      console.log(`${data.player.username} left`, data);
      gameStore.setState("players", data.players);
    };

    socketStore.socket.on("login", loginListener);
    socketStore.socket.on("player_joined", playerJoinedListener);
    socketStore.socket.on("player_left", playerLeftListener);

    return () => {
      socketStore.socket.off("login", loginListener);
      socketStore.socket.off("player_joined", playerJoinedListener);
      socketStore.socket.off("player_left", playerLeftListener);
    };
  }, [socketStore.socket, gameStore]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <span>Logged in as:{userStore.username}</span>
          <span>{userStore.readyStatus}</span>
        </div>
        <div>
          <GameButtons />
        </div>
        <div>
          <GameDisplay />
        </div>
      </div>
    </>
  );
};

export default Game;

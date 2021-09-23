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
    socketStore.socket.emit("add_player", userStore.username, (response) => {
      userStore.setState("id", response);
    });
  }, []);

  useEffect(() => {
    const playerJoinedListener = (data) => {
      console.log(`${data.player.username} joined`, data);
      gameStore.setState("players", data.players);
    };

    const playerLeftListener = (data) => {
      console.log(`${data.player.username} left`, data);
      gameStore.setState("players", data.players);
    };

    const playerUpdateStatus = (data) => {
      console.log(`playerUpdateStatus updated`, data);
      gameStore.setState("players", data.players);
    };

    const gameStatus = (data) => {
      console.log(`game updated`, data);
      gameStore.setState("status", data.game.status);
    };

    socketStore.socket.on("player_joined", playerJoinedListener);
    socketStore.socket.on("player_left", playerLeftListener);
    socketStore.socket.on("return_player_status", playerUpdateStatus);
    socketStore.socket.on("return_game_status", gameStatus);

    return () => {
      socketStore.socket.off("player_joined", playerJoinedListener);
      socketStore.socket.off("player_left", playerLeftListener);
      socketStore.socket.off("return_player_status", playerUpdateStatus);
      socketStore.socket.off("return_game_status", gameStatus);
    };
  }, [socketStore.socket, gameStore]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <span>Logged in as:{userStore.username}</span>
          <span>{userStore.readyStatus}</span>
        </div>
        {gameStore.status !== "in-game" && (
          <div>
            <GameButtons />
          </div>
        )}
        <div>
          <GameDisplay />
        </div>
      </div>
    </>
  );
};

export default Game;

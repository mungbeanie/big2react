import { useEffect } from "react";

import {
  useUserStore,
  useSocketStore,
  useGameStore,
} from "../../../Stores/stores";

import styled from "styled-components";

import GameButtons from "./GameButtons";
import GameDisplay from "./GameDisplay";

const LoggedInSpan = styled.span`
  padding: 0 0.5rem;
`;

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
          <LoggedInSpan>
            Logged in as:<LoggedInSpan>{userStore.username}</LoggedInSpan>
          </LoggedInSpan>
          <LoggedInSpan>{userStore.readyStatus}</LoggedInSpan>
        </div>
        {(gameStore.status === "waiting" || gameStore.status === "ready") && (
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

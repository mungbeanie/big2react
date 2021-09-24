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
    const updateGameListener = (data) => {
      console.log(`game updated`, data);
      gameStore.updateState(data.payload);
    };

    socketStore.socket.on("update_game", updateGameListener);
    return () => {
      socketStore.socket.off("update_game", updateGameListener);
    };
  }, [socketStore.socket, gameStore]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <LoggedInSpan>
            Logged in as:<LoggedInSpan>{userStore.username}</LoggedInSpan>
          </LoggedInSpan>
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

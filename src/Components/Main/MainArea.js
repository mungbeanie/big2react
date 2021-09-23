import Game from "./Game/Game";
import Lobby from "./Lobby/Lobby";
import { useUserStore, useSocketStore } from "../../Stores/stores";
import styled from "styled-components";

const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

const MainArea = () => {
  const userStore = useUserStore();
  const socketStore = useSocketStore();

  return (
    <>
      <MainDiv>
        {userStore.username && socketStore.socket ? <Game /> : <Lobby />}
      </MainDiv>
    </>
  );
};
export default MainArea;

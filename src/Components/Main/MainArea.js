import Game from "./Game/Game";
import Lobby from "./Lobby/Lobby";
import { useUserStore, useSocketStore } from "../../Stores/stores";

const MainArea = () => {
  const userStore = useUserStore();
  const socketStore = useSocketStore();

  return <>{userStore.username && socketStore.socket ? <Game /> : <Lobby />}</>;
};
export default MainArea;

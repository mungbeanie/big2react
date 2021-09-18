import Game from "./Game/Game";
import Lobby from "./Lobby/Lobby";
import { useUserStore } from "../../Stores/stores";

const MainArea = () => {
  const userStore = useUserStore();
  return <>{userStore.username ? <Game /> : <Lobby />}</>;
};
export default MainArea;

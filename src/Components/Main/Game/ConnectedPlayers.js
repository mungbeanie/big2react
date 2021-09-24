import { useGameStore } from "../../../Stores/stores";

const ConnectedPlayers = () => {
  const gameStore = useGameStore();
  return (
    <>
      <h1>connected:</h1>
      <ul>
        {gameStore.clientIds.map((id) => (
          <li key={id}>{gameStore.players[id].username}</li>
        ))}
      </ul>
    </>
  );
};

export default ConnectedPlayers;

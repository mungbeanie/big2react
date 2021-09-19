import { useRef } from "react";
import { useUserStore, useSocketStore } from "../../../Stores/stores";

const Lobby = () => {
  const usernameRef = useRef("");
  const userStore = useUserStore();
  const socketStore = useSocketStore();

  const submit = (event) => {
    event.preventDefault();
    userStore.setUsername(usernameRef.current);
    socketStore.establishSocket();
  };

  return (
    <>
      <div>lobby</div>
      <form onSubmit={submit}>
        <input
          id="username"
          type="text"
          required
          onChange={(event) => {
            usernameRef.current = event.target.value;
          }}
        />
      </form>
    </>
  );
};

export default Lobby;

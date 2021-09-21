import create from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

import { io } from "socket.io-client";

// socket
const ENDPOINT = "http://localhost:5000";
const socketOptions = { transports: ["websocket", "polling"] };

export const useSocketStore = create((set, get) => ({
  endpoint: ENDPOINT,
  socket: "",
  establishSocket: () =>
    set(() => ({
      socket: io(ENDPOINT, socketOptions),
    })),
}));

export const useGameStore = create((set, get) => ({
  userTurn: "",
  lastPlayedCard: "",
  status: "waiting", // waiting | ready | active | disconnected
  players: [],
  setState: (key, value) => set(() => ({ [key]: value })),
}));

export const useUserStore = create((set, get) => ({
  username: "",
  readyStatus: "waiting", // waiting | ready | active | disconnected
  setState: (key, value) => set(() => ({ [key]: value })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("useGameStore", useGameStore);
  mountStoreDevtool("useUserStore", useUserStore);
  mountStoreDevtool("useSocketStore", useSocketStore);
}

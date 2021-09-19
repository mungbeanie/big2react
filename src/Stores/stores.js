import create from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

import { io } from "socket.io-client";

import Deck from "../CardDeck/CardDeck";

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
  playedCard: "",
  players: {},
  updatePlayers: (players) => set(() => ({ players: players })),
}));

export const useUserStore = create((set, get) => ({
  username: "",
  setUsername: (username) => set(() => ({ username: username })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("useGameStore", useGameStore);
  mountStoreDevtool("useUserStore", useUserStore);
  mountStoreDevtool("useSocketStore", useSocketStore);
}

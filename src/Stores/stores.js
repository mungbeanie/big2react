import create from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

import { io } from "socket.io-client";

// socket
const ENDPOINT = "http://localhost:5000";
const socketOptions = { transports: ["websocket", "polling"] };

export const useSocketStore = create((set) => ({
  endpoint: ENDPOINT,
  socket: "",
  establishSocket: () =>
    set(() => ({
      socket: io(ENDPOINT, socketOptions),
    })),
}));

export const useGameStore = create((set) => ({
  clientIds: [],
  players: {},
  startGame: false,
  currentPlayer: "",
  lastPlayed: { player: "", cards: [] },
  turnNumber: 0,
  endGameCondition: null,
  setState: (key, value) => set(() => ({ [key]: value })),
  updateState: (payload) =>
    set(() => ({
      clientIds: payload.gameState.clientIds,
      players: payload.gameState.players, // players = { username, cards, connected, pass};
      startGame: payload.gameState.startGame,
      currentPlayer: payload.gameState.currentPlayer,
      lastPlayed: payload.gameState.lastPlayed,
      turnNumber: payload.gameState.turnNumber,
      endGameCondition: payload.gameState.endGameCondition,
    })),
}));

export const useUserStore = create((set) => ({
  username: "",
  id: "",
  setState: (key, value) => set(() => ({ [key]: value })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("useGameStore", useGameStore);
  mountStoreDevtool("useUserStore", useUserStore);
  mountStoreDevtool("useSocketStore", useSocketStore);
}

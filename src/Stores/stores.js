import create from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

import Deck from "../CardDeck/CardDeck";

export const useSocketStore = create((set, get) => ({}));

export const useGameStore = create((set, get) => ({
  deck: new Deck(),
  userTurn: 0,
  playedCard: "",
  setNextUserTurn: () =>
    set((state) => ({ userTurn: (state.userTurn + 1) % 4 })), // reset after 4th player - TODO: make amount of players of adjustable
}));

export const useUserStore = create((set, get) => ({
  username: "",
  setUsername: (username) => set(() => ({ username: username })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("useGameStore", useGameStore);
  mountStoreDevtool("useUserStore", useUserStore);
}

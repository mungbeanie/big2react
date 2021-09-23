import CardDeck from "../src/CardDeck/CardDeck";

const deck = new CardDeck();

const gameFlow = (game_status, action) => {
  switch (game_status) {
    //   game_init | game_active | game_end
    case "game_init":
      deck.shuffle();
      break;
    case "game_active":
      break;
    case "game_end":
      break;
    default:
      break;
  }
};

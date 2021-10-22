const cardHelper = require("./ServerCardHelperFunctions");

const freshDeck = () => {
  return cardHelper.SUITS.flatMap((suit) => {
    return cardHelper.VALUES.map((value) => {
      return `${value}${suit}`;
    });
  });
};

class Deck {
  constructor(cards = freshDeck()) {
    this.cards = cards;
    this.discards = [];
  }

  get numberOfCards() {
    return this.cards.length;
  }

  pop() {
    return this.cards.shift();
  }

  push(card) {
    this.cards.push(card);
  }

  discard(card_array) {
    card_array.forEach((to_discard) => {
      const index = this.cards.indexOf(to_discard);
      if (index > -1) {
        // remove from cards
        this.cards.splice(index, 1);
      }
      // add to discard
      this.discards.push(to_discard);
    });
  }

  deal(player_id_array) {
    let dealt_cards_obj = {};
    const num_players = player_id_array.length;
    const card_amount_to_deal = Math.floor(this.numberOfCards / num_players);
    let working_deck = [...this.cards]; // shallow copy
    player_id_array.forEach((id) => {
      dealt_cards_obj[id] = working_deck.splice(0, card_amount_to_deal);
    });
    return dealt_cards_obj;
  }

  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
    return this.cards;
  }

  getLowestCardInDeck() {
    const cards = this.cards;
    return cards.sort(cardHelper.sortByValue)[0];
  }

  checkPlayedIsInDeck(played_card_array) {
    // played cards are still in the deck and not discarded
    console.log(
      "are played cards in deck",
      played_card_array.every((played_card) => this.cards.includes(played_card))
    );
    return played_card_array.every((played_card) =>
      this.cards.includes(played_card)
    );
  }

  checkPlayedIsLarger(played_card_array, last_played_card_array) {
    if (
      last_played_card_array.length === played_card_array.length ||
      last_played_card_array.length === 0
    ) {
      //   // not first move
      const combo_length = played_card_array.length;
      switch (combo_length) {
        case 1:
          console.log("1 card");
          return cardHelper.checkSingleCardCombo(
            played_card_array,
            last_played_card_array
          );
        case 2:
          console.log("2 card");
          return cardHelper.checkDoubleAndTripleCardCombo(
            played_card_array,
            last_played_card_array
          );
        case 3:
          console.log("3 card");
          return cardHelper.checkDoubleAndTripleCardCombo(
            played_card_array,
            last_played_card_array
          );
        case 4:
          return false;
        case 5:
          console.log("5 card");
          return cardHelper.checkFiveCardCombo(
            played_card_array,
            last_played_card_array
          );
        default:
          return false;
      }
    }
    // return false;
  }

  checkIsValidMove(played_card_array, last_played_card_array, turn_number) {
    if (turn_number === 1 && last_played_card_array.length === 0) {
      return (
        played_card_array.includes(this.getLowestCardInDeck()) &&
        this.checkPlayedIsInDeck(played_card_array) &&
        this.checkPlayedIsLarger(played_card_array, last_played_card_array)
      );
    }
    return (
      this.checkPlayedIsInDeck(played_card_array) &&
      this.checkPlayedIsLarger(played_card_array, last_played_card_array)
    );
  }
}

module.exports = {
  Deck,
};

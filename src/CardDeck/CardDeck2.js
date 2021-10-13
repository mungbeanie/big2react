const SUITS = ["d", "c", "h", "s"]; // spades, clubs, hearts, diamonds
const VALUES = [
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "j",
  "q",
  "k",
  "a",
  "2",
];

const freshDeck = () => {
  return SUITS.flatMap((suit) => {
    return VALUES.map((value) => {
      return `${value}${suit}`;
    });
  });
};

const getCardSuit = (card) => card.slice(-1);
const getCardValue = (card) => {
  const suit_index = card.indexOf(getCardSuit(card));
  return card.slice(0, suit_index);
};

// const valid_moves = {
//   // valid card combinations on amount of cards played
//   1: freshDeck(),
//   2: [],
//   3: [],
//   4: [],
//   5: [],
// };

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

  checkPlayedIsInDeck(played_card_array) {
    // played cards are still in the deck and not discarded
    return played_card_array.every((played_card) =>
      this.cards.includes(played_card)
    );
  }

  checkPlayedIsLarger(played_card_array, last_played_card_array) {
    if (last_played_card_array.length) {
      // not first move
      if (last_played_card_array.length === played_card_array.length) {
        const combo_length = last_played_card_array.length;
        switch (combo_length) {
          case 1:
            if (
              VALUES.indexOf(getCardValue(played_card_array[0])) <
              VALUES.indexOf(getCardValue(last_played_card_array[0]))
            ) {
              return false;
            }
            // larger value
            if (
              VALUES.indexOf(getCardValue(played_card_array[0])) >
              VALUES.indexOf(getCardValue(last_played_card_array[0]))
            ) {
              return true;
            } else {
              return SUITS.indexOf(getCardSuit(played_card_array[0])) <
                SUITS.indexOf(getCardSuit(last_played_card_array[0]))
                ? false
                : true;
            }
          case 2:
            break;
          case 3:
            break;
          case 4:
            break;
          case 5:
            break;
          default:
            return false;
        }
      }
    }
    return true; // first move
  }

  checkIsValidMove(played_card_array, last_played_card_array) {
    return (
      this.checkPlayedIsInDeck(played_card_array) &&
      this.checkPlayedIsLarger(played_card_array, last_played_card_array)
    );
  }
}

module.exports = {
  Deck,
};

const SUITS = ["s", "c", "h", "d"]; // spades, clubs, hearts, diamonds
const VALUES = Array(13)
  .fill()
  .map((element, index) => index + 1);

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
    const whole_deck = this.cards;
    player_id_array.forEach((id) => {
      dealt_cards_obj[id] = whole_deck.splice(0, card_amount_to_deal);
    });
    this.discard(whole_deck);
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
}

const freshDeck = () => {
  return SUITS.flatMap((suit) => {
    return VALUES.map((value) => {
      return `${value}${suit}`;
    });
  });
};

module.exports = {
  Deck,
};

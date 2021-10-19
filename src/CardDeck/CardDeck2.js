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

const sortByValue = (a, b) => {
  // sort by value then suits
  const a_obj = { value: getCardValue(a), suit: getCardSuit(a) };
  const b_obj = { value: getCardValue(b), suit: getCardSuit(b) };
  // sorting by using element order in array as lowest to highest values
  // smaller value
  if (VALUES.indexOf(a_obj.value) < VALUES.indexOf(b_obj.value)) {
    return -1;
  }
  // larger value
  if (VALUES.indexOf(a_obj.value) > VALUES.indexOf(b_obj.value)) {
    return 1;
  }
  // same value
  else {
    return SUITS.indexOf(a_obj.suit) < SUITS.indexOf(b_obj.suit) ? -1 : 1;
  }
};

const sortBySuit = (a, b) => {
  const a_obj = { value: getCardValue(a), suit: getCardSuit(a) };
  const b_obj = { value: getCardValue(b), suit: getCardSuit(b) };
  // sorting by using element order in array as lowest to highest values
  // smaller value
  if (SUITS.indexOf(a_obj.suit) < SUITS.indexOf(b_obj.suit)) {
    return -1;
  }
  // larger value
  if (SUITS.indexOf(a_obj.suit) > SUITS.indexOf(b_obj.suit)) {
    return 1;
  }
  // same value
  else {
    return VALUES.indexOf(a_obj.value) < VALUES.indexOf(b_obj.value) ? -1 : 1;
  }
};

const sortCards = (card_array, sort_type) => {
  const array_to_sort = card_array;
  let sort_function;
  if (sort_type === "value") {
    sort_function = sortByValue;
  } else if (sort_type === "suit") {
    sort_function = sortBySuit;
  }
  return array_to_sort.sort(sort_function);
};

const checkIsDuplicateValue = (played_card_array) => {
  // checking if both cards played are same value
  const value = getCardValue(played_card_array[0]); // compare to all to first value
  return played_card_array.every((card) => getCardValue(card) === value);
};

// single card combos
const checkSingleCardCombo = (played_card_array, last_played_card_array) => {
  if (last_played_card_array.length === 0) {
    // free turn
    return played_card_array;
  }

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
};

// double card combos
const checkDoubleAndTripleCardCombo = (
  played_card_array,
  last_played_card_array
) => {
  console.log("played", played_card_array, "last", last_played_card_array);
  // free move
  if (last_played_card_array.length === 0) {
    return checkIsDuplicateValue(played_card_array);
  }

  if (
    checkIsDuplicateValue(played_card_array) &&
    checkIsDuplicateValue(last_played_card_array)
  ) {
    if (
      VALUES.indexOf(getCardValue(played_card_array[0])) >
      VALUES.indexOf(getCardValue(last_played_card_array[0]))
    ) {
      return true;
    } else if (
      VALUES.indexOf(getCardValue(played_card_array[0])) <
      VALUES.indexOf(getCardValue(last_played_card_array[0]))
    ) {
      return false;
    } else {
      const flat_cards = played_card_array.flat(last_played_card_array);
      const largest_card = sortCards(flat_cards, "value")[
        flat_cards.length - 1
      ];
      return played_card_array.includes(largest_card);
    }
  }
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
    return cards.sort(sortByValue)[0];
  }

  checkPlayedIsInDeck(played_card_array) {
    // played cards are still in the deck and not discarded
    return played_card_array.every((played_card) =>
      this.cards.includes(played_card)
    );
  }

  checkPlayedIsLarger(played_card_array, last_played_card_array) {
    if (last_played_card_array.length === 0) {
      return true;
    }

    if (last_played_card_array.length === played_card_array.length) {
      // not first move
      const combo_length = last_played_card_array.length;
      switch (combo_length) {
        case 1:
          console.log("1 card");
          return checkSingleCardCombo(
            played_card_array,
            last_played_card_array
          );
        case 2:
          console.log("2 card");
          return checkDoubleAndTripleCardCombo(
            played_card_array,
            last_played_card_array
          );
        case 3:
          console.log("3 card");
          return checkDoubleAndTripleCardCombo(
            played_card_array,
            last_played_card_array
          );
          break;
        case 4:
          console.log("4 card");
          break;
        case 5:
          console.log("5 card");
          break;
        default:
          return false;
      }
    }
    return false;
  }

  checkIsValidMove(played_card_array, last_played_card_array) {
    if (last_played_card_array.length > 0) {
      console.log(`are cards in deck:
        ${this.checkPlayedIsInDeck(played_card_array)},
        are played cards larger than last played:
        ${this.checkPlayedIsLarger(
          played_card_array,
          last_played_card_array
        )}`);
      return (
        this.checkPlayedIsInDeck(played_card_array) &&
        this.checkPlayedIsLarger(played_card_array, last_played_card_array)
      );
    }
    console.log("free move and valid");
    return this.checkPlayedIsInDeck(played_card_array);
  }
}

module.exports = {
  Deck,
};

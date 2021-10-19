// === card value order ===

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

const getCardSuit = (card) => card.slice(-1);
const getCardValue = (card) => {
  const suit_index = card.indexOf(getCardSuit(card));
  return card.slice(0, suit_index);
};

// === card sorting functions ===
const sortByValue = (a, b) => {
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

// === card display functions ===
const parseCard = (card) => {
  const suit_value = getCardSuit(card);
  let value = getCardValue(card);
  let suit;
  let colour;

  // suits
  if (suit_value === "s") {
    suit = "♠";
    colour = "black";
  } else if (suit_value === "c") {
    suit = "♣";
    colour = "black";
  } else if (suit_value === "h") {
    suit = "♥";
    colour = "red";
  } else if (suit_value === "d") {
    suit = "♦";
    colour = "red";
  }

  value = value.toUpperCase(); // values

  return { value: value, suit: suit, colour: colour };
};

const checkIsDuplicateValue = (played_card_array) => {
  // checking if all cards played are same value
  const value = getCardValue(played_card_array[0]); // compare to all to first value
  return played_card_array.every((card) => getCardValue(card) === value);
};

const checkIfDuplicateValueInCombo = (played_card_array, num_of_duplicates) => {
  const counts = {};
  played_card_array.forEach((card) => {
    counts[card] = (counts[card] || 0) + 1;
  });
  return counts > num_of_duplicates;
};

// === single card combos ====
const checkSingleCardCombo = (played_card_array, last_played_card_array) => {
  if (last_played_card_array.length === 0) {
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

// === double/triple card combos ===
const checkDoubleAndTripleCardCombo = (
  played_card_array,
  last_played_card_array
) => {
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
      const flat_cards = played_card_array.concat(last_played_card_array);
      const largest_card = sortCards(flat_cards, "value")[
        flat_cards.length - 1
      ];
      return played_card_array.includes(largest_card);
    }
  }
};

// === 5 card combos ===
const checkIsStraight = (played_card_array) => {
  if (played_card_array.some((card) => getCardValue(card) === 2)) {
    return false; // cant have 2 in a straight
  }
  console.log("checking straight");
  console.log(
    played_card_array.every(
      (num, i) =>
        i === played_card_array.length - 1 || num < played_card_array[i + 1]
    )
  );
  return played_card_array.every(
    (num, i) =>
      i === played_card_array.length - 1 || num < played_card_array[i + 1]
  );
};

const checkIsFlush = (played_card_array) => {
  console.log("is flush");
  const suit = getCardSuit(played_card_array[0]);
  return played_card_array.every((card) => getCardSuit(card) === suit);
};

const checkIsFullHouse = (played_card_array) => {
  console.log("is full house");
  return false;
};

const checkIsFourOfAKind = (played_card_array) => {
  console.log("is 4 of a kind");
  return checkIfDuplicateValueInCombo(played_card_array, 4);
};

const checkIsValidFiveCardCombo = (played_card_array) => {
  return (
    checkIsStraight(played_card_array) ||
    checkIsFlush(played_card_array) ||
    checkIsFullHouse(played_card_array) ||
    checkIsFourOfAKind(played_card_array)
  );
};

const checkFiveCardCombo = (played_card_array, last_played_card_array) => {
  console.log("played", played_card_array, "last", last_played_card_array);
  // free move
  if (last_played_card_array.length === 0) {
    return checkIsValidFiveCardCombo(played_card_array);
  }
  return checkIsValidFiveCardCombo(played_card_array);
};

module.exports = {
  SUITS,
  VALUES,
  sortBySuit,
  sortByValue,
  sortCards,
  checkSingleCardCombo,
  checkDoubleAndTripleCardCombo,
  checkFiveCardCombo,
};

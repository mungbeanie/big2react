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
  // 3rd card (out of 5) will contain the quad value
  const counts = {};
  played_card_array.forEach((x) => {
    counts[getCardValue(x)] = (counts[getCardValue(x)] || 0) + 1;
  });
  // returns counts = {[card_value]: count etc}
  // if any of the card_value count pairs equals number of duplicates
  return Object.values(counts).some((value) => value === num_of_duplicates);
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
const returnLastCardByAttribute = (played_card_array, attribute) => {
  if (attribute === "suit") {
    return SUITS.indexOf(
      getCardValue(played_card_array[played_card_array.length - 1])
    );
  }
  // default is value
  return VALUES.indexOf(
    getCardValue(played_card_array[played_card_array.length - 1])
  );
};

const checkIsStraight = (played_card_array) => {
  if (played_card_array.some((card) => getCardValue(card) === 2)) {
    return false; // cant have 2 in a straight
  }
  const values_array = played_card_array.map((card) => getCardValue(card));
  const index_values_array = values_array.map((value) => VALUES.indexOf(value));
  return index_values_array.every(
    (num, i) => (index_values_array[i + 1] || num + 1) - num === 1
  );
};

const checkIsFlush = (played_card_array) => {
  const suit = getCardSuit(played_card_array[0]);
  return played_card_array.every((card) => getCardSuit(card) === suit);
};

const checkIsFullHouse = (played_card_array) => {
  // check for pair and triple
  const values_array = played_card_array.map((card) => getCardValue(card));
  const triple_then_pair =
    // XXXYY
    values_array.filter((value) => value === values_array[0]).length === 3 &&
    values_array.filter(
      (value) => value === values_array[values_array.length - 1]
    ).length === 2;
  const pair_then_triple =
    //  YYXXXX
    values_array.filter((value) => value === values_array[0]).length === 2 &&
    values_array.filter(
      (value) => value === values_array[values_array.length - 1]
    ).length === 3;
  return triple_then_pair || pair_then_triple;
};

const returnFullHouseCombo = (played_card_array) => {
  // returns pair and triple
  // could be XXYYY or YYXXX
  // first 2 always the same because of sort
  const first_combo = played_card_array.filter(
    (card) => getCardValue(card) === getCardValue(played_card_array[0])
  );

  let double;
  let triple;
  if (first_combo.length === 2) {
    double = first_combo[0]; // just need value
    triple = getCardValue(played_card_array[played_card_array.length - 1]); // last value should be triple
  } else {
    triple = first_combo[0];
    double = getCardValue(played_card_array[played_card_array.length - 1]); // last value should be double
  }

  return { double: double, triple: triple };
};

const checkIsFourOfAKind = (played_card_array) => {
  return checkIfDuplicateValueInCombo(played_card_array, 4);
};

const returnFourOfAKindCombo = (played_card_array) => {
  // return value of quad
  // could be XYYYY or YXXXX
  const first_combo = played_card_array.filter(
    (card) => getCardValue(card) === getCardValue(played_card_array[0])
  );
  let quad;
  let single;
  if (first_combo.length === 4) {
    quad = first_combo[0]; // just need value
    single = getCardValue(played_card_array[played_card_array.length - 1]); // last value should be single
  } else {
    single = first_combo[0];
    quad = getCardValue(played_card_array[played_card_array.length - 1]); // last value should be quad
  }

  return { quad: quad, single: single };
};

const checkIsValidFiveCardCombo = (played_card_array) => {
  return (
    checkIsStraight(played_card_array) ||
    checkIsFlush(played_card_array) ||
    checkIsFullHouse(played_card_array) ||
    checkIsFourOfAKind(played_card_array)
  );
};

const returnFiveCardComboType = (played_card_array) => {
  let type;
  if (checkIsStraight(played_card_array) && checkIsFlush(played_card_array)) {
    type = "straight flush";
  } else if (checkIsStraight(played_card_array)) {
    type = "straight";
  } else if (checkIsFlush(played_card_array)) {
    type = "flush";
  } else if (checkIsFullHouse(played_card_array)) {
    type = "full house";
  } else if (checkIsFourOfAKind(played_card_array)) {
    type = "four of a kind";
  }
  return type;
};

const returnIsFiveCardComboLarger = (
  played_card_array,
  last_played_card_array
) => {
  const combo_order = [
    "straight",
    "flush",
    "full house",
    "four of a kind",
    "straight flush",
  ];
  const played_combo_type = returnFiveCardComboType(played_card_array);
  const last_played_combo_type = returnFiveCardComboType(
    last_played_card_array
  );
  console.log(`played ${played_combo_type} vs last ${last_played_combo_type}`);
  if (
    combo_order.indexOf(played_combo_type) ===
    combo_order.indexOf(last_played_combo_type)
  ) {
    switch (played_combo_type) {
      case "straight":
        // value, then suit
        if (
          returnLastCardByAttribute(played_card_array, "value") ===
          returnLastCardByAttribute(last_played_card_array, "value")
        ) {
          return (
            returnLastCardByAttribute(played_card_array, "suit") >
            returnLastCardByAttribute(last_played_card_array, "suit")
          );
        }
        return (
          returnLastCardByAttribute(played_card_array, "value") >
          returnLastCardByAttribute(last_played_card_array, "value")
        );
      case "flush":
        // suit, then value
        if (
          returnLastCardByAttribute(played_card_array, "suit") ===
          returnLastCardByAttribute(last_played_card_array, "suit")
        ) {
          return (
            returnLastCardByAttribute(played_card_array, "value") >
            returnLastCardByAttribute(last_played_card_array, "value")
          );
        }
        return (
          returnLastCardByAttribute(played_card_array, "suit") >
          returnLastCardByAttribute(last_played_card_array, "suit")
        );
      case "full house":
        return (
          returnFullHouseCombo(played_card_array).triple >
          returnFullHouseCombo(last_played_card_array).triple
        );
      case "four of a kind":
        return (
          returnFourOfAKindCombo(played_card_array).quad >
          returnFourOfAKindCombo(last_played_card_array).quad
        );
      case "straight flush":
        // value, then suit
        if (
          returnLastCardByAttribute(played_card_array, "value") ===
          returnLastCardByAttribute(last_played_card_array, "value")
        ) {
          return (
            returnLastCardByAttribute(played_card_array, "suit") >
            returnLastCardByAttribute(last_played_card_array, "suit")
          );
        }
        return (
          returnLastCardByAttribute(played_card_array, "value") >
          returnLastCardByAttribute(last_played_card_array, "value")
        );
      default:
        return false;
    }
  }

  return (
    combo_order.indexOf(played_combo_type) >
    combo_order.indexOf(last_played_combo_type)
  );
};

const checkFiveCardCombo = (played_card_array, last_played_card_array) => {
  console.log("played", played_card_array, "last", last_played_card_array);
  // free move
  if (last_played_card_array.length === 0) {
    return checkIsValidFiveCardCombo(played_card_array);
  }
  return (
    checkIsValidFiveCardCombo(played_card_array) &&
    returnIsFiveCardComboLarger(played_card_array, last_played_card_array)
  );
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

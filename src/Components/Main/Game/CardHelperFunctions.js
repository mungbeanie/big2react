// === card value order ===
const value_order = [
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
const suit_order = ["d", "c", "h", "s"];

export const getCardSuit = (card) => card.slice(-1);
export const getCardValue = (card) => {
  const suit_index = card.indexOf(getCardSuit(card));
  return card.slice(0, suit_index);
};

// === card sorting functions ===
export const sortValue = (a, b) => {
  const a_obj = { value: getCardValue(a), suit: getCardSuit(a) };
  const b_obj = { value: getCardValue(b), suit: getCardSuit(b) };
  // sorting by using element order in array as lowest to highest values
  // smaller value
  if (value_order.indexOf(a_obj.value) < value_order.indexOf(b_obj.value)) {
    return -1;
  }
  // larger value
  if (value_order.indexOf(a_obj.value) > value_order.indexOf(b_obj.value)) {
    return 1;
  }
  // same value
  else {
    return suit_order.indexOf(a_obj.suit) < suit_order.indexOf(b_obj.suit)
      ? -1
      : 1;
  }
};

export const sortSuit = (a, b) => {
  const a_obj = { value: getCardValue(a), suit: getCardSuit(a) };
  const b_obj = { value: getCardValue(b), suit: getCardSuit(b) };
  // sorting by using element order in array as lowest to highest values
  // smaller value
  if (suit_order.indexOf(a_obj.suit) < suit_order.indexOf(b_obj.suit)) {
    return -1;
  }
  // larger value
  if (suit_order.indexOf(a_obj.suit) > suit_order.indexOf(b_obj.suit)) {
    return 1;
  }
  // same value
  else {
    return value_order.indexOf(a_obj.value) < value_order.indexOf(b_obj.value)
      ? -1
      : 1;
  }
};

export const sortCards = (card_array, sort_type) => {
  const array_to_sort = card_array;
  let sort_function;
  if (sort_type === "value") {
    sort_function = sortValue;
  } else if (sort_type === "suit") {
    sort_function = sortSuit;
  }
  return array_to_sort.sort(sort_function);
};

// === card display functions ===
export const parseCard = (card) => {
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

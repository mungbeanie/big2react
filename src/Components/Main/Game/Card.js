import styled from "styled-components";

const CardStyle = styled.span`
  height: 50px;
  width: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border: 1px blue solid;
  padding: 0 0.5rem;
  margin: 0 0.5rem;
  background-color: white;
  color: ${(props) => props.suit_colour};
  transition: all 0.1s ease-out;

  :hover {
    background-color: black;
    color: white;
    transform: translateY(-5px);
    cursor: pointer;
  }
`;

const parseCard = (card) => {
  const suit_value = card.slice(-1);
  const suit_index = card.indexOf(suit_value);
  let value = card.slice(0, suit_index);
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
  } else {
    suit = "♦";
    colour = "red";
  }

  // values
  if (value === "1") {
    value = "A";
  } else if (value === "11") {
    value = "J";
  } else if (value === "12") {
    value = "Q";
  } else if (value === "13") {
    value = "K";
  }

  return { value: value, suit: suit, colour: colour };
};

const Card = ({ card }) => {
  return (
    <CardStyle suit_colour={parseCard(card).colour}>{`${parseCard(card).value}${
      parseCard(card).suit
    }`}</CardStyle>
  );
};

export default Card;

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
  const suit_index = card.indexOf(card.slice(-1));
  const value = card.slice(0, suit_index);
  let suit;
  let colour;

  if (card.includes("s")) {
    suit = "♠";
    colour = "black";
  } else if (card.includes("c")) {
    suit = "♣";
    colour = "black";
  } else if (card.includes("h")) {
    suit = "♥";
    colour = "red";
  } else {
    suit = "♦";
    colour = "red";
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

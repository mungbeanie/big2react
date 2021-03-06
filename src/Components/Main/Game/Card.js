import styled from "styled-components";
import { parseCard } from "./CardHelperFunctions";

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

  // selected
  ${(props) =>
    props.isSelected &&
    `
  background-color: blue;
  transform: translateY(-5px);
  `}

  ${(props) =>
    !props.isReadOnly &&
    `
  :hover {
    background-color: black;
    color: white;
    transform: translateY(-5px);
    cursor: pointer;
    };
    `}
`;

const Card = ({
  card,
  isSelected,
  selectedCards,
  setSelectedCards,
  isReadOnly,
}) => {
  const onClickHandler = () => {
    if (isReadOnly) return;
    selectedCards.includes(card)
      ? setSelectedCards((state) =>
          state.filter((card_value) => card_value !== card)
        )
      : setSelectedCards((state) => [...state, card]);
  };
  return (
    <CardStyle
      suit_colour={parseCard(card).colour}
      isSelected={isSelected}
      isReadOnly={isReadOnly}
      onClick={onClickHandler}
    >
      {`${parseCard(card).value}${parseCard(card).suit}`}
    </CardStyle>
  );
};

export default Card;

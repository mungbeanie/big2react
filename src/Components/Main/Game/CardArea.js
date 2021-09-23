import styled from "styled-components";
import { useGameStore } from "../../../Stores/stores";

const CardAreaHeader = styled.div`
  font-weight: bold;
  font-size: 2rem;
`;

const CardAreaSurface = styled.div`
  width: 100vw;
  min-height: 50vh;
  padding: 1rem;
  background: green;
  border: 1px black solid;
`;

const CardArea = () => {
  const gameStore = useGameStore();

  return (
    <>
      <CardAreaHeader>card area</CardAreaHeader>
      <CardAreaSurface />
    </>
  );
};

export default CardArea;

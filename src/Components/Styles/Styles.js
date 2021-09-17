import styled from "styled-components";

const colour_palette = {
  primary: "red",
  secondary: "green",
};

export const Button = styled.button`
  color: ${colour_palette.primary};
  font-size: 1em;
  padding: 0.25em 1em;
  border: black 1px solid;
  transition: all 0.1s;
  cursor: pointer;

  &:hover {
    background-color: green;
  }
`;

export const Link = styled.link`
  color: ${colour_palette.primary};
  text-decoration: none;

  &:hover {
    transform: scale(1.25);
  }
`;

import styled from "styled-components";
import { Button } from "../Styles/Styles";

const HeaderButton = ({ children }) => {
  const HeaderButton = styled(Button)`
    padding: 0.5em;
  `;
  return <HeaderButton>{children}</HeaderButton>;
};

export default HeaderButton;

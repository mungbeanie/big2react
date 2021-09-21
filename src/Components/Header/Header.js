import styled from "styled-components";
import { Button } from "../Styles/Styles";

const HeaderContainer = styled.header`
  background-color: red;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HeaderButton = styled(Button)`
  padding: 0.5em;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <div>
        <HeaderButton as="a" href="#">
          Big 2
        </HeaderButton>
      </div>
      <div>
        <HeaderButton>Settings</HeaderButton>
        <HeaderButton>User Stuff</HeaderButton>
      </div>
    </HeaderContainer>
  );
};

export default Header;

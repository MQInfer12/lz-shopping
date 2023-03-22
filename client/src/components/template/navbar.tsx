import React from 'react'
import styled from 'styled-components';
import { StyledLink } from '../../style/buttons';
import { IconInputText } from '../../style/input';
import { colors } from '../../style/variables';
import Logo from './logo';

const Navbar = () => {
  return (
    <Nav>
      <Logo />
      <div className="right-nav">
        <IconInputText>
          <input type="text" />
          <label className="fa-solid fa-magnifying-glass"></label>
        </IconInputText>
        <StyledLink to="/user">Inicia sesión</StyledLink>
      </div>
    </Nav>
  )
}

export default Navbar

const Nav = styled.nav`
  width: 100%;
  background-color: ${colors.white};
  position: fixed;
  top: 0;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: ${colors.shadow};

  .right-nav {
    display: flex;
    gap: .5rem;
  }
`;
import React from 'react'
import styled from 'styled-components';
import { useCloth } from '../../context/cloth';
import { useWidth } from '../../hooks/useWidth';
import { IconButton, IconLink, StyledLink } from '../../style/buttons';
import { IconInputText } from '../../style/input';
import { colors } from '../../style/variables';
import Logo from './logo';

const Navbar = () => {
  const { changeOpen } = useCloth();
  const width = useWidth();

  return (
    <Nav>
      <Logo />
      <div className="right-nav">
        {
          !(width < 1110) &&
          <IconInputText>
            <input type="text" />
            <label className="fa-solid fa-magnifying-glass"></label>
          </IconInputText>
        }
        {
          width < 1110 && 
          <IconButton>
            <i className="fa-solid fa-magnifying-glass"></i>
          </IconButton>}
        {
          width < 1110 && 
          <IconButton onClick={changeOpen}>
            <i className="fa-solid fa-hand-pointer"></i>
          </IconButton>}
        {
          width < 1110 ?
          <IconLink to="/user"><i className="fa-solid fa-right-to-bracket"></i></IconLink> :
          <StyledLink to="/user">Inicia sesión</StyledLink>
        }
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
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useCloth } from '../../context/cloth';
import { useWidth } from '../../hooks/useWidth';
import { IconButton, IconLink, StyledLink } from '../../style/buttons';
import { colors } from '../../style/variables';
import Logo from './logo';

const Navbar = () => {
  const { changeOpen, focused, handleFocus, handleBlur, search, changeSearch, handleCloseSearch } = useCloth();
  const width = useWidth();
  const location = useLocation();

  return (
    <Nav>
      {((width > 620) || (width < 620 && !(focused || search))) && <Logo />}
      <div className="right-nav">
        {
          location.pathname === "/" &&
          <IconInputText>
            <input 
              onFocus={handleFocus}
              onBlur={handleBlur}
              type="text"
              value={search}
              onChange={e => changeSearch(e)}
              required
            />
            <label 
              className={(focused || search) ? "fa-solid fa-xmark" : "fa-solid fa-magnifying-glass"}
              style={{
                cursor: (focused || search) ? "pointer" : "auto",
                pointerEvents: (focused || search) ? "all" : "none"
              }}
              onClick={handleCloseSearch}
            ></label>
          </IconInputText>
        }
        {
          (((width < 1110 && width > 620) || (width < 620 && !(focused || search))) && location.pathname === "/") && 
          <IconButton onClick={changeOpen}>
            <i className="fa-solid fa-hand-pointer"></i>
          </IconButton>
        }
        {
          ((width < 1110 && width > 620) || (width < 620 && !(focused || search))) &&
          <IconLink to="/user"><i className="fa-solid fa-right-to-bracket"></i></IconLink>
        }
        {
          !(width < 1110) &&
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

const IconInputText = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  &>input{
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    width: 0;
    border-radius:1.5rem;
    border:1px solid ${colors.gray500};
    outline: none;
    color: ${colors.gray900};
    background-color: ${colors.primary600};
    border: 1px solid ${colors.primary600};
    transition: all 0.3s;
    font-size: 1rem;

    &:focus, &:valid {
      width: 300px;
      background-color: ${colors.white};
      border: 1px solid ${colors.gray400};

      @media screen and (max-width: 620px) {
        width: 350px;
      }
    }

    &:focus + label, &:valid + label {
      color: ${colors.gray900};
      left: 1rem;
      transform: translateY(-50%);
    }
  }

  &>label{
    position: absolute;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
    left: 50%;
    color: ${colors.white};
    transition: all 0.3s;
    pointer-events: none;

    &:hover {
      opacity: 0.7;
    }
  }
`;
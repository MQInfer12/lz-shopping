import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useCloth } from '../../context/cloth';
import { useWidth } from '../../hooks/useWidth';
import { IconButton, IconLink, StyledLink } from '../../style/buttons';
import { colors } from '../../style/variables';
import Logo from './logo';
import { useUser } from '../../context/user';

const Navbar = () => {
  const { 
    changeOpen, 
    focused, 
    handleFocus, 
    search, 
    sizeSearch, 
    changeSizeSearch, 
    changeSearch, 
    handleCloseSearch 
  } = useCloth();
  const { user } = useUser();
  const width = useWidth();
  const location = useLocation();

  return (
    <Nav>
      {((width > 620) || (width < 620 && !focused)) && <Logo />}
      <div className="right-nav">
        {
          (location.pathname === "/" || location.pathname.includes("/view/")) &&
          <IconInputText>
            <input 
              onFocus={handleFocus}
              type="text"
              className={focused ? "active" : ""}
              value={search}
              onChange={e => changeSearch(e)}
            />
            <label 
              className={focused ? "fa-solid fa-xmark" : "fa-solid fa-magnifying-glass"}
              style={{
                cursor: focused ? "pointer" : "auto",
                pointerEvents: focused ? "all" : "none"
              }}
              onClick={handleCloseSearch}
            ></label>
          </IconInputText>
        }
        {
          (focused && (location.pathname === "/" || location.pathname.includes("/view/"))) &&
          <Select value={sizeSearch} onChange={e => changeSizeSearch(e)}>
            <option value="">Talla</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="XXXL">XXXL</option>
          </Select>
        }
        {
          (((width < 1110 && width > 620) || (width < 620 && !focused)) && location.pathname === "/") && 
          <IconButton onClick={changeOpen}>
            <i className="fa-solid fa-hand-pointer"></i>
          </IconButton>
        }
        {
          ((width < 1110 && width > 620) || (width < 620 && !focused)) &&
          <IconLink to="/user">
            <i 
              className={user ? "fa-solid fa-cart-shopping" : "fa-solid fa-right-to-bracket"}
            ></i>
          </IconLink>
        }
        {
          !(width < 1110) &&
          <StyledLink to="/user">{ user ? "Mis reservas" : "Inicia sesión"}</StyledLink>
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
  justify-content: center;
  align-items: center;

  & > input {
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
    cursor: pointer;

    &:hover {
      background-color: ${colors.primary800};
      border: 1px solid ${colors.primary800};
    }

    &:focus, &[class='active'] {
      width: 300px;
      background-color: ${colors.white};
      border: 1px solid ${colors.gray400};
      cursor: text;
    }

    &:focus + label, &[class='active'] + label {
      color: ${colors.gray900};
      left: 1rem;
    }
  }

  &>label{
    position: absolute;
    color: ${colors.white};
    transition: all 0.3s;
    pointer-events: none;

    &:hover {
      scale: 1.2;
      opacity: 0.7;
    }
  }
`;

const Select = styled.select`
  border-radius:1.5rem;
  font-size: 0.8rem;
  text-align: center;
  animation: appearSelect 0.5s;
  border: 1px solid ${colors.gray400};
  font-weight: 500;

  @keyframes appearSelect {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
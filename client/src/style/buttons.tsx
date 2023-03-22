import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "./variables";

export const Button = styled.button`
  padding: 0.5rem 3rem;
  border-radius: 1.5rem;
  border:none;
  cursor:pointer;
  font-weight: 500;
  color: ${colors.white};
  background-color: ${colors.primary600};
  transition: all 0.3s;
  font-size: 1rem;

  &:hover {
    background-color: ${colors.primary800};
  }
`;

export const StyledLink = styled(Link)`
  padding: 0.5rem 3rem;
  border-radius: 1.5rem;
  border:none;
  cursor:pointer;
  font-weight: 500;
  color: ${colors.white};
  background-color: ${colors.primary600};
  transition: all 0.3s;
  font-size: 1rem;
  text-decoration: none;

  &:hover {
    background-color: ${colors.primary800};
  }
`;
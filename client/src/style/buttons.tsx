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
  width: max-content;
  height: max-content;
  display: flex;
  gap: 1rem;
  align-items: center;

  &:hover {
    background-color: ${colors.primary800};
  }

  &:disabled {
    pointer-events: none;
    background-color: ${colors.gray500};
  }
`;

export const IconButton = styled.button`
  padding: 0.5rem 0.8rem;
  border-radius: 1.5rem;
  border:none;
  cursor:pointer;
  font-weight: 500;
  color: ${colors.white};
  background-color: ${colors.primary600};
  transition: all 0.3s;
  font-size: 1rem;
  width: max-content;
  display: flex;
  gap: 1rem;
  align-items: center;

  &:hover {
    background-color: ${colors.primary800};
  }
`;

export const MiniIconButton = styled.button`
  min-width: 2rem;
  min-height: 2rem;
  border-radius: 1rem;
  border:none;
  cursor:pointer;
  color: ${colors.white};
  background-color: ${colors.primary600};
  transition: all 0.3s;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${colors.primary800};
  }

  &:disabled {
    pointer-events: none;
    background-color: ${colors.gray500};
  }
`;

export const LoadingIcon = () => {
  return <LoadingI className="fa-solid fa-spinner"></LoadingI>
}

const LoadingI = styled.i`
  animation: circle 1s infinite;

  @keyframes circle {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
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
  border: 1px solid ${colors.primary600};

  &:hover {
    background-color: ${colors.primary800};
    border: 1px solid ${colors.primary800};
  }
`;

export const IconLink = styled(Link)`
  padding: 0.5rem 0.8rem;
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

export const StyledA = styled.a`
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
  display: flex;
  gap: 1rem;
  align-items: center;
  width: max-content;

  &:hover {
    background-color: ${colors.primary800};
  }
`;
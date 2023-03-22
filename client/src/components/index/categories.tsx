import React from 'react'
import styled from 'styled-components'
import { colors } from '../../style/variables'

const Categories = () => {
  return (
    <CategoriesContainer>
      <div>
        <button>Destacados</button>
        <button>Nuevos</button>
        <button>Camisas</button>
        <button>Poleras</button>
        <button>Deportivos</button>
        <button>Busos</button>
        <button>Jeans</button>
        <button>Faldas</button>
        <button>Vestidos</button>
        <button>Promoción</button>
        <button>Varios</button>
      </div>
    </CategoriesContainer>
  )
}

export default Categories

const CategoriesContainer = styled.div`
  overflow: auto;
  padding-bottom: 0.2rem;
  display: flex;

  & > div {
    display: flex;
    gap: 1rem;
    margin: auto;

    & > button {
      font-size: 1rem;
      padding: .75rem 1rem;
      color: ${colors.white};
      background-color: ${colors.primary500};
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background-color: ${colors.primary600};
      }
    }
  }

  &::-webkit-scrollbar {
    width: .375rem;
    height: .375rem;
  }
  &::-webkit-scrollbar-track {
    background: ${colors.gray200};
    border-radius: .1875rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.primary500};
    border-radius: .1875rem;
  }
`;
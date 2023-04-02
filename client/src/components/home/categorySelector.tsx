import React from 'react'
import styled from 'styled-components'
import { useData } from '../../context/data'
import { colors } from '../../style/variables'

const CategorySelector = () => {
  const { categories } = useData();

  return (
    <AllContainer>
      <CategorySelectorContainer>
        <FlexContainer>
          {categories.map((category, i) => (
            <CategoryContainer className="">
              <input id={String(category.id)} type="checkbox" />
              <label>{ category.name }</label>
            </CategoryContainer>
          ))}
        </FlexContainer>
      </CategorySelectorContainer>
    </AllContainer>
  )
}

export default CategorySelector

const AllContainer = styled.div`
  border-radius: 1.5rem;
  border: 1px solid ${colors.gray500};
  overflow: hidden;
`;

const CategorySelectorContainer = styled.div`
  height: 108px;
  background-color: ${colors.white};
  padding: 0.5rem 1rem;
  overflow: auto;

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

const FlexContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const CategoryContainer = styled.div`
  display: flex;
  border: 1px solid ${colors.gray500};
  width: max-content;
  height: max-content;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.2rem 0.5rem;
  gap: 0.5rem;
  cursor: pointer;

  & > input {
    accent-color: ${colors.primary600};
  }

  & > * {
    pointer-events: none;
  }
`;
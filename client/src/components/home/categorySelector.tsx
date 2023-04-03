import React from 'react'
import styled from 'styled-components'
import { useData } from '../../context/data'
import { colors } from '../../style/variables'
import { ProductForm } from './productCrud'

interface Props {
  form: ProductForm
  setForm: React.Dispatch<React.SetStateAction<ProductForm>>
}

const CategorySelector = ({ form, setForm }: Props) => {
  const { categories } = useData();

  const handleClick = (id: number) => {
    if(!form.categories.includes(id)) {
      setForm(old => ({...old, categories: [...old.categories, id]}))
    } else {
      setForm(old => ({...old, categories: old.categories.filter(v => v != id)}))
    }
  }

  return (
    <AllContainer>
      <CategorySelectorContainer>
        <FlexContainer>
          {categories.map((category, i) => (
            <CategoryContainer onClick={() => handleClick(category.id)} key={category.id} className="">
              <input 
                id={String(category.id)} 
                checked={form.categories.includes(category.id)} 
                type="checkbox" 
                readOnly
              />
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
  border-radius: 1.5rem;

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
  transition: all 0.3s;

  &:hover {
    opacity: 0.7;
  }

  & > input {
    accent-color: ${colors.primary600};
  }

  & > * {
    pointer-events: none;
  }
`;
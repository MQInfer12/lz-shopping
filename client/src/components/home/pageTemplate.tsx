import React from 'react'
import styled from 'styled-components';
import { colors } from '../../style/variables';
import { ProductForm } from './productCrud';

interface Props {
  children: JSX.Element | JSX.Element[]
  title: string
  form?: ProductForm
  setForm?: React.Dispatch<React.SetStateAction<ProductForm>> 
  initialForm?: ProductForm
}

const PageTemplate = ({ children, title, form, setForm, initialForm }: Props) => {
  const handleReset = () => {
    if(setForm && initialForm) setForm(initialForm);
  }

  return (
    <CategoryCrudContainer>
      <div className='title-container'>
        <h2>{ title }</h2>
        {form?.id && <button onClick={handleReset}><i className="fa-solid fa-xmark"></i></button>}
      </div>
      {children}
    </CategoryCrudContainer>
  )
}

export default PageTemplate

const CategoryCrudContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 100%;
  flex: 1;

  & > .title-container {
    position: relative;
    display: flex;
    align-items: center;

    & > button {
      position: absolute;
      left: 120%;
      border: none;
      font-size: 1rem;
      top: 25%;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        scale: 1.2;
      }
    }
  }

  & h2 {
    color: ${colors.gray900};
  }

  & > .inputsContainer {
    width: 340px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  animation: appear 0.3s;

  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
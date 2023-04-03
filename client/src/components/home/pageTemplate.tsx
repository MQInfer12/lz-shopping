import React from 'react'
import styled from 'styled-components';
import { colors } from '../../style/variables';

interface Props {
  children: JSX.Element | JSX.Element[]
  title: string
}

const PageTemplate = ({ children, title }: Props) => {
  return (
    <CategoryCrudContainer>
      <h2>{ title }</h2>
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

  & > h2 {
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
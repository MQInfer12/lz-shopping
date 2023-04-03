import React from 'react'
import styled from 'styled-components'
import { HomePage } from '../../interfaces/homePage'
import { colors } from '../../style/variables'

interface Props {
  page: HomePage
  setPage: React.Dispatch<React.SetStateAction<HomePage>>
}

const PageButtons = ({ page, setPage }: Props) => {
  return (
    <ButtonsContainer>
      <PageButton 
        active={page === "product"}
        onClick={() => setPage("product")}
      >Productos</PageButton>
      <PageButton 
        active={page === "category"}
        onClick={() => setPage("category")}
      >Categorías</PageButton>
    </ButtonsContainer>
  )
}

export default PageButtons

const ButtonsContainer = styled.div`
  display: flex;
`;

interface PageButtonProps {
  active: boolean
}

const PageButton = styled.button<PageButtonProps>`
  padding: .5rem 1.5rem;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid ${props => props.active ? colors.primary600 : colors.gray300};
  color: ${props => props.active ? colors.primary600 : colors.gray300};
  font-weight: 600;
  transition: all 0.3s;
  cursor: pointer;
`;
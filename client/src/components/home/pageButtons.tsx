import React from 'react'
import styled from 'styled-components'
import { HomePage } from '../../interfaces/homePage'
import { Product } from '../../interfaces/product'
import { colors } from '../../style/variables'

interface Props {
  page: HomePage
  setPage: React.Dispatch<React.SetStateAction<HomePage>>
  selectedSale: Product | null
}

const PageButtons = ({ page, setPage, selectedSale }: Props) => {
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
      {/* <PageButton 
        disabled={!(page==="sales") && !selectedSale}
        active={page === "sales"}
        onClick={() => setPage("sales")}
      >Ventas</PageButton> */}
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
  border-bottom: 1px solid ${props => props.active ? colors.primary600 : colors.gray400};
  color: ${props => props.active ? colors.primary600 : colors.gray400};
  font-weight: 600;
  transition: all 0.3s;
  cursor: pointer;

  &:disabled{
    color:${colors.gray200};
    border-bottom: 1px solid ${colors.gray200};
    pointer-events:none;
  }
`;
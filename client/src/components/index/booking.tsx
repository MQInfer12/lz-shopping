import React from 'react'
import styled from 'styled-components'
import { Product } from '../../interfaces/product'
import { Button, StyledA } from '../../style/buttons'
import { colors } from '../../style/variables'
import ProductView from './productView'

interface Props {
  selected: Product
}

const Booking = ({ selected }: Props) => {
  return (
    <ColumnContainer>
      <ProductView product={selected} />
      <p>¡Pide tu reserva ahora!</p>
      <StyledA>
        Contáctame <i className="fa-brands fa-whatsapp"></i>
      </StyledA>
    </ColumnContainer>
  )
}

export default Booking

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;

  & > p {
    color: ${colors.gray400};
  }

  & > a {
    font-size: 1.2rem;
  }
`;
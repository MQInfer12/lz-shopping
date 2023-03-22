import React from 'react'
import styled from 'styled-components'
import { Product } from '../../interfaces/product'
import { colors } from '../../style/variables'

interface Props {
  product: Product
}

const ProductView = ({ product }: Props) => {
  return (
    <ProductViewContainer>
      <div className="img-container">
        <img src={product.foto} />
      </div>
      <h3>{product.nombre}</h3>
      <p>{product.precio} Bs.</p>
    </ProductViewContainer>
  )
}

export default ProductView

const ProductViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 0 2rem;

  & > .img-container {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 80%;
    min-width: 270px;
    height: 270px;
    background-color: ${colors.primary100};
    border-radius: 0.5rem;

    & > img {
      width: 90%;
      height: 100%;
      object-fit: cover;
      box-shadow: ${colors.shadow};
    }
  }

  & > h3 {
    max-width: 100%;
    text-align: center;
    font-size: 2rem;
    line-height: 2.2rem;
    color: ${colors.gray900};
  }

  & > p {
    font-size: 1.4rem;
    align-self: flex-end;
    padding: .5rem 1rem;
    background-color: ${colors.primary500};
    color: ${colors.white};
    border-radius: .5rem;
  }
`;
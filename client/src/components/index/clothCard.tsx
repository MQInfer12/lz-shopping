import React from 'react'
import styled from 'styled-components'
import { useCloth } from '../../context/cloth'
import { Product } from '../../interfaces/product'
import { colors } from '../../style/variables'

interface Props {
  product: Product
}

const ClothCard = ({ product }: Props) => {
  const { selectCloth } = useCloth(); 

  return (
    <ClothCardContainer onClick={() => selectCloth(product)}>
      <img src={product.photo} />
      <h3>{product.name}</h3>
      <p>Bs. {product.price}</p>
    </ClothCardContainer>
  )
}

export default ClothCard

const ClothCardContainer = styled.div`
  height: max-content;
  max-width: 22%;
  min-width: 8.5rem;
  padding: 1rem;
  background-color: ${colors.white};
  box-shadow: ${colors.shadow};
  border-radius: .5rem;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    opacity: 0.6;
  }

  & > img {
    height: 10rem;
    width: 100%;
    object-fit: cover;
    border-radius: .5rem;
  }

  & > h3 {
    color: ${colors.gray900};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > p {
    color: ${colors.gray400};
  }
`;
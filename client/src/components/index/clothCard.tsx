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
  let discountPercentage: number = 0;
  if(product.discount && product.price) {
    discountPercentage = Math.round((product.price - product.discount) / product.price * 100);
  }

  return (
    <ClothCardContainer onClick={() => selectCloth(product)}>
      <img src={product.photo} />
      <h3>{product.name}</h3>
      <div className="text">
        {product.discount && <p>Bs. {product.discount}</p>}
        <P striked={!!product.discount}>Bs. {product.price}</P>
      </div>
      {product.discount && <b>{discountPercentage}% OFF</b>}
    </ClothCardContainer>
  )
}

export default ClothCard

const ClothCardContainer = styled.div`
  height: max-content;
  flex: 1;
  padding: 1rem;
  max-width: calc(25% - 1.5rem);
  background-color: ${colors.white};
  box-shadow: ${colors.shadow};
  border-radius: .5rem;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;

  @media screen and (max-width: 830px) {
    max-width: calc(33% - 2rem);
    gap: .2rem;
  }
  @media screen and (max-width: 675px) {
    max-width: calc(50% - 1rem);
  }

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

  & > .text {
    display: flex;
    gap: 1rem;
    white-space: nowrap;

    @media screen and (max-width: 450px) {
      flex-direction: column-reverse;
      gap: .2rem;
    }

    & > p {
      color: ${colors.gray400};
    }
  }

  & > b {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: ${colors.primary400};
    color: ${colors.white};
    padding: 0.2rem;
    border-radius: 0 0.5rem 0 0.5rem;
  }
`;

interface PProps {
  striked: boolean
}

const P = styled.p<PProps>`
  text-decoration: ${props => props.striked && "line-through"};
`;
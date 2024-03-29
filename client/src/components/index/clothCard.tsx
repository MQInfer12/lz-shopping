import React from 'react'
import styled from 'styled-components'
import { useCloth } from '../../context/cloth'
import { Product } from '../../interfaces/product'
import { colors } from '../../style/variables'
import { Sale } from '../../interfaces/sale'

interface Props {
  product: Product
  sale?: Sale
}

const ClothCard = ({ product, sale }: Props) => {
  const { selectCloth } = useCloth(); 
  let discountPercentage: number = 0;
  if(product.discount && product.price) {
    discountPercentage = Math.round((product.price - product.discount) / product.price * 100);
  }

  return (
    <ClothCardContainer noHover={!!sale} onClick={() => selectCloth(product)}>
      <div className='imgContainer'>
        <img src={product.photo} />
        {!sale && product.discount && <b className='discount'>{discountPercentage}% OFF</b>}
        {product.size && <b className='size'>{product.size}</b>}
      </div>
      <h3>{product.name}</h3>
      {
        !sale &&
        <div className="text">
          {product.discount && <p>Bs. {product.discount}</p>}
          <P striked={!!product.discount}>Bs. {product.price}</P>
        </div>
      }
      {
        sale &&
        <>
        <div className="text">
          <p>{sale.amount} unidad{sale.amount > 1 && "es"}</p>
        </div>
        <div className="text">
          <p>{
            new Date(sale.datetime).getDate() + "-" + 
            (new Date(sale.datetime).getMonth() + 1) + "-" +
            new Date(sale.datetime).getFullYear()
          }</p>
        </div>
        </>
      }
    </ClothCardContainer>
  )
}

export default ClothCard

interface ClothCardContainerProps {
  noHover: boolean
}

const ClothCardContainer = styled.div<ClothCardContainerProps>`
  padding: 1rem;
  background-color: ${colors.white};
  box-shadow: ${colors.shadow};
  border-radius: .5rem;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  cursor: ${props => props.noHover ? "auto" : "pointer"};
  transition: opacity 0.3s;

  &:hover {
    opacity: ${props => props.noHover ? "0.8" : "0.6"};
  }

  & > .imgContainer {
    position: relative;
    height: 10rem;
    width: 100%;

    & > img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: .5rem;
    }

    & > .discount {
      position: absolute;
      top: 0;
      right: 0;
      background-color: ${colors.primary400};
      color: ${colors.white};
      padding: 0.25rem 0.5rem;
      border-radius: 0 0.5rem 0 0.5rem;
    }

    & > .size {
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: ${colors.white};
      color: ${colors.gray900};
      padding: 0.25rem 0.5rem;
      border-radius: 0 0.5rem 0 0.5rem;
    }
  }

  & > h3 {
    color: ${colors.gray900};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media screen and (max-width: 600px) {
      font-size: 1rem;
    }
  }

  & > .text {
    display: flex;
    gap: 1rem;
    white-space: nowrap;

    @media screen and (max-width: 450px) {
      gap: .5rem;
    }

    & > p {
      color: ${colors.gray400};

      @media screen and (max-width: 600px) {
        font-size: .8rem;
      }
    }
  }
`;

interface PProps {
  striked: boolean
}

const P = styled.p<PProps>`
  text-decoration: ${props => props.striked && "line-through"};
`;
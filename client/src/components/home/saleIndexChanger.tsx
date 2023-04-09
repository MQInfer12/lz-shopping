import React from 'react'
import styled from 'styled-components'
import { MiniIconButton } from '../../style/buttons'
import { colors } from '../../style/variables'
import { Sale } from '../../interfaces/sale'

interface Props {
  clients: Sale[] | undefined
  index: number
  setIndex: React.Dispatch<React.SetStateAction<number>>
  stock: number
}

const SaleIndexChanger = ({ clients, stock, index, setIndex }: Props) => {
  const clientsLength = clients?.length;
  const quantitySold = clients && clients?.reduce((ac, sale) => ac + sale.amount, 0);

  return (
    <ButtonsContainer>
      <MiniIconButton 
        disabled={index === 0}
        onClick={() => setIndex(old => old - 1)}
      ><i className="fa-solid fa-chevron-left"></i></MiniIconButton>  
      <CirclesContainer>
        {clients?.map((v, i) => (
          <CircleButton 
            key={i}
            active={index === i} 
            onClick={() => setIndex(i)}
          >{v.amount}</CircleButton>
        ))}
        {
          clientsLength != stock && 
          quantitySold != stock &&
          <CircleButton 
            active={index === clientsLength}
            onClick={() => setIndex(clientsLength || 0)}
          >
            <i className="fa-solid fa-plus"></i>
          </CircleButton>
        }
      </CirclesContainer>
      <MiniIconButton 
        disabled={
          index === clientsLength || 
          (clientsLength === stock && index === clientsLength - 1) ||
          (quantitySold === stock && (!!clientsLength && index === clientsLength - 1))
        }
        onClick={() => setIndex(old => old + 1)}
      ><i className="fa-solid fa-chevron-right"></i></MiniIconButton> 
    </ButtonsContainer>
  )
}

export default SaleIndexChanger

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  scale: .8;
`;

const CirclesContainer = styled.div`
  display: flex;
  gap: .2rem;
  max-width: 220px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: .2rem;
    height: .2rem;
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

interface CircleButtonProps {
  active: boolean
}

const CircleButton = styled.button<CircleButtonProps>`
  min-width: 1rem;
  height: 1rem;
  border: none;
  border-radius: 50%;
  font-size: .6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid ${colors.primary600};
  color: ${props => props.active ? colors.white :colors.primary600};
  transition: all 0.3s;
  background-color: ${props => props.active && colors.primary600};
`;
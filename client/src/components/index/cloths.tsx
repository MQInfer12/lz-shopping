import styled from 'styled-components'
import { useCloth } from '../../context/cloth'
import { colors } from '../../style/variables'
import Carousel from './carousel'
import Categories from './categories'
import ClothMapper from './clothMapper'

const Cloths = () => {
  const { search, focused } = useCloth();

  return (
    <ClothsSection>
      {
        !(focused || search) && 
        <>
        <Carousel />
        <Categories />
        </>
      }
      <ClothMapper />
    </ClothsSection>
  )
}

export default Cloths

const ClothsSection = styled.section`
  min-width: 70%;
  height: calc(100dvh - 3.5rem);
  overflow: auto;
  display: flex;
  flex-direction: column;
  background-color: ${colors.gray50};
  padding: 3rem;
  gap: 2rem;

  &::-webkit-scrollbar {
    width: .375rem;
    height: .375rem;
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
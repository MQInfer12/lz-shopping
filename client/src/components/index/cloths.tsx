import styled from 'styled-components'
import { useCloth } from '../../context/cloth'
import { useData } from '../../context/data'
import { colors } from '../../style/variables'
import Loading from '../global/loading'
import Carousel from './carousel'
import Categories from './categories'
import ClothMapper from './clothMapper'

const Cloths = () => {
  const { loadingIndex } = useData();
  const { search, focused } = useCloth();

  return (
    <ClothsSection>
      {!(focused || search) && <Carousel />}
      { 
        loadingIndex ?
        <Loading /> :
        <>
        {!(focused || search) && <Categories />}
        <ClothMapper />
        </>
      }
    </ClothsSection>
  )
}

export default Cloths

const ClothsSection = styled.section`
  min-width: 70%;
  height: calc(100dvh - 3.5rem);
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  background-color: ${colors.gray50};
  padding: 3rem;
  gap: 2rem;

  @media screen and (max-width: 1110px) {
    min-width: 100%;
  }

  @media screen and (max-width: 450px) {
    padding: 1.5rem 1rem;
  }

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
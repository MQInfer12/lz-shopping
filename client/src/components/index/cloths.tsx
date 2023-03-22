import styled from 'styled-components'
import { colors } from '../../style/variables'
import Carousel from './carousel'
import Categories from './categories'

const Cloths = () => {
  return (
    <ClothsSection>
      <Carousel />
      <Categories />
    </ClothsSection>
  )
}

export default Cloths

const ClothsSection = styled.section`
  min-width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${colors.gray50};
  padding: 3rem;
  gap: 2rem;
`;
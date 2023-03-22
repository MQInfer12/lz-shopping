import styled from 'styled-components'
import { colors } from '../../style/variables'
import Carousel from './carousel'

const Cloths = () => {
  return (
    <ClothsSection>
      <Carousel />
    </ClothsSection>
  )
}

export default Cloths

const ClothsSection = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${colors.gray50};
  padding: 3rem;
  gap: 3rem;
`;
import styled from 'styled-components'
import { useCloth } from '../../context/cloth'
import { colors } from '../../style/variables'
import Carousel from './carousel'
import Categories from './categories'

const Cloths = () => {
  const { selectCloth } = useCloth();

  return (
    <ClothsSection>
      <Carousel />
      <Categories />
      <div>
        <button onClick={() => selectCloth({
          id: 1,
          nombre: "Jean blanco simple con perlas",
          precio: 35,
          foto: "https://media.vogue.mx/photos/622a4c9e2259bde1e77828e0/master/w_552,h_851,c_limit/jeans-blancos-citizen-of-humanity.png"
        })}>Seleccionar jean</button>
        <button onClick={() => selectCloth({
          id: 2,
          nombre: "Chamarra de cuero negra para hombre",
          precio: 80,
          foto: "https://s1.abcstatics.com/media/MM/2018/10/04/9Saint%20Laurent-k0AE--862x900@abc.jpg"
        })}>Seleccionar chamarra</button>
      </div>
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
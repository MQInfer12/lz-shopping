import styled from 'styled-components'
import { StyledA } from '../../style/buttons'
import { colors } from '../../style/variables'
import ProductView from './productView'

const Booking = () => {
  return (
    <ColumnContainer>
      <ProductView />
      <p>¡Pide tu reserva ahora!</p>
      <StyledA>
        Contáctame <i className="fa-brands fa-whatsapp"></i>
      </StyledA>
    </ColumnContainer>
  )
}

export default Booking

const ColumnContainer = styled.div`
  padding: 4.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;

  & > p {
    color: ${colors.gray400};
  }

  & > a {
    font-size: 1.2rem;
  }
`;
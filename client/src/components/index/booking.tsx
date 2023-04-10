import { useState } from 'react'
import styled from 'styled-components'
import { StyledA } from '../../style/buttons'
import { colors } from '../../style/variables'
import ProductView from './productView'
import { Inputcontainer, SelectContainer } from '../../style/input'
import BookingForm from './bookingForm'

const Booking = () => {
  const [viewImage, setViewImage] = useState(false);
  
  return (
    <ColumnContainer noOverflow={viewImage}>
      <ProductView viewImage={viewImage} setViewImage={setViewImage} />
      <BookingForm />
    </ColumnContainer>
  )
}

export default Booking

interface ColumnContainerProps {
  noOverflow: boolean
}

const ColumnContainer = styled.div<ColumnContainerProps>`
  padding: 4.5rem 0 3rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
  overflow: ${props => props.noOverflow && "hidden"};

  & > a {
    font-size: 1.2rem;
  }
`;
import React, { useState } from 'react'
import styled from 'styled-components';
import { Button, StyledA } from '../../style/buttons';
import { Inputcontainer, SelectContainer } from '../../style/input';
import { useCloth } from '../../context/cloth';
import code from '../../utilities/code';
import { colors } from '../../style/variables';
import { useUser } from '../../context/user';

const BookingForm = () => {
  const { user } = useUser();
  const [ci, setCi] = useState(user ? String(user.ci) : "");
  const [quantity, setQuantity] = useState("1");
  const { selected } = useCloth();

  const handleToWhatsapp = () => {
    const codedProductId = code(String(selected?.id));
    const codedQuantity = code(quantity);
    const baseUrl = window.location.origin;
    const message = `Hola!%20quiero%20reservar%20este%20producto:%0a*${selected?.name}*%0a${baseUrl}/%23/reserve/${codedProductId}/${codedQuantity}/${ci}`;
    window.open(`https://wa.me/59176407344?text=${message}`, "_blank");
  }

  return (
    <FormContainer>
      <p>¡Pide tu reserva ahora!</p>
      <div className="row">
        {
          !user &&
          <Inputcontainer>
            <label>Ingresa tu CI*</label>
            <input
              type='text'
              value={ci}
              onChange={(e) => setCi(e.target.value)}
            />
          </Inputcontainer>
        }
        {
          selected?.stock != 1 &&
          <SelectContainer small>
            <label>Cantidad*</label>
            <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </SelectContainer>
        }
      </div>
      <Button 
        onClick={handleToWhatsapp}
      >
        Contáctame <i className="fa-brands fa-whatsapp"></i>
      </Button>
    </FormContainer>
  )
}

export default BookingForm

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;

  & > p {
    color: ${colors.gray400};
  }

  & > .row {
    display: flex;
    gap: 1rem;
  }
`;
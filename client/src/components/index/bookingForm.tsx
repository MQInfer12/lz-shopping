import React, { useState } from 'react'
import styled from 'styled-components';
import { StyledA } from '../../style/buttons';
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

  const codedProductId = code(String(selected?.id));
  const codedQuantity = code(quantity);

  const message = `Hola!%20quiero%20reservar%20este%20producto:%0a${selected?.name}%0ahttps://lz-shopping.web.app/reserve/${codedProductId}/${codedQuantity}/${ci}`;

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
            </select>
          </SelectContainer>
        }
      </div>
      <StyledA 
        href={`https://wa.me/59176407344?text=${message}`}
        target="_blank"
      >
        Contáctame <i className="fa-brands fa-whatsapp"></i>
      </StyledA>
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
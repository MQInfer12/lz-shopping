import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Button, StyledA } from '../../style/buttons';
import { Inputcontainer, SelectContainer } from '../../style/input';
import { useCloth } from '../../context/cloth';
import code from '../../utilities/code';
import { colors } from '../../style/variables';
import { useUser } from '../../context/user';
import InputText from '../global/inputText';
import { InputSelect } from '../global/inputSelect';
import Swal from 'sweetalert2';
import { createEmojis } from '../../utilities/createEmojis';

const BookingForm = () => {
  const { user } = useUser();
  const [ci, setCi] = useState<string | null>(user ? String(user.ci) : null);
  const [quantity, setQuantity] = useState("1");
  const { selected } = useCloth();
  const [errors, setErrors] = useState<any>({});

  const quantitySold = selected?.clients?.reduce((ac, sale) => ac + sale.amount, 0) || 0;
  const quantityLeft = (selected?.stock) && (selected?.stock - quantitySold);

  const checkNulls = () => {
    const nullErrors: any = {};
    if(ci === null) {
      nullErrors.ci = "Este espacio es requerido";
    }
    return nullErrors;
  }

  const checkErrors = () => {
    let newErrors: any = {};
    if(ci != null && !ci.trim()) {
      newErrors.ci = "Este espacio es requerido";
    } else if(ci != null && !/^\d+$/.test(ci)) {
      newErrors.ci = "Este espacio solo puede tener números";
    }
    return newErrors;
  }

  const handleToWhatsapp = () => {
    const nullErrors = checkNulls();
    if(!Object.keys(nullErrors).length && !Object.keys(errors).length) {
      const codedProductId = code(String(selected?.id));
      const codedQuantity = code(quantity);
      const baseUrl = window.location.origin;
      const message = `Hola!%20quiero%20reservar%20este%20producto:%0a*${selected?.name}*%20${createEmojis(selected)}%0a${baseUrl}/%23/reserve/${codedProductId}/${codedQuantity}/${ci}`;
      window.open(`https://wa.me/59176407344?text=${message}`, "_blank");
    } else {
      setErrors({...checkNulls(), ...checkErrors()});
      Swal.fire({
        title: "Error",
        text: "Comprueba que no existan errores en el formulario.",
        icon: "error"
      });
    }
  }

  useEffect(() => {
    setErrors(checkErrors());
  }, [ci]);

  return (
    <FormContainer>
      {
        quantityLeft ?
        <><p>¡Pide tu reserva ahora!</p>
        <div className="row">
          {
            !user &&
            <InputText 
              text='Ingresa tu CI*'
              state={ci || ""}
              handleChange={(e) => setCi(e.target.value)}
              error={errors.ci}
              style={{ textAlign: "center" }}
            />
          }
          {
            quantityLeft != 1 &&
            <InputSelect 
              text='Cantidad*'
              state={quantity}
              handleChange={(e) => setQuantity(e.target.value)}
              options={
                Array.from(Array(quantityLeft).keys()).map(v => ({
                  value: v + 1,
                  text: v + 1
                }))
              }
              small
            />
          }
        </div>
        <Button 
          onClick={handleToWhatsapp}
        >
          Contáctame <i className="fa-brands fa-whatsapp"></i>
        </Button></> :
        <p>El producto está agotado</p>
      }
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
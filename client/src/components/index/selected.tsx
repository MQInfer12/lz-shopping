import { useState } from 'react';
import styled from 'styled-components'
import { Product } from '../../interfaces/product';
import { colors } from '../../style/variables'
import Booking from './booking';
import HandIcon from './handIcon'

const Selected = () => {
  const [selected, setSelected] = useState<Product>({
    nombre: "Jean blanco simple",
    precio: 35,
    foto: "https://media.vogue.mx/photos/622a4c9e2259bde1e77828e0/master/w_552,h_851,c_limit/jeans-blancos-citizen-of-humanity.png"
  });

  return (
    <SelectedContainer>
      {
        Object.keys(selected).length ?
        <>
          <Booking selected={selected} />
          <button onClick={() => setSelected({})}><i className="fa-solid fa-xmark"></i></button>
        </>
        :
        <>
        <HandIcon />
        <p>Selecciona una prenda para reservarla.</p>
        </>
      }
      
    </SelectedContainer>
  )
}

export default Selected

const SelectedContainer = styled.div`
  min-width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  position: relative;

  & > * {
    animation: appear 1s ease;

    @keyframes appear {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }

  & > p {
    max-width: 60%;
    text-align: center;
    color: ${colors.gray400};
    font-size: 1.4rem;
    line-height: 2.2rem;
  }

  & > button {
    position: absolute;
    top: 2rem;
    left: 2rem;
    font-size: 1.8rem;
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      transform: scale(1.2);
    }
  }
`;


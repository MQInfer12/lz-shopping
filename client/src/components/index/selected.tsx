import styled from 'styled-components'
import { useCloth } from '../../context/cloth';
import Booking from './booking';
import HandIcon from './handIcon'

const Selected = () => {
  const { selected, removeCloth } = useCloth();

  return (
    <SelectedContainer>
      {
        Object.keys(selected).length ?
        <>
          <Booking key={selected.id} />
          <button onClick={removeCloth}><i className="fa-solid fa-xmark"></i></button>
        </>
        :
        <HandIcon />
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


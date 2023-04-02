import styled from 'styled-components'
import { useCloth } from '../../context/cloth';
import { useWidth } from '../../hooks/useWidth';
import { colors } from '../../style/variables';
import Booking from './booking';
import HandIcon from './handIcon'

const Selected = () => {
  const { selected, removeCloth, open } = useCloth();
  const width = useWidth();

  if((width < 1110 && !open)) return <></>;

  return (
    <SelectedContainer>
      {
        Object.keys(selected).length ?
        <Booking key={selected.id} />
        :
        <HandIcon />
      }   
      { 
        Object.keys(selected).length ? 
        <button className="icon-button" onClick={removeCloth}>
          <i className="fa-solid fa-xmark"></i>
        </button> : <></> 
      } 
    </SelectedContainer>
  )
}

export default Selected

const SelectedContainer = styled.div`
  height: calc(100dvh - 56px);
  overflow: auto;
  min-width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
  position: relative;
  background-color: white;

  &::-webkit-scrollbar {
    width: .375rem;
    height: .375rem;
  }
  &::-webkit-scrollbar-track {
    background: ${colors.gray200};
    border-radius: .1875rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.primary500};
    border-radius: .1875rem;
  }

  & > .icon-button {
    position: absolute;
    top: 1rem;
    left: 2rem;
    font-size: 1.8rem;
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition: all 0.3s;
    z-index: 5;
    color: ${colors.gray900};

    &:hover {
      transform: scale(1.2);
    }
  }

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

  @media screen and (max-width: 1110px) {
    position: absolute;
    inset: 0;
  }
`;
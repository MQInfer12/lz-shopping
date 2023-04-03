import styled from "styled-components";
import { colors } from "./variables";

interface Props {
  name: string
  state: string
  setState: React.Dispatch<React.SetStateAction<string>>
}

export const InputNumber = ({ name, state, setState }: Props) => {
  return (
    <Inputcontainer>
      <label>{ name }</label>
      <div className="input-relative">
        <input 
          type="number"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <div className="controls">
          <button
            onClick={() => setState(old => String(Number(old) - 5))}
          >- 5</button>
          <button
            onClick={() => setState(old => String(Number(old) - 1))}
          >- 1</button>
        </div>
        <div className="controls">
          <button
            onClick={() => setState(old => String(Number(old) + 1))}
          >+ 1</button>
          <button
            onClick={() => setState(old => String(Number(old) + 5))}
          >+ 5</button>
        </div>
      </div>
    </Inputcontainer>
  )
}

export const Inputcontainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  & > .input-relative {
    position: relative;
    border-radius: 1.5rem;
    overflow: hidden;

    & > .controls {
      height: 100%;
      position: absolute;
      top: 0;
      &:first-child {
        left: 0;
      }
      &:last-child {
        right: 0;
      }

      & button {
        height: 100%;
        font-size: 0.8rem;
        color: ${colors.white};
        border: none;
        cursor: pointer;
        transition: all 0.3s;
        padding: 0 .3rem;

        background-color: ${colors.gray500};
        &:hover {
          background-color: ${colors.gray600};
        }
      }
    }
  }

  & input{
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 1.5rem;
    border:1px solid ${colors.gray500};
    outline: none;
    font-size: 1rem;
    color: ${colors.gray900};

    &[type=number] {
      text-align: center;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  & > label {
    color: ${colors.gray500};
    padding-left: 1rem;
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > select {
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius:1.5rem ;
    border:1px solid ${colors.gray500};
    outline: none;
    font-size: 1rem;
    color: ${colors.gray900};
  }

  & > label {
    color: ${colors.gray500};
    padding-left: 1rem;
  }
`;
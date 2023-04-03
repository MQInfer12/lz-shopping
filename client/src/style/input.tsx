import styled from "styled-components";
import { colors } from "./variables";

interface Props {
  name: string
  state: any
  setState: React.Dispatch<React.SetStateAction<any>>
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePlus: () => void
  handleMinus: () => void
}

export const InputNumber = ({ name, state, setState, handleChange, handlePlus, handleMinus }: Props) => {
  return (
    <Inputcontainer>
      <label>{ name }</label>
      <div className="input-relative">
        <input 
          type="number"
          value={state}
          onChange={handleChange}
        />
        <div className="controls">
          <button
            onClick={handleMinus}
          >-</button>
        </div>
        <div className="controls">
          <button
            onClick={handlePlus}
          >+</button>
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
        padding: 0 1rem;

        background-color: ${colors.primary600};
        &:hover {
          background-color: ${colors.primary800};
        }
      }
    }

    & progress {
      width: 100%;
      transition: all 0.2s;
      height: 0.30rem;
      position: absolute;
      bottom: 0;
      left: 0;
      accent-color: ${colors.primary600};
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
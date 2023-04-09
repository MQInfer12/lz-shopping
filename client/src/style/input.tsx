import styled from "styled-components";
import { colors } from "./variables";

interface Props {
  name: string
  state: any
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePlus: () => void
  handleMinus: () => void
}

export const InputNumber = ({ name, state, handleChange, handlePlus, handleMinus }: Props) => {
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

interface InputContainerProps {
  hide?: boolean
}

export const Inputcontainer = styled.div<InputContainerProps>`
  display: ${props => props.hide ? "none" : "flex"};
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

    &:disabled {
      background-color: ${colors.gray100};
      border:1px solid ${colors.gray400};
    }
  }

  & > label {
    color: ${colors.gray500};
    padding-left: 1rem;
  }
`;

interface SelectContainerProps {
  small?: boolean
}

export const SelectContainer = styled.div<SelectContainerProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${props => props.small && "110px"};

  & > select {
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius:1.5rem ;
    border:1px solid ${colors.gray500};
    outline: none;
    font-size: 1rem;
    color: ${colors.gray900};

    &:disabled {
      background-color: ${colors.gray100};
    }
  }

  & > label {
    color: ${colors.gray500};
    padding-left: 1rem;
  }
`;
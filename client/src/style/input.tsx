import styled from "styled-components";
import { colors } from "./variables";

export const Inputcontainer=styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  &>input{
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius:1.5rem ;
    border:1px solid ${colors.gray500};
    outline: none;
    color: ${colors.gray900};
  }
  &>label{
    color: ${colors.gray500};
    padding-left: 1rem;
  }
`;

export const IconInputText = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  &>input{
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    border-radius:1.5rem ;
    border:1px solid ${colors.gray500};
    outline: none;
    color: ${colors.gray900};

    &:focus + label {
      color: ${colors.gray900};
    }
  }
  &>label{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 1rem;
    color: ${colors.gray500};
    transition: all 0.3s;
  }
`;
import styled from "styled-components";
import { colors } from "./variables";

export const Inputcontainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > input{
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius:1.5rem ;
    border:1px solid ${colors.gray500};
    outline: none;
    color: ${colors.gray900};
  }

  & > label{
    color: ${colors.gray500};
    padding-left: 1rem;
  }
`;
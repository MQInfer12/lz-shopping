import styled from "styled-components";
import { colors } from "./variables";

export const Table = styled.table`
  margin-top: 2rem;
  border-collapse: collapse;
  table-layout: fixed;
  max-width: 100%;

  & tr {
    transition: all 0.3s;
    &:hover {
      background-color: ${colors.gray100};
    }
  }

  & th {
    text-align: start;
    color: ${colors.gray400};
    font-weight: 400;
    border-bottom: 1px solid ${colors.gray400};
    padding: 0.5rem 1rem;
  }

  & td {
    text-align: start;
    color: ${colors.gray900};
    font-weight: 600;
    border-bottom: 1px solid ${colors.gray200};
    padding: 1rem 2.5rem 1rem 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & .center {
    text-align: center;
    padding: 1rem 0;
  }

  & .padding {
    padding: 1rem 1.5rem;
  }

  & img {
    width: 7.5rem;
    height: 7.5rem;
    box-shadow: ${colors.shadow};
    border-radius: .5rem;
    object-fit: cover;
  }
`;
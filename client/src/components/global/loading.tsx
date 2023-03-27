import React from 'react'
import styled from 'styled-components'
import { colors } from '../../style/variables'

const Loading = () => {
  return (
    <LoadingContainer>
      <span className="loader"></span>
      <p>Cargando...</p>
    </LoadingContainer>
  )
}

export default Loading

const LoadingContainer = styled.div`
  height: 10rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: .5rem;
  
  & > p {
    font-size: 1.2rem;
    color: ${colors.gray400};
  }

  .loader {
    animation: rotate 2s infinite;
    height: 50px;
    width: 50px;
  }

  .loader:before,
  .loader:after {
    border-radius: 50%;
    content: "";
    display: block;
    height: 20px;
    width: 20px;
  }
  .loader:before {
    animation: ball1 2s infinite;
    background-color: ${colors.primary600};
    box-shadow: 30px 0 0 ${colors.primary500};
    margin-bottom: 10px;
  }
  .loader:after {
    animation: ball2 2s infinite;
    background-color: ${colors.primary500};
    box-shadow: 30px 0 0 ${colors.primary600};
  }

  @keyframes rotate {
    0% { transform: rotate(0deg) scale(0.8) }
    50% { transform: rotate(360deg) scale(1.2) }
    100% { transform: rotate(720deg) scale(0.8) }
  }

  @keyframes ball1 {
    0% {
      box-shadow: 30px 0 0 ${colors.primary500};
    }
    50% {
      box-shadow: 0 0 0 ${colors.primary500};
      margin-bottom: 0;
      transform: translate(15px, 15px);
    }
    100% {
      box-shadow: 30px 0 0 ${colors.primary500};
      margin-bottom: 10px;
    }
  }

  @keyframes ball2 {
    0% {
      box-shadow: 30px 0 0 ${colors.primary600};
    }
    50% {
      box-shadow: 0 0 0 ${colors.primary600};
      margin-top: -20px;
      transform: translate(15px, 15px);
    }
    100% {
      box-shadow: 30px 0 0 ${colors.primary600};
      margin-top: 0;
    }
  }
`;
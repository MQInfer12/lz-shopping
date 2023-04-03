import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from '../components/template/navbar'
import { colors } from '../style/variables'

const Layout = () => {
  return (
    <main>
      <Navbar />
      <AppContainer id="home">
        <Outlet />
      </AppContainer>
    </main>
  )
}

export default Layout

const AppContainer = styled.div`
  margin-top: 3.5rem;
  height: calc(100dvh - 3.5rem);
  overflow: auto;
  /* scroll-behavior: smooth; */
  
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
`;
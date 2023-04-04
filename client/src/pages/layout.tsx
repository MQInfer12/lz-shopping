import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from '../components/template/navbar'
import { colors } from '../style/variables'

const Layout = () => {
  const location = useLocation();

  return (
    <main>
      <Navbar />
      <AppContainer path={location.pathname} id="home">
        <Outlet />
      </AppContainer>
    </main>
  )
}

export default Layout

interface AppContainerProps {
  path: string
}

const AppContainer = styled.div<AppContainerProps>`
  margin-top: 3.5rem;
  height: calc(100dvh - 3.5rem);
  overflow-y: ${props => props.path === "/home" ? "scroll" : "auto"};
  
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
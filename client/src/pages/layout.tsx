import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from '../components/template/navbar'

const Layout = () => {
  return (
    <main>
      <Navbar />
      <AppContainer>
        <Outlet />
      </AppContainer>
    </main>
  )
}

export default Layout

const AppContainer = styled.div`
  margin-top: 3.5rem;
  height: calc(100dvh - 3.5rem);
`;
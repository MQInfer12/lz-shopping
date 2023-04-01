import React from 'react'
import ClothMapper from '../index/clothMapper'
import { useUser } from '../../context/user'
import styled from 'styled-components';
import { colors } from '../../style/variables';

const UserProducts = () => {
  const { user } = useUser();

  return (
    <Container>
      <h2>Mis productos</h2>
      {
        user?.products.length ?
        <ClothMapper products={user?.products || []} /> :
        <CenterText>
          <p>¡Danos tu CI cuando compres un producto y aparecerá aquí!</p>
        </CenterText>
      }
    </Container>
  )
}

export default UserProducts

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  & > h2 {
    text-align: center;
  }
`;

const CenterText = styled.div`
  width: 100%;
  font-size: 1.2rem;
  color: ${colors.gray400};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
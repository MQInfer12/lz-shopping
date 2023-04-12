import React from 'react'
import ClothMapper from '../index/clothMapper'
import { useUser } from '../../context/user'
import styled from 'styled-components';
import { colors } from '../../style/variables';
import Loading from '../global/loading';

const UserProducts = () => {
  const { user, loadingUserdata } = useUser();

  return (
    <Container>
      <h2>Mis productos reservados</h2>
      {
        loadingUserdata ?
        <Loading /> :
        user?.products.length ?
        <ClothMapper sales={user?.products || []} /> :
        <CenterText>
          <p>¡Cuando tu reserva se confirme aparecerá aquí!</p>
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
  width: 100%;

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
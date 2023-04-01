import React, { useEffect } from 'react'
import styled from 'styled-components'
import Form from '../components/user/form'
import { useUser } from '../context/user'
import UserPage from '../components/user/userPage'
import { colors } from '../style/variables'

const User = () => {
  const { user } = useUser();

  useEffect(() => {
    if(user) {
      localStorage.setItem("lz-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("lz-user");
    }
  }, [user]);

  return (
    <UserPageContainer>
      { user ? <UserPage /> : <Form /> }
    </UserPageContainer>
  )
}

export default User

const UserPageContainer = styled.div`
  min-height: calc(100dvh - 56px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.gray50};
  padding: 1rem;
`;
import styled from 'styled-components';
import { useUser } from '../../context/user'
import UserData from './userData';
import { Button } from '../../style/buttons';
import UserProducts from './userProducts';

const UserPage = () => {
  const { setUser } = useUser();

  const handleLogout = () => {
    setUser(undefined);
  }

  return (
    <Container>
      <Button onClick={handleLogout}>Cerrar sesión</Button>
      <UserData />
      <UserProducts />
    </Container>
  )
}

export default UserPage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  align-items: center;
`;
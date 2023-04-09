import { useState } from 'react'
import styled from 'styled-components'
import { useUser } from '../../context/user'
import { Inputcontainer } from '../../style/input';
import { Button } from '../../style/buttons';
import { updateUser } from '../../services/user';
import Swal from 'sweetalert2';

const UserData = () => {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone ? String(user?.phone) : "",
    ci: String(user?.ci)
  });

  const handleSubmit = async () => {
    if(!user?.ci) return;
    setLoading(true);
    const res = await updateUser(String(user?.ci), form);
    setUser({
      ...res.data,
      products: user.products
    });
    setLoading(false);
    Swal.fire({
      title: "Petición correcta.",
      text: "Se actualizaron tus datos correctamente.",
      icon: 'success'
    });
  }

  return (
    <Container>
      <h2>Actualiza tus datos faltantes</h2>
      <UserDataContainer>
        <Inputcontainer>
          <label>Nombre</label>
          <input 
            value={form.name} 
            onChange={(e) => setForm(old => ({...old, name: e.target.value}))} 
            type="text" 
          />
        </Inputcontainer>
        <Inputcontainer>
          <label>Teléfono</label>
          <input 
            value={form.phone} 
            onChange={(e) => setForm(old => ({...old, phone: e.target.value}))} 
            type="text" 
          />
        </Inputcontainer>
        <Inputcontainer>
          <label>CI</label>
          <input 
            value={form.ci}
            onChange={(e) => setForm(old => ({...old, ci: e.target.value}))}  
            type="text" 
          />
        </Inputcontainer>
        <Button disabled={loading} onClick={handleSubmit}>{loading ? "Cargando..." : "Actualizar"}</Button>
      </UserDataContainer>
    </Container>
  )
}

export default UserData

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  & > h2 {
    text-align: center;
  }
`;

const UserDataContainer = styled.div`
  display: flex;
  align-items: end;
  gap: 2rem;

  @media screen and (max-width: 815px) {
    flex-direction: column;
    align-items: center;
  }
`;
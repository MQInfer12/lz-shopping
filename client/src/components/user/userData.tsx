import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useUser } from '../../context/user'
import { Inputcontainer } from '../../style/input';
import { Button } from '../../style/buttons';
import { updateUser } from '../../services/user';
import Swal from 'sweetalert2';
import InputText from '../global/inputText';

const UserData = () => {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone ? String(user?.phone) : "",
    ci: String(user?.ci)
  });

  const checkErrors = () => {
    let newErrors: any = {};
    if(!/^\d+$/.test(form.phone) && form.phone != "") {
      newErrors.phone = "Este espacio solo puede tener números";
    }
    if(form.ci != null && !form.ci.trim()) {
      newErrors.ci = "Este espacio es requerido";
    } else if(form.ci != null && !/^\d+$/.test(form.ci)) {
      newErrors.ci = "Este espacio solo puede tener números";
    }
    return newErrors;
  }

  const handleSubmit = async () => {
    if(!Object.keys(errors).length) {
      if(!user?.ci) return;
      setLoading(true);
      const res = await updateUser(String(user?.ci), form);
      if(res.error) {
        Swal.fire({
          title: "Error",
          text: `${res.error}.`,
          icon: "error"
        });
      } else {
        setUser({
          ...user,
          ...res.data,
        });
        Swal.fire({
          title: "Petición correcta.",
          text: "Se actualizaron tus datos correctamente.",
          icon: 'success'
        });
      }
      setLoading(false);
    } else {
      setErrors(checkErrors());
      Swal.fire({
        title: "Error",
        text: "Comprueba que no existan errores en el formulario.",
        icon: "error"
      });
    }
  }

  useEffect(() => {
    setErrors(checkErrors());
  }, [form]);

  return (
    <Container>
      <h2>Actualiza tus datos faltantes</h2>
      <UserDataContainer>
        <InputText 
          text="Nombre"
          state={form.name || ""}
          handleChange={(e) => setForm(old => ({...old, name: e.target.value}))}
        />
        <InputText 
          text="Teléfono"
          state={form.phone || ""}
          handleChange={(e) => setForm(old => ({...old, phone: e.target.value}))}
          error={errors.phone}
        />
        <InputText 
          text="CI*"
          state={form.ci}
          handleChange={(e) => setForm(old => ({...old, ci: e.target.value}))}
          error={errors.ci}
        />
      </UserDataContainer>
      <Button disabled={loading} onClick={handleSubmit}>{loading ? "Cargando..." : "Actualizar"}</Button>
    </Container>
  )
}

export default UserData

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

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
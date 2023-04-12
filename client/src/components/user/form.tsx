import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from '../../style/buttons';
import { Inputcontainer } from '../../style/input';
import { colors } from '../../style/variables';
import { useUser } from '../../context/user';
import Swal from 'sweetalert2';
import InputText from '../global/inputText';

const Form = () => {
  const [ci, setCi] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { getUserData } = useUser();
  const [errors, setErrors] = useState<any>({});

  const checkNulls = () => {
    const nullErrors: any = {};
    if(ci === null) {
      nullErrors.ci = "Este espacio es requerido";
    }
    return nullErrors;
  }

  const checkErrors = () => {
    let newErrors: any = {};
    if(ci != null && !ci.trim()) {
      newErrors.ci = "Este espacio es requerido";
    } else if(ci != null && !/^\d+$/.test(ci)) {
      newErrors.ci = "Este espacio solo puede tener números";
    }
    return newErrors;
  }

  const handleSend = async () => {
    const nullErrors = checkNulls();
    if(!Object.keys(nullErrors).length && !Object.keys(errors).length) {
      setLoading(true);
      getUserData(ci || "");
    } else {
      setErrors({...checkNulls(), ...checkErrors()});
      Swal.fire({
        title: "Error",
        text: "Comprueba que no existan errores en el formulario.",
        icon: "error"
      });
    }
  }

  useEffect(() => {
    setErrors(checkErrors());
  }, [ci]);

  return (
    <FormContainer>
      <h2>Ingresa tu CI para ver tu historial de compras.</h2>
      <div className='max'>
        <InputText 
          text="CI*"
          state={ci || ""}
          handleChange={(e) => setCi(e.target.value)}
          error={errors.ci}
        />
      </div>
      <Button disabled={loading} onClick={handleSend}>{loading ? "Cargando..." : "Ingresar"}</Button>
    </FormContainer>
  )
}

export default Form

const FormContainer = styled.div`
  height: calc(calc(100dvh - 56px) - 2rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;

  & > h2 {
    color: ${colors.gray900};
    text-align: center;
  }

  & > .max {
    width: 200px;
    display: flex;
    flex-direction: column;
    gap: 1rem;  

    & input {
      text-align: center;
    }
  }
`;
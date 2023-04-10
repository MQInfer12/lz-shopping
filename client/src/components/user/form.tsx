import { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../../style/buttons';
import { Inputcontainer } from '../../style/input';
import { colors } from '../../style/variables';
import { useUser } from '../../context/user';

const Form = () => {
  const [ci, setCi] = useState("");
  const [loading, setLoading] = useState(false);
  const { getUserData } = useUser();

  const handleSend = async () => {
    setLoading(true);
    getUserData(ci);
  }

  return (
    <FormContainer>
      <h2>Ingresa tu CI para ver tu historial de compras.</h2>
      <div>
        <Inputcontainer>
          <label>CI*</label>
          <input value={ci} onChange={(e) => setCi(e.target.value)} type="text" />
        </Inputcontainer>
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

  & > div {
    width: 200px;
    display: flex;
    flex-direction: column;
    gap: 1rem;  

    & input {
      text-align: center;
    }
  }
`;
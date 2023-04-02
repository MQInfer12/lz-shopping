import React  from "react";
import {useState} from "react";
import {useNavigate} from 'react-router-dom';
import styled from "styled-components";
import Bubbles from "../components/bubbles";
import { colors } from "../style/variables";
import LoginImg from "../assets/login.jpg";
import { Button } from "../style/buttons";
import { Inputcontainer } from "../style/input";
import { useUser } from "../context/user";

const Login = () => { 
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const { activateAdmin } = useUser();

  const Autenticate = () => {
    if(email != "admin@gmail.com" || password != '123456') return alert('Datos incorrectos');
    activateAdmin();
    navigate('/home');
  }

  return (
    <Container>
      <Firstcolumn>
        <Picture src={LoginImg} alt="login" />       
      </Firstcolumn>
      <SecondColumn>
        <Bubbles top='0.5rem' left='0.5rem'/>
        <Bubbles top='0.5rem' left='100%' mirror/>
        <Loginconteiner>
          <Htwo>LZ Shopping</Htwo>
          <Inputcontainer>
            <label htmlFor="email">E-mail* </label>
            <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
          </Inputcontainer>
          <Inputcontainer>
            <label htmlFor="password">Password*</label>
            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} required/>
          </Inputcontainer>
          <Button onClick={Autenticate}>Login</Button> 
        </Loginconteiner>
      </SecondColumn>
    </Container>
  );
};


export default Login;

const Container=styled.div`
  height: 100%;
  display:grid;
  grid-template-columns: 1fr 1fr;
`;
const Firstcolumn=styled.div`
  background:linear-gradient(0deg, ${colors.primary600rgb} 0%, ${colors.primary400rgb} 100%);
  display: flex;
  align-items: center;
  justify-content: center;

`;
const SecondColumn=styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const Loginconteiner=styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`;
const Htwo=styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
  color: ${colors.gray900};
`;

const Picture=styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
`;
import React  from "react";
import {useState} from "react";
import {useNavigate} from 'react-router-dom';
import styled from "styled-components";
import Bubbles from "../components/bubbles";
import { colors } from "../style/variables";


const Login = () => { 
    const [email, setEmail] = useState('');
    const navigate=useNavigate();
    const [password, setPassword] = useState('');

const Autenticate =()=>{
    if(email === 'josh@gmail.com'){
      if(password==='123456'){
        navigate('/home')
      }
    }
    else{
      alert('Nel perro')
    }
}
  return (
    <Container>
      <Firstcolumn>
        <Picture src="https://cdn.pixabay.com/photo/2017/08/06/15/13/woman-2593366_1280.jpg" alt="" />       
      </Firstcolumn>
      <SecondColumn>
        <Bubbles top='0.5rem' left='0.5rem'/>
        <Bubbles top='0.5rem' left='100%' mirror/>
        <Loginconteiner>
          <Htwo>Tienda de Ropa</Htwo>
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
  height: 100dvh;
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
const Loginconteiner=styled.div`
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
`;
const Inputcontainer=styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  &>input{
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius:1.5rem ;
    border:1px solid black;
    outline: none;
  }
  &>label{
    padding-left: 1rem;
  }
`;
const Button=styled.button`
  width: 80%;
  padding: 0.5rem 0;
  border-radius: 1.5rem;
  border:none;
  cursor:pointer;
  font-weight: 500;
`;
const Picture=styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
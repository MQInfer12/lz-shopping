import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../context/user';

const Reserve = () => {
  const navigate = useNavigate();
  const { idProduct, quantity, ci } = useParams();
  const { admin } = useUser();

  useEffect(() => {
    if(admin) {
      navigate("/home");
    } else {
      navigate("/");
    }
  })

  return (
    <div>Redireccionando...</div>
  )
}

export default Reserve
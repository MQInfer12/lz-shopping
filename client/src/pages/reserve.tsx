import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../context/user';

const Reserve = () => {
  const navigate = useNavigate();
  const { idProduct, quantity, ci } = useParams();
  const { admin } = useUser();

  useEffect(() => {
    if(admin) {
      navigate(`/home/${idProduct}/${quantity}/${ci}`);
    } else {
      navigate(`/view/${idProduct}`);
    }
  })

  return (
    <div>Redireccionando...</div>
  )
}

export default Reserve
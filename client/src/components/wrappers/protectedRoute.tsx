import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/user'

interface Props {
  children: JSX.Element
}

const ProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate();
  const { admin } = useUser();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if(!admin) {
      navigate("/login");
    } else {
      setAuthorized(true);
    }
  }, [admin]);

  if(authorized) {
    return (
      <>
      { children }
      </>
    )
  }

  return <></>;
}

export default ProtectedRoute
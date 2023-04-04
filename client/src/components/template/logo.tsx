import React from 'react'
import styled from 'styled-components'
import { colors } from '../../style/variables'
import { Link, useNavigate } from 'react-router-dom'
import {useState, useEffect}  from 'react'

const Logo = () => {
  const [cont, setCont] = useState(0)
  let timer;
  const handledoubleclick = ()=>{ 
    setCont(old=>old+1)

    timer=setTimeout(()=>{
      setCont(0)
    },250)
  }
  console.log(cont)
  return (
    <A onClick={handledoubleclick} to={cont===2?'/home':"/"}>
      <p className='circle'>LZ</p>
      Shopping
    </A>
  )
}

export default Logo

const A = styled(Link)`
  display: flex;
  gap: .5rem;
  font-size: 1.25rem;
  font-weight: 700;
  align-items: center;
  text-decoration: none;
  color: ${colors.gray900};

  .circle {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: ${colors.primary600};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colors.white};
    font-weight: 600;
    transition: all 0.3s;
  }

  &:hover > .circle {
    background-color: ${colors.primary800};
  }
`;
import styled from 'styled-components'
import { colors } from '../../style/variables'
import { Link } from 'react-router-dom'
import { useState }  from 'react'

const Logo = () => {
  const [cont, setCont] = useState(0);

  const handleDoubleClick = ()=>{ 
    setCont(old => old + 1);
    setTimeout(() => {
      setCont(0);
    }, 250);
  }

  return (
    <A onClick={handleDoubleClick} to={cont === 1 ? '/home' : "/"}>
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
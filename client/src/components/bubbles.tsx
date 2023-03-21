import React from 'react'
import styled from 'styled-components'
import { colors } from '../style/variables'

interface Props{
  top:string;
  left:string;
  mirror?:boolean;
}

const Bubbles = ({top, left, mirror=false}:Props) => {
  return (
    <Possitioner top={top} left={left}>
      
    <Bubble mirror={mirror} >
      <Circles size='4rem' top='1rem' left='1rem'></Circles>
      <Circles size='2rem' top='6.5rem' left='1.7rem'></Circles>
      <Circles size='2rem' top='3rem' left='8rem'></Circles>
      <Circles size='3rem' top='4.5rem' left='4.8rem'></Circles>
    </Bubble>
    </Possitioner>
  )
}


export default Bubbles

interface CirclesProps{
  size:string 
  top:string 
  left:string 
}

interface MirrorProps{
  mirror:boolean
}

interface PossitionesProps{
  top:string;
  left:string;
}

const Bubble=styled.div<MirrorProps>`
position: relative;
transform: ${props=>props.mirror && 'scaleX(-1)'};
`;
const Possitioner=styled.div<PossitionesProps>`
  position: absolute;
  top: ${props=>props.top};
  left: ${props=>props.left};
`; 
const Circles=styled.div<CirclesProps>`
  width: ${props=>props.size};
  top: ${props=>props.top};
  height: ${props=>props.size};
  left: ${props=>props.left};
  border-radius: 50%;
  background:linear-gradient(0deg, ${colors.primary600rgb} 0%, ${colors.primary400rgb} 100%);
  position: absolute;
`;
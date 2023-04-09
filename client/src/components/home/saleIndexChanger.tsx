import React from 'react'

interface Props {
  stock: number
  clientsLength: number
  index: number
  setIndex: React.Dispatch<React.SetStateAction<number>>
}

const SaleIndexChanger = ({ stock, clientsLength, index, setIndex }: Props) => {
  return (
    <div>
      <button 
        onClick={() => { 
          if(index > 0) 
          setIndex(old => old - 1)}}
        >{"<-"}</button>  
      <small>{index + 1} / {clientsLength + 1 > stock ? stock : clientsLength + 1}</small>
      <button 
        onClick={() => { 
          if(index < clientsLength && index != stock - 1) 
          setIndex(old => old + 1)
        }}
      >{"->"}</button> 
    </div>
  )
}

export default SaleIndexChanger
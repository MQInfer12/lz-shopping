import React from 'react'
import PageTemplate from './pageTemplate' 
import { Inputcontainer } from '../../style/input'
import { Button } from '../../style/buttons'
import { Product } from '../../interfaces/product'

interface Props {
  selectedSale: Product | null
}

const SalesCrud = ({ selectedSale }: Props) => {
  return (
    <PageTemplate title='Reservar / Vender'>
       <div className="inputsContainer">
        <img src={selectedSale?.photo} alt="" /> 
        <h2>{selectedSale?.name}</h2>
        <div className="same-line">
          {selectedSale?.discount && <p className='striked'>{selectedSale?.price} Bs.</p>}
          <p>{selectedSale?.discount || selectedSale?.price} Bs.</p>
        </div>
          <Inputcontainer>
            <label>CI</label>
            <input type="text"/>
          </Inputcontainer>    
          <Button>Reservar</Button>
          <Button>Vender</Button>    
       </div>        
    </PageTemplate>
    )  
}

export default SalesCrud
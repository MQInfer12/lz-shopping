import React from 'react'
import PageTemplate from './pageTemplate' 
import { Inputcontainer } from '../../style/input'
import { Button } from '../../style/buttons'

const SalesCrud = () => {
  return (
    <PageTemplate title='Reservar/Vender'>
       <div className="inputsContainer">
        <img src="" alt="" /> 
        <h2>Chamarra negra de cuero para genero no binarie</h2>
        <p>80.50bs</p>
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
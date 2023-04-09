import { useState } from 'react'
import PageTemplate from './pageTemplate' 
import { Product } from '../../interfaces/product'
import SaleForm from './saleForm'
import SaleIndexChanger from './saleIndexChanger'

interface Props {
  selectedSale: Product | null
}

const SalesCrud = ({ selectedSale }: Props) => {
  const [index, setIndex] = useState(0);

  return (
    <PageTemplate title='Reservar / Vender'>
       <div className="inputsContainer">
        <img src={selectedSale?.photo} alt="" /> 
        <h2>{selectedSale?.name}</h2>
        <div className="same-line">
          {selectedSale?.discount && <p className='striked'>{selectedSale?.price} Bs.</p>}
          <p>{selectedSale?.discount || selectedSale?.price} Bs.</p>
        </div>
        <SaleIndexChanger
          index={index}
          setIndex={setIndex}
          stock={selectedSale?.stock || 1}   
          clients={selectedSale?.clients}       
        />
        <SaleForm 
          key={index}
          sale={selectedSale?.clients && selectedSale?.clients[index]}
          idProduct={selectedSale?.id || 0}
        />
       </div>        
    </PageTemplate>
  )  
}

export default SalesCrud
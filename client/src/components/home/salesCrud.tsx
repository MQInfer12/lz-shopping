import { useState } from 'react'
import PageTemplate from './pageTemplate' 
import { Product } from '../../interfaces/product'
import SaleForm from './saleForm'
import SaleIndexChanger from './saleIndexChanger'

interface Props {
  selectedSale: Product | null
  quantity: string | undefined
  ci: string | undefined
}

const SalesCrud = ({ selectedSale, quantity, ci }: Props) => {
  const quantitySold = selectedSale?.clients?.reduce((ac, sale) => ac + sale.amount, 0);
  const [index, setIndex] = useState(
    (selectedSale?.stock && quantitySold) && selectedSale.stock - quantitySold ? 
      (quantity && ci) && selectedSale?.clients?.length || 0 : 0
  );

  return (
    <PageTemplate title='Reservar producto'>
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
          key={selectedSale?.clients && (selectedSale?.clients[index]?.id || index)}
          sale={selectedSale?.clients && selectedSale?.clients[index]}
          idProduct={selectedSale?.id || 0}
          quantitySold={quantitySold || 0}
          stock={selectedSale?.stock || 1}   
          quantityUrl={quantity}
          ciUrl={ci}
        />
       </div>        
    </PageTemplate>
  )  
}

export default SalesCrud
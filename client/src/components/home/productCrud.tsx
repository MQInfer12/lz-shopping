import React, { useState } from 'react'
import styled from 'styled-components'
import { useData } from '../../context/data'
import { Button } from '../../style/buttons'
import { Inputcontainer, InputNumber, SelectContainer } from '../../style/input'
import Loading from '../global/loading'
import CategorySelector from './categorySelector'
import PageTemplate from './pageTemplate'
import ProductTable from './productTable'

const ProductCrud = () => {
  const [stock, setStock] = useState("1");
  const { loadingIndex } = useData();

  return (
    <PageTemplate title="Productos">
      <div className="inputsContainer">
        <Inputcontainer>
          <label>Nombre*</label>
          <input
            type="text"
            onChange={(e) => {}}
          />
        </Inputcontainer>
        <Inputcontainer>
          <label>Foto*</label>
          <input
            type="file"
            onChange={(e) => {}}
          />
        </Inputcontainer>
        <TwoColumns>
          <InputNumber 
            name='Precio*'
            state=""
            setState={() => {}}
          />
          <InputNumber 
            name='Descuento*'
            state=""
            setState={() => {}}
          />
        </TwoColumns>
        <TwoColumns>
          <SelectContainer>
            <label>Talla</label>
            <select onChange={(e) => {}} >
              <option value="">Sin talla</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
              <option value="XXXL">XXXL</option>
            </select>
          </SelectContainer>
          <InputNumber 
            name='Stock*'
            state={stock}
            setState={setStock}
          />
        </TwoColumns>
        <Inputcontainer>
          <label>Categorías</label>
          <CategorySelector />
        </Inputcontainer>
        <Button onClick={() => {}}>Agregar</Button>
      </div>
      {
        loadingIndex ?
        <Loading /> :
        <ProductTable />
      }
    </PageTemplate>
  )
}

export default ProductCrud

const TwoColumns = styled.div`
  display: flex;
  gap: 1rem;
`;
import React from 'react'
import styled from 'styled-components'
import { useData } from '../../context/data'
import { Button } from '../../style/buttons'
import { Inputcontainer } from '../../style/input'
import Loading from '../global/loading'
import PageTemplate from './pageTemplate'
import ProductTable from './productTable'

const ProductCrud = () => {
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
          <Inputcontainer>
            <label>Precio*</label>
            <input
              type="text"
              onChange={(e) => {}}
            />
          </Inputcontainer>
          <Inputcontainer>
            <label>Descuento</label>
            <input
              type="text"
              onChange={(e) => {}}
            />
          </Inputcontainer>
        </TwoColumns>
        <TwoColumns>
          <Inputcontainer>
            <label>Talla</label>
            <input
              type="text"
              onChange={(e) => {}}
            />
          </Inputcontainer>
          <Inputcontainer>
            <label>Stock*</label>
            <input
              type="text"
              onChange={(e) => {}}
            />
          </Inputcontainer>
        </TwoColumns>
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
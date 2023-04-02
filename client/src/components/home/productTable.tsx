import React from 'react'
import styled from 'styled-components';
import { useData } from '../../context/data'
import { MiniIconButton } from '../../style/buttons';
import { Table } from '../../style/table'

const ProductTable = () => {
  const { products } = useData();

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th className='thpadding'>Precio</th>
            <th className='thpadding'>Descuento</th>
            <th className='thpadding'>Talla</th>
            <th className='thpadding'>Stock</th>
            <th className='thpadding'>Categorías</th>
            <th>Estado</th>
            <th>Controles</th>
          </tr>
        </thead>
        <tbody>
        {products.map((product, i) => (
          <tr key={product.id}>
            <td><img src={product.photo} alt={`productPhoto${product.id}`} /></td>
            <td style={{ maxWidth: "15rem" }}>{product.name}</td>
            <td className='center'>{product.price} Bs.</td>
            <td className='center'>{product.discount ? product.discount + " Bs." : "N/A"}</td>
            <td className='center'>{product.size ? product.size : "N/A"}</td>
            <td className='center'>{product.stock}</td>
            <td className='center padding'>{product.categories?.length} seleccionado(s).</td>
            <td>{product.clients?.length ? "Vendido" : "Disponible"}</td>
            <td className='center'>
              <ColumnContainer>
                <RowContainer>
                  <MiniIconButton><i className="fa-solid fa-pencil"></i></MiniIconButton>
                  <MiniIconButton><i className="fa-solid fa-trash"></i></MiniIconButton>
                </RowContainer>
                <RowContainer>
                  <MiniIconButton><i className="fa-solid fa-cart-shopping"></i></MiniIconButton>
                </RowContainer>
              </ColumnContainer>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
    </TableContainer>
  )
}

export default ProductTable

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const RowContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const TableContainer = styled.div`
  width: 100%;
  overflow: auto;
`;
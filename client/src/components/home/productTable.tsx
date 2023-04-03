import React from 'react'
import styled from 'styled-components';
import { useData } from '../../context/data'
import { Product } from '../../interfaces/product';
import { deleteProduct } from '../../services/product';
import { MiniIconButton } from '../../style/buttons';
import { Table } from '../../style/table'
import { ProductForm } from './productCrud';

interface Props {
  setForm: React.Dispatch<React.SetStateAction<ProductForm>>
}

const ProductTable = ({ setForm }: Props) => {
  const { products, removeProduct } = useData();

  const handleDelete = async (id: number) => {
    const res = await deleteProduct(id);
    removeProduct(res.data);
  }

  const handleEdit = async (product: Product) => {
    const container = document.querySelector("#home");
    if(container) container.scrollTop = 0;

    setForm({
      id: product.id,
      name: product.name || "",
      price: String(product.price) || "",
      discount: product.discount ? String(product.discount) : "0",
      size: product.size ? String(product.size) : "",
      stock: String(product.stock),
      categories: product.categories ? product.categories.map(category => category.id) : [],
      photo: null,
      photoName: ""
    });
  }

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
                  <MiniIconButton onClick={() => handleEdit(product)}><i className="fa-solid fa-pencil"></i></MiniIconButton>
                  <MiniIconButton onClick={() => handleDelete(product.id)}><i className="fa-solid fa-trash"></i></MiniIconButton>
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
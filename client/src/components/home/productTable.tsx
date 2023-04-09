import React, { useState } from 'react'
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { useData } from '../../context/data'
import { Product } from '../../interfaces/product';
import { deleteProduct } from '../../services/product';
import { LoadingIcon, MiniIconButton } from '../../style/buttons';
import { Table } from '../../style/table'
import { ProductForm } from './productCrud';
import { HomePage } from '../../interfaces/homePage';

interface Props {
  form: ProductForm
  setForm: React.Dispatch<React.SetStateAction<ProductForm>>
  initialForm: ProductForm
  setSelectedSale: React.Dispatch<React.SetStateAction<Product | null>>
  selectedSale: Product | null
  setPage: React.Dispatch<React.SetStateAction<HomePage>>
}

const ProductTable = ({ setForm, form, initialForm, setSelectedSale, selectedSale, setPage }: Props) => {
  const { products, removeProduct } = useData();
  const [loadingDelete, setLoadingDelete] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    setLoadingDelete(id);
    const res = await deleteProduct(id);
    removeProduct(res.data);
    if(form.id === id) {
      setForm(initialForm);
    }
    setLoadingDelete(null);
    Swal.fire({
      title: "Petición correcta",
      text: "Se eliminó el producto correctamente.",
      icon: "success"
    });
  }

  const handleEdit = async (product: Product) => {
    const container = document.querySelector("#home");
    if(container) container.scrollTop = 0;
    const quantitySold = product?.clients?.reduce((ac, sale) => ac + sale.amount, 0) || 0;
    const stock = (product.stock) && product.stock - quantitySold;
    
    setForm({
      id: product.id,
      name: product.name || "",
      price: String(product.price) || "",
      discount: product.discount ? String(product.discount) : "0",
      size: product.size ? String(product.size) : "",
      stock: String(stock),
      quantitySold: quantitySold,
      categories: product.categories ? product.categories.map(category => category.id) : [],
      photo: null,
      photoPreview: product.photo || ""
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
        {products.map((product, i) => {
          const stock = (product.stock && product.clients) && product.stock - product?.clients?.reduce((ac, sale) => ac + sale.amount, 0);
          return (
            <tr key={product.id}>
              <td><img src={product.photo} alt={`productPhoto${product.id}`} /></td>
              <td style={{ maxWidth: "15rem" }}>{product.name}</td>
              <td className='center'>{product.price} Bs.</td>
              <td className='center'>{product.discount ? product.discount + " Bs." : "N/A"}</td>
              <td className='center'>{product.size ? product.size : "N/A"}</td>
              <td className='center'>{stock}</td>
              <td className='center padding'>{product.categories?.length} seleccionado(s).</td>
              <td>{stock ? "Disponible" : "Agotado"}</td>
              <td className='center'>
                <ColumnContainer>
                  <RowContainer>
                    <MiniIconButton 
                      onClick={() => handleEdit(product)}
                      disabled={form.id === product.id}
                    ><i className="fa-solid fa-pencil"></i></MiniIconButton>
                    <MiniIconButton 
                      onClick={() => handleDelete(product.id)}
                      disabled={loadingDelete === product.id}
                    >
                      {loadingDelete === product.id ? <LoadingIcon /> : <i className="fa-solid fa-trash"></i>}
                    </MiniIconButton>
                  </RowContainer>
                  <RowContainer>
                    <MiniIconButton 
                      onClick={() => {
                        setSelectedSale(product);
                        setPage("sales");
                      }}
                      disabled={selectedSale?.id === product.id}
                    >
                      <i className="fa-solid fa-cart-shopping"></i>
                    </MiniIconButton>
                  </RowContainer>
                </ColumnContainer>
              </td>
            </tr>
          )
        })}
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
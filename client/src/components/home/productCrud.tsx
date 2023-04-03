import { useState } from 'react'
import styled from 'styled-components'
import { useData } from '../../context/data'
import useCloudinary from '../../hooks/useCloudinary'
import { postProduct, putProduct } from '../../services/product'
import { Button } from '../../style/buttons'
import { Inputcontainer, InputNumber, SelectContainer } from '../../style/input'
import Loading from '../global/loading'
import CategorySelector from './categorySelector'
import PageTemplate from './pageTemplate'
import ProductTable from './productTable'

export interface ProductForm {
  id: number | null;
  name: string;
  photoName: string;
  photo: File | null;
  price: string;
  discount: string;
  size: string;
  stock: string;
  categories: number[];
}

const initialForm = {
  id: null,
  name: "",
  photoName: "",
  photo: null,
  price: "35",
  discount: "0",
  size: "",
  stock: "1",
  categories: []
}

const ProductCrud = () => {
  const { sendCloudinary, progress, resetProgress } = useCloudinary();
  const { addProduct, editProduct } = useData();
  const [form, setForm] = useState<ProductForm>(initialForm);
  const { loadingIndex } = useData();

  const handleSend = async () => {
    if(!form.id) {
      if(form.photo) {
        const cloudinaryRes: any = await sendCloudinary(form.photo);
        const res = await postProduct({
          ...form,
          photo: cloudinaryRes.url
        });
        addProduct(res.data);
      }
    } else {
      const res = await putProduct({
        ...form,
        photo: null
      });
      console.log(res);
      editProduct(res.data);
    }

    setForm(initialForm);
    resetProgress();
  }

  return (
    <PageTemplate 
      title={form.id ? "Editar producto" : "Añadir producto"}
      form={form}
      setForm={setForm}
      initialForm={initialForm}
    >
      <div className="inputsContainer">
        <Inputcontainer>
          <label>Nombre*</label>
          <input type="text" 
            value={form.name} 
            onChange={(e) => setForm(old => ({...old, name: e.target.value }))} 
          />
        </Inputcontainer>
        <Inputcontainer>
          <label>Foto*</label>
          <div className='input-relative'>
            <input 
              type="file" 
              accept='.jpg,.png,.jpeg' 
              value={form.photoName} 
              onChange={(e) => setForm(old => ({
                ...old, 
                photoName: e.target.value,
                photo: e.target.files ? e.target.files[0] : null
              }))} 
            />
            <progress max="100" value={progress} />
          </div>
        </Inputcontainer>
        <TwoColumns>
          <InputNumber name='Precio*' state={form.price} setState={() => {}} 
            handleChange={(e) => setForm(old => ({...old, price: e.target.value }))}
            handlePlus={() => setForm(old => ({...old, price: String(Number(old.price) + 1)}))}
            handleMinus={() => setForm(old => ({...old, price: String(Number(old.price) - 1)}))}
          />
          <InputNumber name='Descuento' state={form.discount} setState={() => {}} 
            handleChange={(e) => setForm(old => ({...old, discount: e.target.value }))}
            handlePlus={() => setForm(old => ({...old, discount: String(Number(old.discount) + 1)}))}
            handleMinus={() => setForm(old => ({...old, discount: String(Number(old.discount) - 1)}))}
          />
        </TwoColumns>
        <TwoColumns>
          <SelectContainer>
            <label>Talla</label>
            <select value={form.size} onChange={(e) => setForm(old => ({...old, size: e.target.value}))} >
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
          <InputNumber name='Stock*' state={form.stock} setState={() => {}} 
            handleChange={(e) => setForm(old => ({...old, stock: e.target.value }))}
            handlePlus={() => setForm(old => ({...old, stock: String(Number(old.stock) + 1)}))}
            handleMinus={() => setForm(old => ({...old, stock: String(Number(old.stock) - 1)}))}
          />
        </TwoColumns>
        <Inputcontainer>
          <label>Categorías</label>
          <CategorySelector form={form} setForm={setForm} />
        </Inputcontainer>
        <Button onClick={handleSend}>{form.id ? "Editar" : "Añadir"}</Button>
      </div>
      {
        loadingIndex ?
        <Loading /> :
        <ProductTable setForm={setForm} />
      }
    </PageTemplate>
  )
}

export default ProductCrud

const TwoColumns = styled.div`
  display: flex;
  gap: 1rem;
`;
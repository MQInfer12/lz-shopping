import { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useData } from "../../context/data";
import useCloudinary from "../../hooks/useCloudinary";
import { postProduct, putProduct } from "../../services/product";
import { Button } from "../../style/buttons";
import {
  Inputcontainer,
  InputNumber,
  SelectContainer,
} from "../../style/input";
import Loading from "../global/loading";
import CategorySelector from "./categorySelector";
import PageTemplate from "./pageTemplate";
import ProductTable from "./productTable";
import Placeholder from "../../assets/placeholder.png";
import { Product } from "../../interfaces/product";

export interface ProductForm {
  id: number | null;
  name: string;
  photo: File | null;
  photoPreview: string;
  price: string;
  discount: string;
  size: string;
  stock: string;
  categories: number[];
}

const initialForm = {
  id: null,
  name: "",
  photo: null,
  photoPreview: "",
  price: "35",
  discount: "0",
  size: "",
  stock: "1",
  categories: [],
};

interface Props {
  selectedSale: Product | null
  setSelectedSale: React.Dispatch<React.SetStateAction<Product | null>>
}

const ProductCrud = ({ setSelectedSale, selectedSale }: Props) => {
  const { sendCloudinary, progress, resetProgress } = useCloudinary();
  const { addProduct, editProduct } = useData();
  const [form, setForm] = useState<ProductForm>(initialForm);
  const { loadingIndex } = useData();
  const [loading, setLoading] = useState(false);

  const changeInputFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let dataUrl: string = "";
    let file: File;
    if(e.target.files) {
      file = e.target.files[0];
      dataUrl = await readFile(file) as string;
    }
    setForm((old) => {
      return {
        ...old,
        photo: file || null,
        photoPreview: dataUrl
      }}
    );
  }

  const readFile = async (file: File) => {
    return new Promise((res, rej) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener("load", () => {
        res(fileReader.result);
      })
    });
  }

  const handleSend = async () => {
    setLoading(true);
    let cloudinaryRes: any;
    if (form.photo) {
      cloudinaryRes = await sendCloudinary(form.photo);
    }
    if (!form.id) {
      const res = await postProduct({
        ...form,
        photo: cloudinaryRes.url,
        photoPreview: ""
      });
      addProduct(res.data);
    } else {
      const res = await putProduct({
        ...form,
        photo: cloudinaryRes?.url,
        photoPreview: ""
      });
      editProduct(res.data);
    }
    setForm(initialForm);
    resetProgress();
    setLoading(false);
    Swal.fire({
      title: "Petición correcta",
      text: `Se ${form.id ? "editó" : "añadió"} el producto correctamente.`,
      icon: "success"
    });
  };

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
          <input
            type="text"
            value={form.name}
            onChange={(e) =>
              setForm((old) => ({ ...old, name: e.target.value }))
            }
          />
        </Inputcontainer>
        <img src={form.photoPreview || Placeholder} />
        <Inputcontainer>
          <label>Foto*</label>
          <div className="input-relative">
            <input
              type="file"
              accept=".jpg,.png,.jpeg"
              onChange={(e) => changeInputFile(e)}
            />
            <progress max="100" value={progress} />
          </div>
        </Inputcontainer>
        <TwoColumns>
          <InputNumber
            name="Precio*"
            state={form.price}
            setState={() => {}}
            handleChange={(e) =>
              setForm((old) => ({ ...old, price: e.target.value }))
            }
            handlePlus={() =>
              setForm((old) => ({
                ...old,
                price: String(Number(old.price) + 1),
              }))
            }
            handleMinus={() =>
              setForm((old) => ({
                ...old,
                price: String(Number(old.price) - 1),
              }))
            }
          />
          <InputNumber
            name="Descuento"
            state={form.discount}
            setState={() => {}}
            handleChange={(e) =>
              setForm((old) => ({ ...old, discount: e.target.value }))
            }
            handlePlus={() =>
              setForm((old) => ({
                ...old,
                discount: String(Number(old.discount) + 1),
              }))
            }
            handleMinus={() =>
              setForm((old) => ({
                ...old,
                discount: String(Number(old.discount) - 1),
              }))
            }
          />
        </TwoColumns>
        <TwoColumns>
          <SelectContainer>
            <label>Talla</label>
            <select
              value={form.size}
              onChange={(e) =>
                setForm((old) => ({ ...old, size: e.target.value }))
              }
            >
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
            name="Stock*"
            state={form.stock}
            setState={() => {}}
            handleChange={(e) =>
              setForm((old) => ({ ...old, stock: e.target.value }))
            }
            handlePlus={() =>
              setForm((old) => ({
                ...old,
                stock: String(Number(old.stock) + 1),
              }))
            }
            handleMinus={() =>
              setForm((old) => ({
                ...old,
                stock: String(Number(old.stock) - 1),
              }))
            }
          />
        </TwoColumns>
        <Inputcontainer>
          <label>Categorías</label>
          <CategorySelector form={form} setForm={setForm} />
        </Inputcontainer>
        <Button disabled={loading} onClick={handleSend}> 
          {loading ? "Cargando..." : form.id ? "Editar" : "Añadir"}
        </Button>
      </div>
      {loadingIndex ? 
        <Loading /> : 
        <ProductTable  
          initialForm={initialForm} 
          form={form} 
          setForm={setForm} 
          setSelectedSale={setSelectedSale}
          selectedSale={selectedSale}
        />
      }
    </PageTemplate>
  );
};

export default ProductCrud;

const TwoColumns = styled.div`
  display: flex;
  gap: 1rem;
`;

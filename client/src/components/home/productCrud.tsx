import { useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useData } from "../../context/data";
import useCloudinary from "../../hooks/useCloudinary";
import { postProduct, putProduct } from "../../services/product";
import { Button } from "../../style/buttons";
import { Inputcontainer, SelectContainer } from "../../style/input";
import Loading from "../global/loading";
import CategorySelector from "./categorySelector";
import PageTemplate from "./pageTemplate";
import ProductTable from "./productTable";
import Placeholder from "../../assets/placeholder.png";
import { Product } from "../../interfaces/product";
import { HomePage } from "../../interfaces/homePage";
import InputText from "../global/inputText";
import InputNumber from "../global/inputNumber";
import { InputSelect } from "../global/inputSelect";

export interface ProductForm {
  id: number | null;
  name: string | null;
  photo: File | null;
  photoPreview: string;
  price: string;
  discount: string;
  size: string;
  stock: string;
  quantitySold: number;
  categories: number[];
}

const initialForm = {
  id: null,
  name: null,
  photo: null,
  photoPreview: "",
  price: "35",
  discount: "0",
  size: "",
  stock: "1",
  quantitySold: 0,
  categories: [],
};

interface Props {
  selectedSale: Product | null;
  setSelectedSale: React.Dispatch<React.SetStateAction<Product | null>>;
  setPage: React.Dispatch<React.SetStateAction<HomePage>>;
}

const ProductCrud = ({ setSelectedSale, selectedSale, setPage }: Props) => {
  const { sendCloudinary, progress, resetProgress } = useCloudinary();
  const { addProduct, editProduct } = useData();
  const [form, setForm] = useState<ProductForm>(initialForm);
  const { loadingIndex } = useData();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const checkNulls = () => {
    const nullErrors: any = {};
    if (form.name === null) {
      nullErrors.name = "Este espacio es requerido";
      setForm((old) => ({ ...old, name: "" }));
    }
    if (form.photo === null && !form.id) {
      nullErrors.img = "Este espacio es requerido";
    }
    return nullErrors;
  };

  const checkErrors = () => {
    let newErrors: any = {};
    if (form.name != null && !form.name.trim()) {
      newErrors.name = "Este espacio es requerido";
    }
    if (!form.price.trim()) {
      newErrors.price = "Este espacio es requerido";
    } else if (Number(form.price) <= 0) {
      newErrors.price = "Este precio no es válido";
    }
    if (Number(form.discount) >= Number(form.price)) {
      newErrors.discount = "El descuento tiene que ser menor que el precio";
    }
    if (Number(form.discount) < 0) {
      newErrors.discount = "Este descuento no es válido";
    }
    if (!form.stock.trim()) {
      newErrors.stock = "Este espacio es requerido";
    } else if (Number(form.stock) < 0) {
      newErrors.stock = "El stock tiene que ser cero o más";
    }
    return newErrors;
  };

  const changeInputFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let dataUrl: string = "";
    let file: File;
    if (e.target.files) {
      file = e.target.files[0];
      dataUrl = (await readFile(file)) as string;
    }
    setForm((old) => {
      return {
        ...old,
        photo: file || null,
        photoPreview: dataUrl,
      };
    });
  };

  const readFile = async (file: File) => {
    return new Promise((res, rej) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener("load", () => {
        res(fileReader.result);
      });
    });
  };

  const handleSend = async () => {
    const nullErrors = checkNulls();
    if (!Object.keys(nullErrors).length && !Object.keys(errors).length) {
      setLoading(true);
      let cloudinaryRes: any;
      if (form.photo) {
        cloudinaryRes = await sendCloudinary(form.photo);
      }
      if (!form.id) {
        const res = await postProduct({
          ...form,
          photo: cloudinaryRes.url,
          photoPreview: "",
        });
        addProduct(res.data);
      } else {
        const res = await putProduct({
          ...form,
          stock: String(Number(form.stock) + form.quantitySold),
          photo: cloudinaryRes?.url,
          photoPreview: "",
        });
        editProduct(res.data);
      }
      setForm(initialForm);
      resetProgress();
      setLoading(false);
      Swal.fire({
        title: "Petición correcta",
        text: `Se ${form.id ? "editó" : "añadió"} el producto correctamente.`,
        icon: "success",
      });
    } else {
      setErrors({ ...checkNulls(), ...checkErrors() });
      Swal.fire({
        title: "Error al enviar",
        text: "Comprueba que no existan errores en el formulario.",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    setErrors(checkErrors());
  }, [form]);

  return (
    <PageTemplate
      title={form.id ? "Editar producto" : "Añadir producto"}
      form={form}
      setForm={setForm}
      initialForm={initialForm}
    >
      <div className="inputsContainer">
        <label
          className={`img-wrapper${errors.img ? " img-error" : ""}`}
          htmlFor="formFile"
        >
          <img src={form.photoPreview || Placeholder} />
          <progress max="100" value={progress} />
          <Inputcontainer hide>
            <label>Foto*</label>
            <div className="input-relative">
              <input
                type="file"
                id="formFile"
                accept=".jpg,.png,.jpeg"
                onChange={(e) => changeInputFile(e)}
              />
            </div>
          </Inputcontainer>
        </label>
        <InputText
          text="Nombre*"
          state={form.name || ""}
          handleChange={(e) =>
            setForm((old) => ({ ...old, name: e.target.value }))
          }
          error={errors.name}
        />
        <div className="two-columns">
          <InputNumber
            name="Precio*"
            state={form.price}
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
            error={errors.price}
          />
          <InputNumber
            name="Descuento"
            state={form.discount}
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
            error={errors.discount}
          />
        </div>
        <div className="two-columns">
          <InputSelect
            text="Talla"
            state={form.size}
            handleChange={(e) =>
              setForm((old) => ({ ...old, size: e.target.value }))
            }
            options={[
              { text: "Sin talla", value: "" },
              { text: "XS", value: "XS" },
              { text: "S", value: "S" },
              { text: "M", value: "M" },
              { text: "L", value: "L" },
              { text: "XL", value: "XL" },
              { text: "XXL", value: "XXL" },
              { text: "XXXL", value: "XXXL" },
            ]}
          />
          {/* <InputNumber
            name="Stock*"
            state={form.stock}
            handleChange={(e) => setForm((old) => ({ ...old, stock: e.target.value }))}
            handlePlus={() => setForm((old) => ({...old, stock: String(Number(old.stock) + 1)}))}
            handleMinus={() => setForm((old) => ({...old, stock: String(Number(old.stock) - 1)}))}
            error={errors.stock}
          /> */}
        </div>
        <Inputcontainer>
          <label>Categorías</label>
          <CategorySelector form={form} setForm={setForm} />
        </Inputcontainer>
        <Button disabled={loading} onClick={handleSend}>
          {loading ? "Cargando..." : form.id ? "Editar" : "Añadir"}
        </Button>
      </div>
      {loadingIndex ? (
        <Loading />
      ) : (
        <ProductTable
          setPage={setPage}
          initialForm={initialForm}
          form={form}
          setForm={setForm}
          setSelectedSale={setSelectedSale}
          selectedSale={selectedSale}
        />
      )}
    </PageTemplate>
  );
};

export default ProductCrud;

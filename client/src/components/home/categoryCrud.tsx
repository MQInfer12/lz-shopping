import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useData } from "../../context/data";
import { postCategory } from "../../services/category";
import { Button } from "../../style/buttons";
import Loading from "../global/loading";
import CategoryTable from "./categoryTable";
import PageTemplate from "./pageTemplate";
import InputText from "../global/inputText";

const CategoryCrud = () => {
  const { addCategory, loadingIndex } = useData();
  const [name, setName] = useState<string | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const checkNulls = () => {
    const nullErrors: any = {};
    if(name === null) {
      nullErrors.name = "Este espacio es requerido";
    }
    return nullErrors;
  }

  const checkErrors = () => {
    let newErrors: any = {};
    if(name != null && !name.trim()) {
      newErrors.name = "Este espacio es requerido";
    }
    return newErrors;
  }

  const handlesend = async () => {
    const nullErrors = checkNulls();
    if(!Object.keys(nullErrors).length && !Object.keys(errors).length) {
      setLoading(true);
      const res = await postCategory(name || "");
      addCategory(res.data);
      setName(null);
      setLoading(false);
      Swal.fire({
        title: "Petición correcta",
        text: "Se añadió la categoría correctamente.",
        icon: "success"
      });
    } else {
      setErrors({...checkNulls(), ...checkErrors()});
      Swal.fire({
        title: "Error al enviar",
        text: "Comprueba que no existan errores en el formulario.",
        icon: "error"
      });
    }
  };

  useEffect(() => {
    setErrors(checkErrors());
  }, [name]);
  
  return (
    <PageTemplate title="Añadir categoría">
      <div className="inputsContainer">
        <InputText 
          text="Nombre*"
          handleChange={(e) => setName(e.target.value)}
          state={name || ""}
          error={errors.name}
        />
        <Button disabled={loading} onClick={handlesend}>{loading ? "Cargando..." : "Añadir"}</Button>
      </div>
      {
        loadingIndex ?
        <Loading /> :
        <CategoryTable />
      }
    </PageTemplate>
  );
};

export default CategoryCrud;
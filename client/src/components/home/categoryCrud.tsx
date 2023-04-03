import { useState } from "react";
import { useData } from "../../context/data";
import { postCategory } from "../../services/category";
import { Button } from "../../style/buttons";
import { Inputcontainer } from "../../style/input";
import Loading from "../global/loading";
import CategoryTable from "./categoryTable";
import PageTemplate from "./pageTemplate";

const CategoryCrud = () => {
  const { addCategory, loadingIndex } = useData();
  const [name, setName] = useState("");

  const handlesend = async () => {
    const res = await postCategory(name);
    addCategory(res.data);
    setName('');
  };
  
  return (
    <PageTemplate title="Añadir categoría">
      <div className="inputsContainer">
        <Inputcontainer>
          <label>Nombre*</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Inputcontainer>
        <Button onClick={handlesend}>Añadir</Button>
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
import React, { useEffect, useState } from "react";
import { useData } from "../context/data";
import { deleteCategory, postCategory } from "../services/category";
const Crud = () => {
  const [name, setName] = useState("");
  const { fillProductsAndCategories, categories, addCategory, removeCategory } =
    useData();
  useEffect(() => {
    fillProductsAndCategories();
  }, []);
  const handlesend = async () => {
    const res = await postCategory(name);
    addCategory(res.data);
    setName("");
  };
  const handledelete = async (id: number) => {
    const res = await deleteCategory(id);
    removeCategory(res.data);
  };
  return (
    <>
      <div>
        <div>
          <label htmlFor="">Categoria</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handlesend}>Agregar</button>
        </div>
        {categories.map((v, i) => (
          <div key={v.id}>
            <p>{v.name}</p>
            <button
              onClick={() => {
                handledelete(v.id);
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
      <div>
        <label htmlFor="">Producto</label>
        <input type="text" placeholder="Name" />
        <input type="number" placeholder="Price" />
        <input type="number" placeholder="Stock" />
        <input type="file" />
        <img src="" alt="" />
        <button>Agregar</button>
      </div>
    </>
  );
};

export default Crud;

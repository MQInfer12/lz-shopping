import { useState } from 'react';
import Swal from 'sweetalert2';
import { useData } from '../../context/data'
import { deleteCategory } from '../../services/category';
import { LoadingIcon, MiniIconButton } from '../../style/buttons';
import { Table } from '../../style/table';

const CategoryTable = () => {
  const { categories, removeCategory } = useData();
  const [loadingDelete, setLoadingDelete] = useState<number | null>(null);

  const handledelete = async (id: number) => {
    setLoadingDelete(id);
    const res = await deleteCategory(id);
    removeCategory(res.data);
    setLoadingDelete(null);
    Swal.fire({
      title: "Petición correcta",
      text: "Se eliminó la categoría correctamente.",
      icon: "success"
    });
  };

  return (
    <Table>
      <thead>
        <tr>
          <th style={{ width: "16rem" }}>Nombre</th>
          <th style={{ width: "6rem" }}>Controles</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((v, i) => (
          <tr key={v.id}>
            <td style={{ maxWidth: "16rem" }}>{v.name}</td>
            <td className="center">
              <MiniIconButton
                onClick={() => {
                  handledelete(v.id);
                }}
                disabled={loadingDelete === v.id}
              >
                {loadingDelete === v.id ? <LoadingIcon /> : <i className="fa-solid fa-trash"></i> }
              </MiniIconButton>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default CategoryTable
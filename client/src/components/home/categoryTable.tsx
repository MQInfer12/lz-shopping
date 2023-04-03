import styled from 'styled-components';
import { useData } from '../../context/data'
import { deleteCategory } from '../../services/category';
import { IconButton, MiniIconButton } from '../../style/buttons';
import { Table } from '../../style/table';

const CategoryTable = () => {
  const { categories, removeCategory } = useData();

  const handledelete = async (id: number) => {
    const res = await deleteCategory(id);
    removeCategory(res.data);
  };

  return (
    <Table>
      <thead>
        <tr>
          <th style={{ width: "18rem" }}>Nombre</th>
          <th style={{ width: "6rem" }}>Controles</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((v, i) => (
          <tr key={v.id}>
            <td>{v.name}</td>
            <td className="center">
              <MiniIconButton
                onClick={() => {
                  handledelete(v.id);
                }}
              ><i className="fa-solid fa-trash"></i></MiniIconButton>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default CategoryTable
import styled from 'styled-components'
import { useCloth } from '../../context/cloth';
import { useData } from '../../context/data';
import { colors } from '../../style/variables'

const Categories = () => {
  const { categories } = useData();
  const { categoriesSelected, selectCategory, emptyCategories } = useCloth();

  return (
    <CategoriesContainer>
      <div>
        <CategorieButton 
          onClick={emptyCategories}
          active={!categoriesSelected.length}
        >Ver todos</CategorieButton>
        {
          categories.map((v, i) => (
            <CategorieButton 
              key={v.id} 
              onClick={() => selectCategory(v)}
              active={categoriesSelected.includes(v)}
            >{v.name}</CategorieButton>
          ))
        }
      </div>
    </CategoriesContainer>
  )
}

export default Categories

const CategoriesContainer = styled.div`
  overflow: auto;
  padding-bottom: 0.2rem;
  display: flex;
  min-height: 3.5rem;

  & > div {
    display: flex;
    gap: 1rem;
    margin: auto;
  }

  &::-webkit-scrollbar {
    width: .375rem;
    height: .375rem;
  }
  &::-webkit-scrollbar-track {
    background: ${colors.gray200};
    border-radius: .1875rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.primary500};
    border-radius: .1875rem;
  }
`;

interface CategoriesButtonProps {
  active: boolean
}

const CategorieButton = styled.button<CategoriesButtonProps>`
  font-size: 1rem;
  padding: .75rem 1rem;
  color: ${colors.white};
  background-color: ${props => props.active ? colors.primary500 : colors.primary300};
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;
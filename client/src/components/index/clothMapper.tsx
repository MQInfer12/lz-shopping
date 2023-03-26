import styled from 'styled-components'
import { useCloth } from '../../context/cloth'
import { useData } from '../../context/data'
import { colors } from '../../style/variables'
import ClothCard from './clothCard'

const ClothMapper = () => {
  const { products: productJson } = useData();
  const { categoriesSelected, search, focused } = useCloth();

  const filterByCategories = () => {
    if((focused || search)) {
      return productJson.filter(product => product.name?.toLowerCase().includes(search.toLowerCase()));
    }

    if(!categoriesSelected.length) return productJson;

    const filtered = productJson.filter(product => {
      let productFlag = false;
      product.categories?.forEach(category => {
        const idCategoriesSelected: number[] = categoriesSelected.map(category => category.id);
        if(idCategoriesSelected.includes(category.id)) {
          productFlag =  true
        };
      })
      return productFlag;
    });

    return filtered;
  }

  return (
    <ClothContainer>
      {
        filterByCategories().map((v, i) => (
          <ClothCard key={v.id} product={v} />
        ))
      }
      {
        !filterByCategories().length && 
        <CenterText>
          <p>Pronto tendremos productos en este apartado ♡</p>
        </CenterText>
      }
    </ClothContainer>
   )
}

export default ClothMapper

const ClothContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;

  @media screen and (max-width: 1110px) {
    justify-content: space-around;
  }
`;

const CenterText = styled.div`
  width: 100%;
  height: 5rem;
  font-size: 1.2rem;
  color: ${colors.gray400};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
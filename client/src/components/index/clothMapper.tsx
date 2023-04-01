import styled from 'styled-components'
import { useCloth } from '../../context/cloth'
import { useData } from '../../context/data'
import { colors } from '../../style/variables'
import ClothCard from './clothCard'
import { Product } from '../../interfaces/product'

interface Props {
  products?: Product[]
}

const ClothMapper = ({ products }: Props) => {
  const { products: productJson } = useData();
  const { categoriesSelected, search, sizeSearch, focused } = useCloth();

  const filterByCategories = () => {
    if(focused) {
      return productJson
        .filter(product => product.name?.toLowerCase().includes(search.toLowerCase()))
        .filter(product => sizeSearch ? product.size === sizeSearch : true);
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
    }).filter(product => product.size?.includes(sizeSearch));

    return filtered;
  }

  return (
    <ClothContainer>
      {
        products ?
        products.map((product, i) => (
          <ClothCard key={product.id} product={product} />
        )) :
        <>
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
        </>
      }
    </ClothContainer>
   )
}

export default ClothMapper

const ClothContainer = styled.div`
  max-width: 1300px;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: space-around;

  @media screen and (max-width: 450px) {
    gap: 1rem;
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
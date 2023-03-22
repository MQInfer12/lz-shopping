import React from 'react'
import styled from 'styled-components'
import { useCloth } from '../../context/cloth'
import ClothCard from './clothCard'
import productJson from './data/cloths.json'

const ClothMapper = () => {
  const { categoriesSelected } = useCloth();

  const filterByCategories = () => {
    if(!categoriesSelected.length) return productJson;

    const filtered = productJson.filter(product => {
      let productFlag = false;
      product.categories.forEach(category => {
        const idCategoriesSelected: (number | undefined)[] = categoriesSelected.map(category => category.id);
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
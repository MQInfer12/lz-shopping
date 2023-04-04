import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from '../style/buttons'
import { colors } from '../style/variables'
import CategoryCrud from '../components/home/categoryCrud'
import { useUser } from '../context/user'
import { HomePage } from '../interfaces/homePage'
import PageButtons from '../components/home/pageButtons'
import ProductCrud from '../components/home/productCrud'
import { useData } from '../context/data'
import SalesCrud from '../components/home/salesCrud'

const Home = () => {
  const [page, setPage] = useState<HomePage>("sales");
  const { deactivateAdmin } = useUser();
  const { fillProductsAndCategories } = useData();

  useEffect(() => {
    fillProductsAndCategories();
  }, []);

  return (
    <HomePageContainer>
      <Button onClick={deactivateAdmin}>Cerrar sesión</Button>
      <PageButtons page={page} setPage={setPage} />
      {
        page === "product" ? <ProductCrud /> :
        page === "category" ? <CategoryCrud />:
        page === "sales" && <SalesCrud/> 
      }
    
    </HomePageContainer>
  )
}

export default Home

const HomePageContainer = styled.div`
  min-height: calc(100dvh - 56px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.gray50};
  padding: 1rem;
  gap: 2.5rem;
`;
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
import { Product } from '../interfaces/product'
import { useParams } from 'react-router-dom'
import decipher from '../utilities/decipher'

const Home = () => {
  const [page, setPage] = useState<HomePage>("product");
  const [selectedSale, setSelectedSale] = useState<Product | null>(null);
  const { deactivateAdmin } = useUser();
  const { products, fillProductsAndCategories } = useData();
  const { idProduct, quantity, ci } = useParams();

  useEffect(() => {
    fillProductsAndCategories();
  }, []);

  useEffect(() => {
    products.forEach((product, i) => {
      if(product.id === selectedSale?.id) {
        setSelectedSale(product);
      }
    });
  }, [products])

  useEffect(() => {
    if(products && idProduct) {
      const id = Number(decipher(idProduct));
      const product = products.find(product => product.id === id);
      if(product) {
        setSelectedSale(product);
        setPage("sales");
      }
    }
  }, [products]);

  return (
    <HomePageContainer>
      <Button onClick={deactivateAdmin}>Cerrar sesión</Button>
      <PageButtons selectedSale={selectedSale} page={page} setPage={setPage} />
      {
        page === "product" ? <ProductCrud setPage={setPage} setSelectedSale={setSelectedSale} selectedSale={selectedSale} /> :
        page === "category" ? <CategoryCrud />:
        page === "sales" && <SalesCrud quantity={decipher(quantity || "")} ci={ci} selectedSale={selectedSale} /> 
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
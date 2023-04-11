import { useEffect } from "react";
import styled from "styled-components"
import Cloths from "../components/index/cloths";
import Selected from "../components/index/selected";
import { useData } from "../context/data";
import { useParams } from "react-router-dom";
import { useCloth } from "../context/cloth";
import decipher from "../utilities/decipher";

const Index = () => {
  const { idProduct } = useParams();
  const { products, fillProductsAndCategories } = useData();
  const { selectCloth } = useCloth();

  useEffect(() => {
    if(products && idProduct) {
      const id = Number(decipher(idProduct));
      const product = products.find(product => product.id === id);
      if(product) selectCloth(product);
    }
  }, [products]);

  useEffect(() => {
    fillProductsAndCategories();
  }, []);

  return (
    <TwoColumns>
      <Cloths />
      <Selected />
    </TwoColumns>
  )
}

export default Index

const TwoColumns = styled.div`
  display: flex;
  position: relative;
`;
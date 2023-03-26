import { useEffect } from "react";
import styled from "styled-components"
import Cloths from "../components/index/cloths";
import Selected from "../components/index/selected";
import { useData } from "../context/data";

const Index = () => {
  const { fillProductsAndCategories } = useData();

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
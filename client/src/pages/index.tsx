import styled from "styled-components"
import Cloths from "../components/index/cloths";
import Selected from "../components/index/selected";

const Index = () => {
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
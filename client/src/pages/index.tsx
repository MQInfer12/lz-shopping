import styled from "styled-components"
import Cloths from "../components/index/cloths";

const Index = () => {
  return (
    <TwoColumns>
      <Cloths />
      <div className='right'>Right</div>
    </TwoColumns>
  )
}

export default Index

const TwoColumns = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
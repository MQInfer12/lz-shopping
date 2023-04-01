import React from "react";
import styled from "styled-components";


const Crud = () => {
  return (
    <Container>
      <Botonadd>
        <button></button>
      </Botonadd>
      <div>
        <label htmlFor="">Categoria</label>
        <input type="text" />
        <button>Agregar</button>
      </div>
      <div>
        <label htmlFor="">Producto</label>
        <div>
          <input type="text" />
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">0</label>
          <input type="text" />
        </div>
        <div>
          <img src="" alt="" />
        </div>
      </div>
    </Container>
  );
};

export default Crud;

const Container=styled.div`
  width:100%;
  height:100%;
`;
const Botonadd=styled.div`
  width:100%;
  height:20%;
  background: #000;
  
`
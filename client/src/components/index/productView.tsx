import { useState } from "react";
import styled from "styled-components";
import { useCloth } from "../../context/cloth";
import { colors } from "../../style/variables";

interface Props {
  viewImage: boolean;
  setViewImage: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductView = ({ setViewImage, viewImage }: Props) => {
  const { selected: product } = useCloth();

  const categories: string[] =
    product?.categories?.map((categorie) => categorie.name) || [];

  const agotado = product?.stock === 0;

  return (
    <ProductViewContainer>
      <div
        onClick={() => setViewImage((old) => !old)}
        className={`img-container${viewImage ? " fullscreen" : ""}`}
      >
        <img src={product?.photo} />
      </div>
      <div className="desc-container">
        <small>
          {categories.length
            ? new Intl.ListFormat("es").format(categories)
            : "Sin categoría"}
        </small>
        <h3>{product?.name}</h3>
        {product?.size && (
          <small className="right">Talla {product?.size}</small>
        )}
      </div>
      <div className="text">
        {product?.discount && <p className="not">{product?.price} Bs.</p>}
        <p className="featured">
          {agotado
            ? "Agotado"
            : `${product?.discount ? product?.discount : product?.price} Bs.`}
        </p>
      </div>
    </ProductViewContainer>
  );
};

export default ProductView;

const ProductViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 0 2rem;

  & > .img-container {
    display: flex;
    justify-content: center;
    width: 50%;
    max-width: 80%;
    min-width: 270px;
    height: 270px;
    background-color: ${colors.primary100};
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s;
    position: absolute;

    & > img {
      width: 90%;
      height: 100%;
      object-fit: cover;
      box-shadow: ${colors.shadow};
    }
  }

  & > .fullscreen {
    top: 0;
    min-width: 100%;
    min-height: 100%;
    z-index: 6;

    & > img {
      width: 100%;
      object-fit: contain;
    }
  }

  & > .desc-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-top: 18.5rem;

    & > small {
      text-transform: uppercase;
      font-size: 0.875rem;
      color: ${colors.gray400};
      max-width: 300px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    & > .right {
      padding-top: 0.5rem;
      max-width: unset;
      text-align: end;
    }

    & > h3 {
      max-width: 100%;
      text-align: center;
      font-size: 2rem;
      line-height: 2.2rem;
      color: ${colors.gray900};
    }
  }

  & > .text {
    width: 100%;
    display: flex;
    gap: 1rem;
    align-items: center;
    font-size: 1.4rem;
    justify-content: flex-end;

    & > .not {
      text-decoration: line-through;
    }

    & > .featured {
      align-self: flex-end;
      padding: 0.5rem 1rem;
      background-color: ${colors.primary500};
      color: ${colors.white};
      border-radius: 0.5rem;
    }
  }
`;

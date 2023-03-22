import styled from 'styled-components';
import { useCloth } from '../../context/cloth'
import { colors } from '../../style/variables'

const ProductView = () => {
  const { selected: product } = useCloth();

  const categories: string[] = product.categories?.map(categorie => categorie.name) || [];

  return (
    <ProductViewContainer>
      <div className="img-container">
        <img src={product.photo} />
      </div>
      <div className='desc-container'>
        <small>{new Intl.ListFormat('es').format(categories)}</small>
        <h3>{product.name}</h3>
      </div>
      <p>{product.price} Bs.</p>
    </ProductViewContainer>
  )
}

export default ProductView

const ProductViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 0 2rem;

  & > .img-container {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 80%;
    min-width: 270px;
    height: 270px;
    background-color: ${colors.primary100};
    border-radius: 0.5rem;

    & > img {
      width: 90%;
      height: 100%;
      object-fit: cover;
      box-shadow: ${colors.shadow};
    }
  }

  & > .desc-container {
    display: flex;
    flex-direction: column;
    gap: .5rem;

    & > small {
      text-transform: uppercase;
      font-size: .875rem;
      color: ${colors.gray400};
      max-width: 300px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    & > h3 {
      max-width: 100%;
      text-align: center;
      font-size: 2rem;
      line-height: 2.2rem;
      color: ${colors.gray900};
    }
  }

  & > p {
    font-size: 1.4rem;
    align-self: flex-end;
    padding: .5rem 1rem;
    background-color: ${colors.primary500};
    color: ${colors.white};
    border-radius: .5rem;
  }
`;
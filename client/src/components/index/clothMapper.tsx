import styled from "styled-components";
import { useCloth } from "../../context/cloth";
import { useData } from "../../context/data";
import { colors } from "../../style/variables";
import ClothCard from "./clothCard";
import { Sale } from "../../interfaces/sale";

interface Props {
  sales?: Sale[];
}

const ClothMapper = ({ sales }: Props) => {
  const { products: allProducts } = useData();
  const { categoriesSelected, search, sizeSearch, focused } = useCloth();

  const filterByCategories = () => {
    const productJson = allProducts.sort((a, b) => {
      if (a.stock === undefined || b.stock === undefined) return 0;
      return a.stock === 0 ? 1 : b.stock === 0 ? -1 : 0;
    }); /* .filter(product => {
      const sold = product.clients?.reduce((prev, sale) => prev + sale.amount, 0) || 0;
      return product.stock && product.stock - sold != 0;
    }) */

    if (focused) {
      return productJson
        .filter((product) =>
          product.name?.toLowerCase().includes(search.toLowerCase())
        )
        .filter((product) => (sizeSearch ? product.size === sizeSearch : true));
    }

    if (!categoriesSelected.length) return productJson;

    const filtered = productJson
      .filter((product) => {
        let productFlag = false;
        product.categories?.forEach((category) => {
          const idCategoriesSelected: number[] = categoriesSelected.map(
            (category) => category.id
          );
          if (idCategoriesSelected.includes(category.id)) {
            productFlag = true;
          }
        });
        return productFlag;
      })
      .filter((product) => product.size?.includes(sizeSearch));

    return filtered;
  };

  return (
    <>
      {!filterByCategories().length && (
        <CenterText>
          <p>Pronto tendremos productos en este apartado ♡</p>
        </CenterText>
      )}
      <ClothContainer>
        {sales ? (
          sales.map(
            (sale, i) =>
              sale.product && (
                <ClothCard key={sale.id} sale={sale} product={sale.product} />
              )
          )
        ) : (
          <>
            {filterByCategories().map((v, i) => (
              <ClothCard key={v.id} product={v} />
            ))}
          </>
        )}
      </ClothContainer>
    </>
  );
};

export default ClothMapper;

const ClothContainer = styled.div`
  /* max-width: 1300px; */
  gap: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

  @media screen and (max-width: 915px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
`;

const CenterText = styled.div`
  width: 100%;
  height: 5rem;
  font-size: 1.2rem;
  color: ${colors.gray400};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

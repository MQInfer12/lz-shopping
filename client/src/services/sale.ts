import { http } from "../../env";

export const reserveProduct = async (form: {
  saleId: number | undefined
  ci: string
  amount: string
}, idProduct: number) => {
  const res = await fetch(`${http}sale/reserve/${idProduct}`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify(form)
  });
  if(res.ok) {
    const resJson = await res.json();
    return resJson;
  }
}
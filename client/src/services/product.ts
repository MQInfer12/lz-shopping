import { ProductForm } from "../components/home/productCrud";
const http = import.meta.env.VITE_HTTP;

export const getProductsAndCategories = async () => {
  const res = await fetch(`${http}index`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json"
    }
  });
  if(res.ok) {
    const resJson = await res.json();
    return resJson;
  }
}

export const postProduct = async (form: ProductForm) => {
  const res = await fetch(`${http}product`, {
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

export const putProduct = async (form: ProductForm) => {
  const res = await fetch(`${http}product/${form.id}`, {
    method: "PUT",
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

export const deleteProduct = async (id: number) => {
  const res = await fetch(`${http}product/${id}`, {
    method: "DELETE",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json"
    },
  });
  if(res.ok) {
    const resJson = await res.json();
    return resJson;
  }
}

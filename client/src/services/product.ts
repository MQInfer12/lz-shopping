

export const getProductsAndCategories = async () => {
  const res = await fetch(`index`, {
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
const http = import.meta.env.VITE_HTTP;

export const getCategories = async () => {
  const res = await fetch(`${http}category`, {
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
export const postCategory = async (name:string) => {
    const res = await fetch(`${http}category`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      body:JSON.stringify({
       name
      })
    });
    if(res.ok) {
      const resJson = await res.json();
      return resJson;
    }
  }
  export const deleteCategory = async (id:number) => {
    const res = await fetch(`${http}category/${id}`, {
      method: "DELETE",
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
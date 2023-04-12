const http = import.meta.env.VITE_HTTP;

export const postCi = async (ci: string) => {
  const res = await fetch(`${http}user`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify({ ci })
  });
  if(res.ok) {
    const resJson = await res.json();
    return resJson;
  }
}

export const updateUser = async (ci: string, form: {
  name: string
  phone: string
  ci: string
  currentCi: string
}) => {
  const res = await fetch(`${http}user/${ci}`, {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify({ 
      name: form.name,
      phone: form.phone,
      ci: form.ci,
      currentCi: form.currentCi
    })
  });
  if(res.ok) {
    const resJson = await res.json();
    return resJson;
  }
}
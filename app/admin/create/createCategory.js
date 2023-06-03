import FormData from "form-data";

export default async function createCategory(data) {
  const formData = new FormData();
  console.log(data);
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  fetch("/api/create", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
}

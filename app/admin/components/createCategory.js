import FormData from "form-data";

export default async function createCategory(data) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  const res = fetch("/api/createCategory", {
    method: "POST",
    body: formData,
  });
  if (res.ok) {
    return response.json();
  } else {
    throw new Error("Error creating category item.");
  }
}

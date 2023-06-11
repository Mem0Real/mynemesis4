import FormData from "form-data";

export default async function createCategory(data) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  try {
    await fetch("/api/createCategory", {
      method: "POST",
      body: formData,
    });
  } catch (err) {
    throw new Error("Error creating category item.");
  }
}

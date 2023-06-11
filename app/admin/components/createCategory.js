import FormData from "form-data";
import { SWRConfig } from "swr";

export default async function createCategory(data) {
  const { mutate } = SWRConfig();
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  try {
    await fetch("/api/createCategory", {
      method: "POST",
      body: formData,
    });
    mutate("/api/getAll");
  } catch (err) {
    throw new Error("Error creating category item.");
  }
}

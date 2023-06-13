export default async function deleteCategory(data) {
  let url, path;
  if (process.env.NODE_ENV === "development") url = "http://localhost:3000";
  else if (process.env.NODE_ENV === "production")
    url = "https://mynemesis4.vercel.app";

  if (data.itemId) {
    path = `/api/delete/?itId=${data.itemId}&entry=${data.entry}`;
  }
  if (data.childId) {
    path = `/api/delete/?chiId=${data.childId}&entry=${data.entry}`;
  }
  if (data.parentId) {
    path = `/api/delete/?parId=${data.parentId}&entry=${data.entry}`;
  }
  if (data.categoryId) {
    path = `/api/delete/?catId=${data.categoryId}&entry=${data.entry}`;
  }

  fetch(url + path, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
}

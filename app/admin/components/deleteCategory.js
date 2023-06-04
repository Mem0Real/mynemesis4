export default async function deleteCategory(data) {
  let url;
  if (data.itemId) {
    url = `/api/delete/?itId=${data.itemId}&entry=${data.entry}`;
  }
  if (data.childId) {
    url = `/api/delete/?chiId=${data.childId}&entry=${data.entry}`;
  }
  if (data.parentId) {
    url = `/api/delete/?parId=${data.parentId}&entry=${data.entry}`;
  }
  if (data.categoryId) {
    url = `/api/delete/?catId=${data.categoryId}&entry=${data.entry}`;
  }

  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
}

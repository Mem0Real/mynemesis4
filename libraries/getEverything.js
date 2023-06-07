export default async function getEverything() {
  const env = process.env.NODE_ENV;

  const res = await fetch('/api/getAll', {
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return undefined
  }

  const data = await res.json();

  return data;
}

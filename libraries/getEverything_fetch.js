export default async function getEverything() {
  const env = process.env.NODE_ENV;
  let url;

  if (env === "development") {
    url = "http://localhost:3000/api/getAll";
  } else if (env === "production")
    url = "https://mynemesis4.vercel.app/api/getAll";

  const res = await fetch(url, {
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

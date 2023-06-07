export default async function getEverything() {
  const env = process.env.NODE_ENV;
  let url;

  if (env === "development") url = "http://localhost:3001/api/getAll";
  else if (env === "production") url = "https://mynemesis4-mem0real.vercel.app";

  const res = await fetch(url, {
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    return undefined;
  }

  return res;
}

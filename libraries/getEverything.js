import prisma from "@/db";

export default async function getEverything() {
  const res = await fetch("http://localhost:3000/api/getAll", {
    next: { revalidate: 10 },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

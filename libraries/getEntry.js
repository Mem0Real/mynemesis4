import prisma from "@/db";

export default async function getEntry(entry, categoryId) {
  const data = await prisma[entry].findUnique({
    where: { id: categoryId },
  });
  return data;
}

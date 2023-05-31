import { prisma } from "@/db";

export default async function getCategory(categoryName) {
  const categories = await prisma.categories.findMany({
    where: { shortName: categoryName },
  });

  return categories;
}

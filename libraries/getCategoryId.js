import { prisma } from "@/db";

export default async function getCategory(categoryId) {
  const category = await prisma.categories.findUnique({
    where: { id: categoryId },
  });

  return category;
}

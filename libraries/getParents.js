import { prisma } from "@/db";

export default async function getParents(categoryId) {
  const parents = await prisma.parents.findMany({
    where: { CategoryId: categoryId },
    include: { children: true, items: true },
  });

  return parents;
}

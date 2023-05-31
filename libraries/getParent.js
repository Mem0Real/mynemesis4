import { prisma } from "@/db";

export default async function getParent(categoryId, parentName) {
  const parent = await prisma.parents.findMany({
    where: { shortName: parentName, CategoryId: categoryId },
  });

  return parent;
}

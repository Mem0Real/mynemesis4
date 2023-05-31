import { prisma } from "@/db";

export default async function getChild(categoryId, parentId, childName) {
  const child = await prisma.children.findMany({
    where: { shortName: childName, CategoryId: categoryId, ParentId: parentId },
  });

  return child;
}

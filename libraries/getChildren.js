import { prisma } from "@/db";

export default async function getChildren(categoryId, parentId) {
  const children = await prisma.children.findMany({
    where: { AND: [{ CategoryId: categoryId }, { ParentId: parentId }] },
    include: { items: true },
  });

  return children;
}

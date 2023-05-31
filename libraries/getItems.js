import { prisma } from "@/db";

export default async function getItems(categoryId, parentId, childId) {
  const items = await prisma.items.findMany({
    where: { AND: [{ CategoryId: categoryId }, { ParentId: parentId }, {ChildId: childId}] },
  });

  return items;
}

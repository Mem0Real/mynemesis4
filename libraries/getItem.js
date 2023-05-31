import { prisma } from "@/db";

export default async function getItem(categoryId, parentId, childId, itemId) {
  itemId = parseInt(itemId);
  const item = await prisma.items.findMany({
    where: {
      id: itemId,
      CategoryId: categoryId,
      ParentId: parentId,
      ChildId: childId,
    },
  });

  return item;
}

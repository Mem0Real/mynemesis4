import { prisma } from "@/db";

export default async function getParent(parentId) {
  const parent = await prisma.parents.findUnique({
    where: { id: parentId },
  });

  return parent;
}

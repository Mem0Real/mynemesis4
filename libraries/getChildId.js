import { prisma } from "@/db";

export default async function getChild(childId) {
  const child = await prisma.children.findUnique({
    where: { id: childId },
  });

  return child;
}

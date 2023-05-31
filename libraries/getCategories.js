import { prisma } from "@/db";

export default async function getCategories() {
  const categories = await prisma.categories.findMany({
    include: { parents: true },
  });
  return categories;
}

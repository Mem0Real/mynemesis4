import { prisma } from "@/db";

export default async function searchCategories(query) {
  if (query) {
    const result = await prisma.categories.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            shortName: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    return result;
  }
}

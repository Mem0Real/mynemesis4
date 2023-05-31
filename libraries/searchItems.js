import { prisma } from "@/db";

export default async function searchItems(query) {
  if (query) {
    const result = await prisma.items.findMany({
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

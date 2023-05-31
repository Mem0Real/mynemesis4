import { prisma } from "@/db";

export default async function searchParents(query) {
  if (query) {
    const result = await prisma.parents.findMany({
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

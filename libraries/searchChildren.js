import { prisma } from "@/db";

export default async function searchChildren(query) {
  if (query) {
    const result = await prisma.children.findMany({
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

import { prisma } from "@/db";

export default async function searchAll(query) {
  let result = [];
  if (query) {
    const result1 = await prisma.categories.findMany({
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
    const result2 = await prisma.parents.findMany({
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
    const result3 = await prisma.children.findMany({
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
    const result4 = await prisma.items.findMany({
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

    if (result1.length !== 0) result.push(result1);
    if (result2.length !== 0) result.push(result2);
    if (result3.length !== 0) result.push(result3);
    if (result4.length !== 0) result.push(result4);

    return result;
  }
}

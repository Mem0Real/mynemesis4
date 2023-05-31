import { prisma } from "@/db";

export default async function searchEverything(query) {
  const categories = prisma.categories.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          id: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  const parents = prisma.parents.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          id: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  const children = prisma.children.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          id: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  const items = prisma.items.findMany({
    where: {
      OR: [
        {
          id: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          brand: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          model: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  const data = Promise.all([categories, parents, children, items]);
  return data;
}

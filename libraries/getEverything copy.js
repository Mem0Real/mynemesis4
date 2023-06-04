import prisma from "@/db";

export default async function getEverything() {
  const categories = prisma.categories.findMany({
    // include: { parents: true },
  });

  const parents = prisma.parents.findMany({
    // include: { children: true },
  });

  const children = prisma.children.findMany({
    // include: { items: true },
  });

  const items = prisma.items.findMany({});

  const data = Promise.all([categories, parents, children, items]);
  return data;
}

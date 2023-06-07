import prisma from "@/prisma";

export default async function getEverything() {
  const categories = prisma.categories.findMany({});

  const parents = prisma.parents.findMany({});

  const children = prisma.children.findMany({});

  const items = prisma.items.findMany({});

  const data = Promise.all([categories, parents, children, items]);
  return data;
}

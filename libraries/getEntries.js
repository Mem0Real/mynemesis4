import prisma from "@/prisma";

export default async function getEntries(entry, id = undefined) {
  let includes;

  if (entry === "categories") includes = { parents: true };
  else if (entry === "parents") includes = { children: true };
  else if (entry === "children") includes = { items: true };

  const data = await prisma[entry].findMany({
    include: includes,
    where: id,
  });
  return data;
}

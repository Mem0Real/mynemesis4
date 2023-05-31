import { prisma } from "@/db";

export default async function checkExistence(data) {
  const { entry, name, shortName } = data;

  const result = await prisma[entry].findMany({
    where: { OR: [{ name: name }, { shortName: shortName }] },
  });

  return result;
}

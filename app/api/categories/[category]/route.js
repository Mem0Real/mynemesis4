import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, res) {
  let fullPath = req.nextUrl.pathname;
  let currentPath = fullPath.replace("/api/categories/", "");
  const categoryDetails = await prisma.categories.findMany({
    where: {
      shortName: currentPath,
    },
    include: {
      parents: true,
      children: true,
      items: true,
    },
  });
  return new Response(JSON.stringify(categoryDetails));
}

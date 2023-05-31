import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, res) {
  const allCategories = await prisma.categories.findMany({
    include: {
      parents: true,
      children: true,
      items: true,
    },
  });
  return NextResponse.json(allCategories);
}

export async function POST(req, res) {
  const body = await req.json();
  const categoryData = body;
  let name, description;

  if (!categoryData.shortName) {
    name = categoryData.name;
    name = name.toLowerCase();
    name = name.replace(" ", "-");
  } else name = categoryData.shortName;

  if (!categoryData.description) {
    description = categoryData.name;
  } else description = categoryData.description;

  const checkExisting = await prisma.categories.findMany({
    where: {
      OR: [{ name: categoryData.name }, { shortName: name }],
    },
  });
  if (!checkExisting) {
    const createCategory = await prisma.categories.create({
      data: {
        name: categoryData.name,
        shortName: name,
        description: description,
      },
    });
    return new Response(JSON.stringify(createCategory));
  } else {
    return new Response(
      JSON.stringify({
        message: `Category "${categoryData.name}" already exists`,
      })
    );
  }
}

import { prisma } from "@/db";
import getCategories from "@/libraries/getCategories";
import { NextResponse } from "next/server";

export default async function listCategories() {
  const categories = await prisma.categories.findMany();
  return NextResponse.json(categories);
}

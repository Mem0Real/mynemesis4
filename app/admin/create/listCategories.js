import { prisma } from "@/db";
import { NextResponse } from "next/server";
import getEntries from "@/libraries/getEntries";

export default async function listCategories() {
  const categories = await prisma.categories.findMany();
  return NextResponse.json(categories);
}

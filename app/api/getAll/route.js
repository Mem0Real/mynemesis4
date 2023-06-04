import { NextResponse } from "next/server";
import prisma from "@/db";

export async function GET() {
  const categories = prisma.categories.findMany({});
  const parents = prisma.parents.findMany({});
  const children = prisma.children.findMany();
  const items = prisma.items.findMany();

  const result = await Promise.all([categories, parents, children, items]);

  return NextResponse.json(result);
}

import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const entry = searchParams.get("entry");
  const id = searchParams.get("id");
  const res = await prisma[entry].findUnique({ where: { id: id } });
  if (!res) return new NextResponse("Not found", { status: 500 });
  return new NextResponse("Checker", { status: 200 });
};

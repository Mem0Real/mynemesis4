import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.categories.findMany({});
    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (e) {
    console.log(e);
  }
}

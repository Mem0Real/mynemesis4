import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  if (query) {
    const categoryData = await prisma.categories.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            shortName: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    return NextResponse.json(categoryData);
  } else {
    return NextResponse.json({ message: "empty search" });
  }
}

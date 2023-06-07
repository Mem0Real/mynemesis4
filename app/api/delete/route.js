import { NextResponse } from "next/server";
import prisma from "@/prisma";

export async function DELETE(request, response) {
  const { searchParams } = new URL(request.url);
  const entry = searchParams.get("entry");
  const catId = searchParams.get("catId");
  const parId = searchParams.get("parId");
  const chiId = searchParams.get("chiId");
  const itId = searchParams.get("itId");
  let toDelete;

  if (itId) toDelete = itId;
  else if (chiId) toDelete = chiId;
  else if (parId) toDelete = parId;
  else if (catId) toDelete = catId;

  const checkExistence = async (id) => {
    const result = await prisma[entry].findUnique({
      where: { id: id },
    });
    return result;
  };

  const exist = await checkExistence(toDelete);

  if (exist) {
    const res = await prisma[entry].delete({
      where: {
        id: toDelete,
      },
    });
    console.log("Deleted");
    const message = `${toDelete} has been deleted.`;
    return NextResponse.json({ data: { message }, status: 204 });
  } else {
    const message = `${toDelete} doesn't exist.`;
    return NextResponse.json({ data: { message }, status: 404 });
  }
}

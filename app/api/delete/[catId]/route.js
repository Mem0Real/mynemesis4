import { NextResponse } from "next/server";
import { prisma } from "@/db";

export async function POST(request, response) {
  console.log(request.nextUrl);
  // let entry = data.get("entry");

  // let categoryId = data.get("categories");
  // let parentId = data.get("parents");
  // let childId = data.get("children");
  // let name = data.get("name");

  // let id = data.get("id");

  // let category = { name: undefined, val: undefined };

  const checkExistence = async (id) => {
    const result = await prisma[entry].findUnique({
      where: { id: id },
    });
  };

  // //   Delete from databse

  // if (childId !== null) {
  //   category = { name: "ChildId", val: childId };
  // } else if (parentId !== null) {
  //   category = { name: "ParentId", val: parentId };
  // } else if (categoryId !== null) {
  //   category = { name: "CategoryId", val: categoryId };
  // } else {
  //   category.name = undefined;
  //   category.val = undefined;
  // }

  const exist = await checkExistence(catId);

  if (exist) {
    const res = await prisma.categories.delete({
      where: {
        id: catId,
      },
    });
    const message = `Category ${catId} has been deleted.`;
    return NextResponse.json({ data: { message }, status: 204 });
  } else {
    const message = `Category ${catId} doesn't exist.`;
    return NextResponse.json({ data: { message }, status: 404 });
  }
}

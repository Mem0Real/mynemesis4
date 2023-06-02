import getEverything from "@/libraries/getEverything";
import { NextResponse } from "next/server";

export async function GET() {
  const allCategories = await getEverything();
  return NextResponse.json(allCategories);
}

import getEntries from "@/libraries/getEntries";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {entry} = await request.json();
  const categories = await getEntries(entry);
  return NextResponse.json(categories);
}

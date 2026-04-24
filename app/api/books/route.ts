import { NextResponse } from "next/server";
import { getPaginatedBooks } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "9");
  const offset = parseInt(searchParams.get("offset") || "0");

  try {
    const books = await getPaginatedBooks(limit, offset);
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}

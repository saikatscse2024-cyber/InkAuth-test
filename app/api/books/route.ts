import { NextResponse } from "next/server";
import { getPaginatedBooks } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "6");
  const offset = parseInt(searchParams.get("offset") || "0");
  const query = searchParams.get("q") || "";

  try {
    const books = await getPaginatedBooks(limit, offset, query);
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}

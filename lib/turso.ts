import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  throw new Error("TURSO_DATABASE_URL is not defined");
}

export const turso = createClient({
  url: url,
  authToken: authToken,
});

export interface Book {
  id: number;
  slug: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  cover_image: string;
  rating: number;
  total_chapters: number;
  status: 'ongoing' | 'completed';
  published_at: string;
  created_at: string;
}

export interface Chapter {
  id: number;
  book_id: number;
  slug: string;
  title: string;
  content: string;
  chapter_number: number;
  created_at: string;
}

import { turso } from "./turso";

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

export interface BookWithChapters {
  book: Book;
  chapters: Partial<Chapter>[];
}

export interface ChapterWithNav {
  book: { title: string; slug: string };
  chapter: Chapter;
  prevChapter: { slug: string; chapter_number: number } | null;
  nextChapter: { slug: string; chapter_number: number } | null;
}

/**
 * Data Access Layer (DAL) for "Ink Auth"
 * Centralizes all Turso database queries.
 */

export async function getFeaturedBooks(limit: number = 6): Promise<Book[]> {
  try {
    const result = await turso.execute({
      sql: "SELECT * FROM books ORDER BY created_at DESC LIMIT ?",
      args: [limit],
    });
    return result.rows as unknown as Book[];
  } catch (error) {
    return [];
  }
}

export async function getBookBySlug(slug: string): Promise<BookWithChapters | null> {
  try {
    const bookResult = await turso.execute({
      sql: "SELECT * FROM books WHERE slug = ?",
      args: [slug],
    });

    if (bookResult.rows.length === 0) return null;

    const book = bookResult.rows[0] as unknown as Book;
    
    const chaptersResult = await turso.execute({
      sql: "SELECT id, title, chapter_number, slug FROM chapters WHERE book_id = ? ORDER BY chapter_number ASC",
      args: [book.id],
    });

    return {
      book,
      chapters: chaptersResult.rows as unknown as Partial<Chapter>[],
    };
  } catch (error) {
    return null;
  }
}

export async function getChapterBySlug(bookSlug: string, chapterSlug: string): Promise<ChapterWithNav | null> {
  try {
    // 1. Get Book
    const bookResult = await turso.execute({
      sql: "SELECT id, title, slug FROM books WHERE slug = ?",
      args: [bookSlug],
    });

    if (bookResult.rows.length === 0) return null;
    const book = bookResult.rows[0] as unknown as { id: number; title: string; slug: string };

    // 2. Get Chapter
    const chapterResult = await turso.execute({
      sql: "SELECT * FROM chapters WHERE book_id = ? AND slug = ?",
      args: [book.id, chapterSlug],
    });

    if (chapterResult.rows.length === 0) return null;
    const chapter = chapterResult.rows[0] as unknown as Chapter;

    // 3. Get Navigation (Previous and Next slugs)
    const navResult = await turso.execute({
      sql: "SELECT slug, chapter_number FROM chapters WHERE book_id = ? AND chapter_number IN (?, ?) ORDER BY chapter_number",
      args: [book.id, chapter.chapter_number - 1, chapter.chapter_number + 1],
    });

    let prevChapter = null;
    let nextChapter = null;

    navResult.rows.forEach((row: any) => {
      if (row.chapter_number === chapter.chapter_number - 1) prevChapter = row;
      if (row.chapter_number === chapter.chapter_number + 1) nextChapter = row;
    });

    return { 
      book, 
      chapter, 
      prevChapter: prevChapter as { slug: string; chapter_number: number } | null, 
      nextChapter: nextChapter as { slug: string; chapter_number: number } | null 
    };
  } catch (error) {
    return null;
  }
}

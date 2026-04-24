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
 * Normalization helper to convert Turso Row objects to plain JS objects.
 */
function rowsToObjects<T>(result: any): T[] {
  if (!result || !result.columns || !result.rows) return [];
  const cols = result.columns;
  return result.rows.map((row: any) => {
    const obj: Record<string, any> = {};
    cols.forEach((col: string, i: number) => {
      obj[col] = row[i];
    });
    return obj as T;
  });
}

/**
 * Data Access Layer (DAL) for "Ink Auth"
 * Centralizes all Turso database queries.
 */

export async function getFeaturedBooks(limit: number = 6): Promise<Book[]> {
  try {
    const result = await turso.execute(
      "SELECT * FROM books ORDER BY created_at DESC LIMIT ?",
      [limit]
    );
    return rowsToObjects<Book>(result);
  } catch (error) {
    console.error("Error in getFeaturedBooks:", error);
    return [];
  }
}

export async function getBookBySlug(slug: string): Promise<BookWithChapters | null> {
  try {
    const bookResult = await turso.execute(
      "SELECT * FROM books WHERE slug = ?",
      [slug]
    );

    const books = rowsToObjects<Book>(bookResult);
    if (books.length === 0) return null;

    const book = books[0];
    
    const chaptersResult = await turso.execute(
      "SELECT id, title, chapter_number, slug FROM chapters WHERE book_id = ? ORDER BY chapter_number ASC",
      [book.id]
    );

    return {
      book,
      chapters: rowsToObjects<Partial<Chapter>>(chaptersResult),
    };
  } catch (error) {
    console.error("Error in getBookBySlug:", error);
    return null;
  }
}

export async function getChapterBySlug(bookSlug: string, chapterSlug: string): Promise<ChapterWithNav | null> {
  try {
    // 1. Get Book
    const bookResult = await turso.execute(
      "SELECT id, title, slug FROM books WHERE slug = ?",
      [bookSlug]
    );

    const books = rowsToObjects<{ id: number; title: string; slug: string }>(bookResult);
    if (books.length === 0) return null;
    const book = books[0];

    // 2. Get Chapter
    const chapterResult = await turso.execute(
      "SELECT * FROM chapters WHERE book_id = ? AND slug = ?",
      [book.id, chapterSlug]
    );

    const chapters = rowsToObjects<Chapter>(chapterResult);
    if (chapters.length === 0) return null;
    const chapter = chapters[0];

    // 3. Get Navigation (Previous and Next slugs)
    const navResult = await turso.execute(
      "SELECT slug, chapter_number FROM chapters WHERE book_id = ? AND chapter_number IN (?, ?) ORDER BY chapter_number",
      [book.id, chapter.chapter_number - 1, chapter.chapter_number + 1]
    );

    const navItems = rowsToObjects<{ slug: string; chapter_number: number }>(navResult);
    let prevChapter = null;
    let nextChapter = null;

    navItems.forEach((item) => {
      if (item.chapter_number === chapter.chapter_number - 1) prevChapter = item;
      if (item.chapter_number === chapter.chapter_number + 1) nextChapter = item;
    });

    return { 
      book, 
      chapter, 
      prevChapter, 
      nextChapter 
    };
  } catch (error) {
    console.error("Error in getChapterBySlug:", error);
    return null;
  }
}

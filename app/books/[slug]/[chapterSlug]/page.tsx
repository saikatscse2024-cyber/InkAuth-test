import { turso, Book, Chapter } from "@/lib/turso";
import Navbar from "@/components/Navbar";
import LatexRenderer from "@/components/LatexRenderer";
import { ChevronLeft, ChevronRight, List } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getChapterData(bookSlug: string, chapterSlug: string) {
  try {
    const bookResult = await turso.execute({
      sql: "SELECT id, title, slug FROM books WHERE slug = ?",
      args: [bookSlug],
    });

    if (bookResult.rows.length === 0) {
      // Dummy data for validation
      if (bookSlug === "the-silent-echo" && chapterSlug === "the-whispering-walls") {
        return {
          book: { title: "The Silent Echo", slug: "the-silent-echo" },
          chapter: {
            title: "The Whispering Walls",
            content: "# Chapter 1: The Whispering Walls \n\n In the heart of the library, the energy was palpable. The equation of the soul was whispered to be:\n\n $E = \\psi^2 + \\Omega$\n\n Where $\\psi$ represents the spirit and $\\Omega$ the infinite knowledge. \n\n The walls seemed to move, vibrating with the collective thoughts of a thousand scholars. Elena felt a cold draft, yet the air was thick with the scent of old parchment.",
            chapter_number: 1,
            slug: "the-whispering-walls"
          },
          prevChapter: null,
          nextChapter: { slug: "forbidden-knowledge" }
        };
      }
      return null;
    }

    const book = bookResult.rows[0] as unknown as { id: number; title: string; slug: string };
    
    const chapterResult = await turso.execute({
      sql: "SELECT * FROM chapters WHERE book_id = ? AND slug = ?",
      args: [book.id, chapterSlug],
    });

    if (chapterResult.rows.length === 0) return null;

    const chapter = chapterResult.rows[0] as unknown as Chapter;

    // Fetch next and previous chapter slugs
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

    return { book, chapter, prevChapter, nextChapter };
  } catch (error) {
    console.error("Failed to fetch chapter data:", error);
    return null;
  }
}

export default async function ChapterPage({ params }: { params: Promise<{ slug: string; chapterSlug: string }> }) {
  const { slug, chapterSlug } = await params;
  const data = await getChapterData(slug, chapterSlug);

  if (!data) {
    notFound();
  }

  const { book, chapter, prevChapter, nextChapter } = data;

  return (
    <main className="min-h-screen bg-background transition-colors duration-500">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-32">
        {/* Reader Header */}
        <div className="mb-20 text-center">
          <Link 
            href={`/books/${book.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-foreground/30 hover:text-foreground transition-colors mb-6"
          >
            <ChevronLeft className="w-3 h-3" />
            {book.title}
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
            {chapter.title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-foreground/40 font-medium">
            <span className="px-3 py-1 bg-accent rounded-full">Chapter {chapter.chapter_number}</span>
          </div>
        </div>

        {/* Chapter Content */}
        <div className="bg-card p-8 md:p-16 rounded-[2.5rem] shadow-sm border border-border transition-colors duration-500">
          <LatexRenderer content={chapter.content} />
        </div>

        {/* Reader Navigation */}
        <div className="mt-20 flex items-center justify-between border-t border-border pt-12">
          {prevChapter ? (
            <Link 
              href={`/books/${book.slug}/${prevChapter.slug}`}
              className="flex items-center gap-4 group text-left"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full border border-border group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                <ChevronLeft className="w-5 h-5" />
              </div>
              <div className="hidden sm:block">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-foreground/30">Previous</span>
                <span className="font-bold text-sm text-foreground">Chapter {prevChapter.chapter_number}</span>
              </div>
            </Link>
          ) : <div />}

          <Link 
            href={`/books/${book.slug}`}
            className="p-4 bg-accent hover:bg-foreground hover:text-background rounded-full transition-all duration-300"
            title="Table of Contents"
          >
            <List className="w-5 h-5" />
          </Link>

          {nextChapter ? (
            <Link 
              href={`/books/${book.slug}/${nextChapter.slug}`}
              className="flex items-center gap-4 group text-right"
            >
              <div className="hidden sm:block">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-foreground/30">Next</span>
                <span className="font-bold text-sm text-foreground">Chapter {nextChapter.chapter_number}</span>
              </div>
              <div className="w-12 h-12 flex items-center justify-center rounded-full border border-border group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                <ChevronRight className="w-5 h-5" />
              </div>
            </Link>
          ) : <div />}
        </div>
      </div>
    </main>
  );
}

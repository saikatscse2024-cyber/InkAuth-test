import { getChapterBySlug } from "@/lib/db";
import Navbar from "@/components/Navbar";
import LatexRenderer from "@/components/LatexRenderer";
import { ChevronLeft, ChevronRight, List } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ChapterPage({ params }: { params: Promise<{ slug: string; chapterSlug: string }> }) {
  const { slug, chapterSlug } = await params;
  const data = await getChapterBySlug(slug, chapterSlug);

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

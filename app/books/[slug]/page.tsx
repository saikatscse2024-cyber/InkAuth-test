import { turso, Book, Chapter } from "@/lib/turso";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Star, Clock, Book as BookIcon, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";

async function getBookData(slug: string) {
  try {
    const bookResult = await turso.execute({
      sql: "SELECT * FROM books WHERE slug = ?",
      args: [slug],
    });

    if (bookResult.rows.length === 0) {
      // Dummy data for validation if DB is empty
      if (slug === "the-silent-echo") {
        return {
          book: {
            id: 1,
            slug: "the-silent-echo",
            title: "The Silent Echo",
            author: "Elena Vance",
            genre: "Mystery",
            description: "A journey through the whispers of history. In the heart of an ancient library, a forgotten manuscript reveals secrets that have been buried for centuries.",
            cover_image: "/covers/cover1.png",
            rating: 4.8,
            total_chapters: 12,
            status: "completed",
            published_at: "2024-01-15",
            created_at: "2024-01-15",
          } as Book,
          chapters: [
            { id: 1, title: "The Whispering Walls", chapter_number: 1, slug: "the-whispering-walls" },
            { id: 2, title: "Forbidden Knowledge", chapter_number: 2, slug: "forbidden-knowledge" },
            { id: 3, title: "The Librarian's Key", chapter_number: 3, slug: "librarians-key" },
          ] as Partial<Chapter>[],
        };
      }
      return null;
    }

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
    console.error("Failed to fetch book data:", error);
    return null;
  }
}

export default async function BookDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getBookData(slug);

  if (!data) {
    notFound();
  }

  const { book, chapters } = data;

  return (
    <main className="min-h-screen bg-background transition-colors duration-500">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Sidebar: Book Info */}
          <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit">
            <div className="relative aspect-[3/4] w-full max-w-sm mx-auto lg:mx-0 overflow-hidden rounded-3xl shadow-2xl mb-8">
              <Image 
                src={book.cover_image} 
                alt={book.title} 
                fill 
                className="object-cover"
                priority
              />
            </div>
            
            <div className="space-y-6 text-center lg:text-left">
              <div>
                <h1 className="text-4xl font-bold tracking-tight mb-2 text-foreground">{book.title}</h1>
                <p className="text-xl text-foreground/40 font-medium italic">{book.author}</p>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-6 py-4 border-y border-border">
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-xs font-bold uppercase tracking-widest text-foreground/30 mb-1">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-foreground text-foreground" />
                    <span className="font-bold text-foreground">{book.rating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-xs font-bold uppercase tracking-widest text-foreground/30 mb-1">Chapters</span>
                  <span className="font-bold text-foreground">{book.total_chapters}</span>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-xs font-bold uppercase tracking-widest text-foreground/30 mb-1">Status</span>
                  <span className="font-bold capitalize text-foreground">{book.status}</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/30 mb-3">Synopsis</h3>
                <p className="text-foreground/60 leading-relaxed text-lg">
                  {book.description}
                </p>
              </div>

              <div className="pt-4">
                <span className="inline-block px-4 py-1.5 bg-accent rounded-full text-xs font-bold uppercase tracking-widest text-foreground/70">
                  {book.genre}
                </span>
              </div>
            </div>
          </div>

          {/* Right Content: Chapters List */}
          <div className="lg:w-2/3">
            <div className="mb-10">
              <h2 className="text-2xl font-bold tracking-tight mb-2 text-foreground">Chapters</h2>
              <p className="text-foreground/40 font-medium">Continue your reading journey</p>
            </div>

            <div className="space-y-3">
              {chapters.map((chapter) => (
                <Link 
                  key={chapter.id}
                  href={`/books/${book.slug}/${chapter.slug}`}
                  className="group flex items-center justify-between p-6 bg-card border border-border rounded-2xl hover:bg-accent transition-all duration-300"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 flex items-center justify-center bg-accent rounded-xl group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                      <span className="font-bold">{chapter.chapter_number}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-foreground group-hover:text-foreground/70 transition-colors">{chapter.title}</h4>
                      <div className="flex items-center gap-3 text-sm text-foreground/30 font-medium">
                        <span className="flex items-center gap-1.5 italic">
                          <BookIcon className="w-3.5 h-3.5" />
                          Published
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-foreground/20 group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

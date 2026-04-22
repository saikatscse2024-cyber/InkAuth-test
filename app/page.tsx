import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BookCard from "@/components/BookCard";
import Link from "next/link";
import { turso, Book } from "@/lib/turso";

async function getBooks() {
  try {
    const result = await turso.execute("SELECT * FROM books ORDER BY created_at DESC LIMIT 6");
    
    let books = result.rows as unknown as Book[];
    
    // Seed data if empty for validation
    if (books.length === 0) {
      books = [
        {
          id: 1,
          slug: "the-silent-echo",
          title: "The Silent Echo",
          author: "Elena Vance",
          description: "A journey through the whispers of history.",
          cover_image: "/covers/cover1.png",
          genre: "Mystery",
          rating: 4.8,
          total_chapters: 12,
          status: "completed",
          published_at: "2024-01-15",
          created_at: "2024-01-15",
        } as Book,
        {
          id: 2,
          slug: "beyond-the-horizon",
          title: "Beyond the Horizon",
          author: "Marcus Thorne",
          description: "Finding hope in the edge of the world.",
          cover_image: "/covers/cover2.png",
          genre: "Sci-Fi",
          rating: 4.5,
          total_chapters: 24,
          status: "ongoing",
          published_at: "2024-02-10",
          created_at: "2024-02-10",
        } as Book,
        {
          id: 3,
          slug: "urban-solitude",
          title: "Urban Solitude",
          author: "Sarah Jenkins",
          description: "The poetry of city lights and empty streets.",
          cover_image: "/covers/cover3.png",
          genre: "Poetry",
          rating: 4.9,
          total_chapters: 8,
          status: "completed",
          published_at: "2024-03-05",
          created_at: "2024-03-05",
        } as Book
      ];
    }
    
    return books;
  } catch (error) {
    console.error("Failed to fetch books:", error);
    return [];
  }
}

export default async function Home() {
  const books = await getBooks();

  return (
    <main className="min-h-screen bg-background transition-colors duration-500">
      <Navbar />
      <Hero />
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2 text-foreground">Featured Stories</h2>
            <p className="text-foreground/40 font-medium">Handpicked reads for your weekend</p>
          </div>
          <button className="text-sm font-bold border-b-2 border-border pb-1 text-foreground/60 hover:text-foreground hover:border-foreground transition-all">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {books.map((book: Book) => (
            <BookCard
              key={book.slug}
              slug={book.slug}
              title={book.title}
              author={book.author}
              category={book.genre}
              rating={book.rating}
              image={book.cover_image}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-accent py-20 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-border pb-16">
            <div className="md:col-span-2">
              <span className="font-bold text-2xl tracking-tighter mb-4 block text-foreground">Ink Auth</span>
              <p className="max-w-xs text-foreground/50 leading-relaxed">
                A sanctuary for readers and writers. We believe in the power of stories to change the world.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-foreground">Explore</h4>
              <ul className="space-y-4 text-sm text-foreground/50">
                <li><Link href="/coming-soon" className="hover:text-foreground transition-colors">Library</Link></li>
                <li><Link href="/coming-soon" className="hover:text-foreground transition-colors">Authors</Link></li>
                <li><Link href="/coming-soon" className="hover:text-foreground transition-colors">Membership</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-foreground">Support</h4>
              <ul className="space-y-4 text-sm text-foreground/50">
                <li><Link href="/coming-soon" className="hover:text-foreground transition-colors">Help Center</Link></li>
                <li><Link href="/coming-soon" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                <li><Link href="/coming-soon" className="hover:text-foreground transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 text-sm text-foreground/30 flex justify-between items-center">
            <p>© 2026 Ink Auth. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="#" className="hover:text-foreground transition-colors">Twitter</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Instagram</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
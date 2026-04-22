import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BookCard from "@/components/BookCard";
import Link from "next/link";
import { getFeaturedBooks, Book } from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const books = await getFeaturedBooks();

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
            <Link key={book.slug} href={`/books/${book.slug}`} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-accent mb-4 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2">
                 {/* Image removed for deployment test */}
                 <div className="absolute inset-0 flex items-center justify-center bg-accent text-foreground/20 font-bold text-2xl uppercase tracking-tighter">
                   {book.title[0]}
                 </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-foreground/40">{book.genre}</span>
                </div>
                <h3 className="font-bold text-lg leading-tight text-foreground group-hover:text-foreground/60 transition-colors">{book.title}</h3>
                <p className="text-sm text-foreground/60">{book.author}</p>
              </div>
            </Link>
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
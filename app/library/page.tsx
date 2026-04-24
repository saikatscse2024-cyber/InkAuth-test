"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Loader2, Search, Filter } from "lucide-react";

interface Book {
  id: number;
  slug: string;
  title: string;
  author: string;
  genre: string;
  cover_image: string;
}

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 9;

  const fetchBooks = async (currentOffset: number, isInitial = false) => {
    if (isInitial) setLoading(true);
    else setLoadingMore(true);

    try {
      const res = await fetch(`/api/books?limit=${limit}&offset=${currentOffset}`);
      const data = await res.json();

      if (data.length < limit) {
        setHasMore(false);
      }

      if (isInitial) {
        setBooks(data);
      } else {
        setBooks((prev) => [...prev, ...data]);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchBooks(0, true);
  }, []);

  const handleLoadMore = () => {
    const nextOffset = offset + limit;
    setOffset(nextOffset);
    fetchBooks(nextOffset);
  };

  return (
    <main className="min-h-screen bg-background transition-colors duration-500 pb-32">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        <div className="mb-16">
          <h1 className="text-5xl font-bold tracking-tight text-foreground mb-4">Library</h1>
          <p className="text-foreground/40 font-medium">Explore our collection of stories and adventures.</p>
        </div>

        {/* Filters/Search Placeholder */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" />
            <input 
              type="text" 
              placeholder="Search by title or author..." 
              className="w-full bg-accent/30 border border-border rounded-2xl py-3 pl-12 pr-4 text-foreground placeholder:text-foreground/20 focus:outline-none focus:ring-2 focus:ring-foreground/10 transition-all"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-accent rounded-2xl text-foreground font-bold text-sm hover:bg-accent/80 transition-all">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-foreground/20" />
            <p className="text-foreground/30 font-medium italic">Scanning the archives...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {books.map((book) => (
                <Link key={book.id + book.slug} href={`/books/${book.slug}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-accent mb-4 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2">
                    {book.cover_image ? (
                      <img 
                        src={book.cover_image} 
                        alt={book.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-accent text-foreground/20 font-bold text-2xl uppercase tracking-tighter">
                        {book.title[0]}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-foreground/40">{book.genre}</span>
                    <h3 className="font-bold text-lg leading-tight text-foreground group-hover:text-foreground/60 transition-colors">{book.title}</h3>
                    <p className="text-sm text-foreground/60">{book.author}</p>
                  </div>
                </Link>
              ))}
            </div>

            {hasMore && (
              <div className="mt-20 flex justify-center">
                <button 
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="group relative px-12 py-4 bg-foreground text-background font-bold rounded-2xl overflow-hidden hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100"
                >
                  <div className="relative z-10 flex items-center gap-2">
                    {loadingMore ? <Loader2 className="w-5 h-5 animate-spin" /> : "Load More"}
                  </div>
                </button>
              </div>
            )}
            
            {!hasMore && books.length > 0 && (
              <p className="mt-20 text-center text-foreground/20 font-medium italic">You've reached the end of the collection.</p>
            )}
          </>
        )}
      </div>
    </main>
  );
}

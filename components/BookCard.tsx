import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

interface BookCardProps {
  slug: string;
  title: string;
  author: string;
  category: string;
  rating: number;
  image: string;
}

export default function BookCard({ slug, title, author, category, rating, image }: BookCardProps) {
  return (
    <Link href={`/books/${slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-accent mb-4 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <div className="w-full bg-card text-foreground py-3 rounded-full font-medium text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Read Now
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground/40">{category}</span>
          <div className="flex items-center space-x-1 text-foreground">
            <Star className="w-3 h-3 fill-foreground text-foreground" />
            <span className="text-xs font-bold">{rating.toFixed(1)}</span>
          </div>
        </div>
        <h3 className="font-bold text-lg leading-tight text-foreground group-hover:text-foreground/60 transition-colors">{title}</h3>
        <p className="text-sm text-foreground/60">{author}</p>
      </div>
    </Link>
  );
}

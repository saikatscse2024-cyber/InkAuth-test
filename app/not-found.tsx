import Link from "next/link";
import Navbar from "@/components/Navbar";
import { SearchSlash } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background transition-colors duration-500">
      <Navbar />
      
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="mb-8 p-6 bg-accent rounded-full">
          <SearchSlash className="w-12 h-12 text-foreground/40" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
          Story <span className="text-foreground/40 italic">not found.</span>
        </h1>
        
        <p className="max-w-md mx-auto text-foreground/50 mb-10 leading-relaxed font-medium">
          The page you are looking for doesn't exist or has been moved to a new chapter. 
        </p>

        <Link 
          href="/" 
          className="px-10 py-4 bg-foreground text-background rounded-full font-bold hover:opacity-80 transition-all shadow-lg hover:shadow-xl active:scale-95"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}

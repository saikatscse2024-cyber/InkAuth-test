import Link from "next/link";
import Navbar from "@/components/Navbar";
import { MoveLeft, Sparkles } from "lucide-react";

export default function ComingSoon() {
  return (
    <main className="min-h-screen bg-background transition-colors duration-500">
      <Navbar />
      
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center pt-20">
        <div className="mb-8 p-4 bg-accent rounded-3xl animate-pulse">
          <Sparkles className="w-12 h-12 text-foreground" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-foreground">
          Coming <span className="text-foreground/40 italic">Soon.</span>
        </h1>
        
        <p className="max-w-md mx-auto text-lg text-foreground/60 mb-12 leading-relaxed">
          We are currently refining this section to ensure it meets our high standards for reading excellence. Stay tuned for something special.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link 
            href="/" 
            className="flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-80 transition-all group"
          >
            <MoveLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <div className="text-sm font-bold uppercase tracking-widest text-foreground/20">
            Ink Auth Production
          </div>
        </div>
      </div>

      {/* Decorative backdrop */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-foreground/[0.02] rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-foreground/[0.03] rounded-full blur-3xl opacity-50"></div>
      </div>
    </main>
  );
}

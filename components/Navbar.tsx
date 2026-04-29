'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { BookOpen, Menu, X, Search } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-background/80 backdrop-blur-md shadow-sm py-3 border-b border-border" : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" prefetch={false} className="flex items-center space-x-2 group relative z-10">
            <div className="bg-foreground p-1.5 rounded-lg transition-transform group-hover:scale-110">
              <BookOpen className="w-5 h-5 text-background" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">Ink Auth</span>
          </Link>
 
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" prefetch={false} className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">Home</Link>
            <Link href="/library" prefetch={false} className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">Library</Link>
            <Link href="/coming-soon" prefetch={false} className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">Categories</Link>
            <ThemeToggle />
          </div>
 
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2 relative z-10">
            <ThemeToggle />
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-foreground/60 hover:bg-foreground/5 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
 
      {/* Mobile Nav */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-background border-b border-border transition-all duration-300 ${
        isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible pointer-events-none"
      }`}>
        <div className="px-4 pt-2 pb-6 space-y-1">
          <Link href="/" prefetch={false} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-foreground hover:bg-foreground/5 rounded-md">Home</Link>
          <Link href="/library" prefetch={false} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-foreground hover:bg-foreground/5 rounded-md">Library</Link>
          <Link href="/coming-soon" prefetch={false} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-foreground hover:bg-foreground/5 rounded-md">Categories</Link>
          
          <div className="pt-4 px-3">
            <button className="w-full bg-foreground text-background py-3 rounded-full font-medium shadow-lg">Get Started</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
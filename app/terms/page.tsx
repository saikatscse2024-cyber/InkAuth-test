import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ChevronLeft, ShieldCheck, Scale, ScrollText, AlertCircle } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background transition-colors duration-500 pb-32 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] -z-10 rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] -z-10 rounded-full" />

      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 relative">
        <Link 
          href="/"
          className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/30 hover:text-foreground transition-all mb-12"
        >
          <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all">
            <ChevronLeft className="w-4 h-4" />
          </div>
          Back to Home
        </Link>

        <div className="space-y-4 mb-20">
          <div className="inline-block px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400 mb-4">
            Legal Documentation
          </div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter text-foreground leading-none">
            Terms of <span className="text-foreground/40 italic">Service</span>
          </h1>
          <p className="text-lg text-foreground/30 font-medium font-mono">Last updated: April 24, 2026</p>
        </div>

        <div className="space-y-16">
          {/* Section 1 */}
          <section className="group p-8 md:p-12 rounded-[2.5rem] bg-card/40 backdrop-blur-md border border-border hover:border-foreground/10 transition-all duration-500">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <Scale className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground m-0">1. Agreement to Terms</h2>
            </div>
            <div className="space-y-4 text-foreground/60 leading-relaxed text-lg">
              <p>
                By accessing or using <span className="text-foreground font-bold italic">Ink Auth</span>, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service. 
              </p>
              <p>
                These terms apply to all visitors, users, and others who access or use the service.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="group p-8 md:p-12 rounded-[2.5rem] bg-card/40 backdrop-blur-md border border-border hover:border-foreground/10 transition-all duration-500">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <ScrollText className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground m-0">2. Intellectual Property</h2>
            </div>
            <p className="text-foreground/60 leading-relaxed text-lg">
              The service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of Ink Auth and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
            </p>
          </section>

          {/* Section 3 */}
          <section className="group p-8 md:p-12 rounded-[2.5rem] bg-card/40 backdrop-blur-md border border-border hover:border-foreground/10 transition-all duration-500">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground m-0">3. User Conduct</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {[
                "No illegal or unauthorized use of service.",
                "No automated scraping or data collection.",
                "No attempts to breach security measures.",
                "No distribution of harmful software."
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-5 bg-accent/30 rounded-2xl border border-border/50 group/item hover:bg-accent transition-colors">
                  <div className="w-2 h-2 rounded-full bg-emerald-400/40" />
                  <span className="text-sm font-semibold text-foreground/70 group-hover/item:text-foreground transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4 */}
          <section className="group p-8 md:p-12 rounded-[2.5rem] bg-card/40 backdrop-blur-md border border-border hover:border-foreground/10 transition-all duration-500">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground m-0">4. Limitation of Liability</h2>
            </div>
            <p className="text-foreground/60 leading-relaxed text-lg">
              In no event shall Ink Auth, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <div className="pt-20 border-t border-border flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-6">
              <Scale className="w-6 h-6 text-foreground/20" />
            </div>
            <p className="text-foreground/40 text-sm max-w-sm leading-relaxed">
              Questions about our legal framework? <br />
              <Link href="mailto:support@inkauth.com" className="text-foreground font-bold hover:underline transition-all">support@inkauth.com</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

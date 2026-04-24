import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ChevronLeft, Lock, Eye, Database, Globe, Fingerprint } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background transition-colors duration-500 pb-32 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] -z-10 rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-500/10 blur-[120px] -z-10 rounded-full" />

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
          <div className="inline-block px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4">
            Security Protocol
          </div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter text-foreground leading-none">
            Privacy <span className="text-foreground/40 italic">Policy</span>
          </h1>
          <p className="text-lg text-foreground/30 font-medium font-mono">Protocol v2.1.0 — April 24, 2026</p>
        </div>

        <div className="space-y-16">
          {/* Section 1 */}
          <section className="group p-8 md:p-12 rounded-[2.5rem] bg-card/40 backdrop-blur-md border border-border hover:border-foreground/10 transition-all duration-500">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground m-0">1. Information Collection</h2>
            </div>
            <p className="text-foreground/60 leading-relaxed text-lg">
              We are not collecting any information for now, but we may need in future for user login etc. If we need any information we will let you know. Till then you can use the app without any worry.
            </p>
          </section>

          {/* Section 2 */}
          <section className="group p-8 md:p-12 rounded-[2.5rem] bg-card/40 backdrop-blur-md border border-border hover:border-foreground/10 transition-all duration-500">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <Database className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground m-0">2. How We Use Information</h2>
            </div>
            <p className="text-foreground/60 leading-relaxed text-lg mb-8">
              We are not collecting any information for now, but we may need in future for user login etc. If we need any information we will let you know. Till then you can use the app without any worry.  NOTE : we never sell or share your data with any third party and we are not responsable for any data loss or data breach. If any unofficial person collect your data by our name, please verify it. we will not responsible for any loss or damage.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Personalization", desc: "Tailoring the reader experience to your tastes." },
                { title: "Technical Updates", desc: "Sending critical notices and system upgrades." },
                { title: "Direct Support", desc: "Responding to your comments and questions." },
                { title: "Trend Analysis", desc: "Monitoring and optimizing platform usage." }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-accent/30 rounded-2xl border border-border/50 group/item hover:bg-accent transition-colors">
                  <h4 className="font-bold text-foreground mb-1 group-hover/item:text-indigo-400 transition-colors">{item.title}</h4>
                  <p className="text-sm text-foreground/50">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3 */}
          <section className="group p-8 md:p-12 rounded-[2.5rem] bg-card/40 backdrop-blur-md border border-border hover:border-foreground/10 transition-all duration-500">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground m-0">3. Data Security</h2>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <p className="text-foreground/60 leading-relaxed text-lg flex-1">
                We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access. We use industry-standard encryption to protect your data in transit and at rest.
              </p>
              <div className="w-full md:w-48 p-6 bg-accent/50 rounded-3xl border border-border flex flex-col items-center gap-3">
                <Fingerprint className="w-8 h-8 text-blue-400 opacity-50" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 text-center">Encrypted Protocol</span>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="group p-8 md:p-12 rounded-[2.5rem] bg-card/40 backdrop-blur-md border border-border hover:border-foreground/10 transition-all duration-500">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-violet-500/10 rounded-2xl flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground m-0">4. Third-Party Services</h2>
            </div>
            <p className="text-foreground/60 leading-relaxed text-lg">
              Our service may contain links to other sites. If you click on a third-party link, you will be directed to that site. We strongly advise you to review the Privacy Policy of every site you visit.
            </p>
          </section>

          <div className="pt-20 border-t border-border flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-6">
              <Lock className="w-6 h-6 text-foreground/20" />
            </div>
            <p className="text-foreground/40 text-sm max-w-sm leading-relaxed">
              Have concerns about your digital footprint? <br />
              <Link href="mailto:privacy@inkauth.com" className="text-foreground font-bold hover:underline transition-all">privacy@inkauth.com</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";
import { ArrowRight } from "lucide-react";

export default function HomepageCTA() {
  return (
    <section className="bg-slate-900 py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none grid-pattern opacity-10" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px]" />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-10 text-center animate-fade-up">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-500 font-bold mb-6 block">/ Ready to Start?</span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
          Need a Practical Software Solution for Your Business?
        </h2>
        <p className="text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed max-w-3xl mx-auto font-medium">
          Tell us what you're planning. We provide a free consultation, a realistic technical roadmap, and a cost-conscious proposal with no obligation.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/contact"
            className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold btn-glow transition-all text-lg shadow-xl shadow-amber-500/20">
            Start Free Consultation <ArrowRight className="w-5 h-5" />
          </a>
          <a href="/projects"
            className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl border-2 border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-white font-bold transition-all text-lg">
            View Our Work
          </a>
        </div>
      </div>
    </section>
  );
}

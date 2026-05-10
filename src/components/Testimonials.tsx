"use client";
import { useState } from "react";
import { Quote, Star, CheckCircle2 } from "lucide-react";

const testimonials = [
  {
    quote: "The team at Noryant built our Car Guru inventory management app exactly around our dealership workflow. The application is practical, easy to use, and very affordable to maintain. Communication and support throughout the process were excellent.",
    author: "Car Guru Client",
    role: "Dealership Owner",
    initials: "CG"
  },
  {
    quote: "We wanted an educational platform that felt interactive and modern rather than a typical static learning app. Noryant understood the concept clearly and delivered an AI-powered product that makes technical learning much more engaging and accessible for users.",
    author: "AI Ki Paathshala Team",
    role: "EdTech Product Owner",
    initials: "AP"
  },
  {
    quote: "The platform was developed with all the core features we needed, including mock tests, previous-year question workflows, and secure payment integration. The student journey feels smooth, and the backend management was handled very professionally.",
    author: "CET Preparation Platform",
    role: "Education Solution Client",
    initials: "CP"
  },
  {
    quote: "As a small homegrown cake business, we always depended on word-of-mouth and personal contacts for orders. Noryant gave us our very first professional digital presence where customers could explore our cake designs, understand our offerings, and directly send inquiries. It made our business feel more organized, more visible, and much more trustworthy to new customers.",
    author: "Cake Business Client",
    role: "Small Business Owner",
    initials: "CB"
  }
];

export default function Testimonials() {
  const doubled = [...testimonials, ...testimonials];
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="bg-slate-50 relative overflow-hidden py-16 lg:py-20 border-b border-slate-100">
      <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
      <div className="relative z-10">
        <div className="text-center mb-16 animate-fade-up px-6 lg:px-10">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600 font-bold mb-4 block">
            / Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
            What Our Clients Say
          </h2>
        </div>

        <div className="relative mb-16 flex overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
          
          <div 
            className="flex animate-marquee gap-8 w-max px-4"
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {doubled.map((t, i) => (
              <div key={i} className="w-[350px] sm:w-[450px] shrink-0 bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 relative shadow-sm card-lift cursor-default hover:border-amber-200 hover:shadow-xl hover:shadow-amber-900/5 transition-all flex flex-col mt-5">
                {/* Quote icon */}
                <div className="absolute -top-5 left-8 w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <Quote className="w-4 h-4 text-white fill-white" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mt-2 mb-6">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>

                <p className="text-base text-slate-600 leading-relaxed italic mb-8 flex-grow">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 line-clamp-1">{t.author}</div>
                    <div className="text-sm text-slate-500 line-clamp-1">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-4 animate-fade-up px-6 lg:px-10" style={{ animationDelay: "400ms" }}>
          {[
            "Delivered on Time",
            "Practical Workflow Design",
            "Affordable Maintenance"
          ].map((badge) => (
            <div key={badge} className="bg-white px-5 py-2.5 rounded-full border border-slate-200 flex items-center gap-2 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-semibold text-slate-800">{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

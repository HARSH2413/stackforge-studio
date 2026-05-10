"use client";
import { Globe, Smartphone, Bot, Eye, Database, ArrowUpRight, ArrowRight } from "lucide-react";

const preview = [
  { icon: Globe, title: "Website Development", desc: "Professional business websites, admin dashboards, client portals, and lead-generation platforms built for performance.", href: "/services/website-development" },
  { icon: Smartphone, title: "Mobile App Development", desc: "Cross-platform Flutter applications with smooth UX, backend connectivity, and scalable admin controls.", href: "/services/mobile-apps" },
  { icon: Bot, title: "AI Automation", desc: "Smart inquiry bots, OCR systems, workflow automation, and business assistance tools that reduce manual effort.", href: "/services/ai-automation" },
  { icon: Eye, title: "Computer Vision", desc: "Object detection, surveillance intelligence, monitoring systems, and custom visual automation solutions.", href: "/services/computer-vision" },
  { icon: Database, title: "Business Software", desc: "Inventory systems, dealership software, CRM-lite, workflow management tools, and custom internal platforms.", href: "/services/business-software" },
];

export default function HomepageServices() {
  return (
    <section className="bg-slate-50 relative overflow-hidden py-16 lg:py-20">
      <div className="absolute inset-0 gradient-mesh opacity-60 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600 font-bold mb-4 block">/ Services</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
            End-to-End Digital Solutions
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            From concept to deployment, we build software that helps businesses operate smarter and grow faster.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {preview.map((s, i) => {
            const Icon = s.icon;
            return (
              <a key={s.href} href={s.href}
                className="group rounded-3xl p-8 border card-lift flex flex-col items-center bg-white border-slate-200 w-full sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] text-center relative hover:border-amber-200 hover:shadow-xl hover:shadow-amber-900/5 transition-all animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex justify-center mb-6 w-full">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl transition-all bg-slate-50 border border-slate-100 group-hover:bg-amber-50 group-hover:border-amber-200 group-hover:scale-110 shrink-0">
                    <Icon className="w-6 h-6 transition-colors text-slate-600 group-hover:text-amber-600" />
                  </div>
                  <ArrowUpRight className="w-6 h-6 absolute top-8 right-8 transition-transform group-hover:rotate-12 text-slate-300 group-hover:text-amber-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-[var(--font-heading)] text-slate-900 group-hover:text-amber-700 transition-colors">{s.title}</h3>
                <p className="text-base text-slate-500 mb-6 leading-relaxed">{s.desc}</p>
                <div className="mt-auto flex items-center justify-center gap-1.5 text-sm font-bold text-amber-600 group-hover:text-amber-700 transition-colors">
                  Discover more <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            );
          })}
        </div>

        <div className="text-center animate-fade-up" style={{ animationDelay: "500ms" }}>
          <a href="/services"
            className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl border-2 border-slate-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white text-slate-800 font-bold transition-all text-lg bg-white shadow-sm">
            View All Services <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

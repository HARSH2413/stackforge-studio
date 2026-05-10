import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects & Case Studies",
  description:
    "Explore Noryant's real client projects — from Car Guru inventory management to AI automation systems. See how we help businesses digitize and scale.",
};

const mainProject = {
  title: "Car Guru",
  category: "Flutter Mobile Application",
  subtitle: "Second-Hand Car Inventory Management",
  problem: "Manual vehicle stock tracking and customer inquiry handling were inefficient, time-consuming, and difficult to manage consistently.",
  solution: "Built a Flutter-based custom inventory management app with vehicle image management, stock handling, lead status updates, inquiry tracking, and admin controls.",
  costStrategy: "Implemented optimized free-tier integrations and lean backend architecture to ensure low long-term operational cost for the client.",
  outcome: "Improved inventory visibility, smoother dealership workflow, and significantly reduced manual tracking effort.",
  tech: ["Flutter", "Firebase", "Node.js"],
};

const moreProjects = [
  {
    title: "AI ki School",
    subtitle: "AI & Coding Learning Platform",
    desc: "A modern educational platform built to simplify AI and technical learning for students through structured learning paths, guided content, and an engaging beginner-friendly experience.",
    highlights: ["Clean responsive UI", "Scalable course architecture", "SEO-ready structure"],
    tech: ["React", "Responsive Web", "Modular Architecture"],
  },
  {
    title: "CET Preparation Platform",
    subtitle: "Real Exam Simulation System",
    desc: "A niche EdTech platform developed for MHT CET aspirants featuring exam-pattern mock tests, real interface replication, date-wise test navigation, and instant performance analysis.",
    highlights: ["Exam-like experience", "Fast rendering engine", "Student-focused analytics"],
    tech: ["React", "Exam Engine", "Vercel Deployment"],
  },
  {
    title: "Cake Business Website",
    subtitle: "Small Business Digital Presence",
    desc: "A lightweight business inquiry website designed to help a homegrown cake brand showcase products, collect customer inquiries, and establish a more professional digital identity.",
    highlights: ["Lead inquiry collection", "Mobile-friendly UI", "Brand visibility boost"],
    tech: ["Next.js", "React", "Business Inquiry Flow"],
  },
];

const stats = [
  { num: "7+", label: "Projects Delivered" },
  { num: "Multi-Domain", label: "Solutions" },
  { num: "100%", label: "Custom Builds" },
  { num: "Cost-Optimized", label: "Delivery" },
];

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Projects"
          title="Delivered Projects Built Around"
          titleHighlight="Real Client Needs"
          description="Every project we deliver is designed to solve a specific business challenge through practical, scalable, and cost-effective digital solutions."
          cta={{ label: "Start Your Project", href: "/contact" }}
        />

        {/* Stats bar */}
        <section className="bg-slate-900 py-12 border-y border-slate-800">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {stats.map((s) => (
                <div key={s.label} className="group cursor-default">
                  <div className={`font-extrabold text-white font-[var(--font-heading)] mb-1 group-hover:text-amber-500 transition-colors ${s.num.length > 5 ? 'text-xl lg:text-2xl' : 'text-3xl lg:text-4xl'}`}>
                    {s.num}
                  </div>
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Case Study */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-14 animate-fade-up">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600 font-bold mb-4 block">/ Featured Case Study</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">In-Depth Look</h2>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg shadow-slate-900/5 animate-fade-up" style={{ animationDelay: "100ms" }}>
              <div className="grid lg:grid-cols-2">
                {/* Visual side */}
                <div className="relative bg-gradient-to-br from-slate-100 to-slate-50 min-h-[360px] lg:min-h-[520px] flex items-center justify-center">
                  <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
                  <div className="text-center p-12 relative z-10">
                    <div className="inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-slate-900 mb-8 shadow-xl shadow-slate-900/20">
                      <svg className="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                      </svg>
                    </div>
                    <div className="font-mono text-sm text-slate-500 mb-3 tracking-wide">Flutter · Firebase · Node.js</div>
                    <div className="font-bold text-3xl text-slate-900 font-[var(--font-heading)] mb-2">Car Guru</div>
                    <div className="text-slate-500 text-base">Inventory Management App</div>
                  </div>
                  <span className="absolute top-5 left-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 text-xs font-bold text-amber-600 shadow-sm border border-amber-100">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" /> Featured
                  </span>
                </div>

                {/* Content side */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600 font-bold mb-3">{mainProject.category}</span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 font-[var(--font-heading)] mb-1">{mainProject.title}</h3>
                  <p className="text-base text-slate-500 mb-8">{mainProject.subtitle}</p>

                  <div className="space-y-6 mb-8">
                    {[
                      { label: "Problem", text: mainProject.problem, color: "text-red-600 bg-red-50 border-red-100" },
                      { label: "Solution", text: mainProject.solution, color: "text-blue-600 bg-blue-50 border-blue-100" },
                      { label: "Cost Strategy", text: mainProject.costStrategy, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
                    ].map((item) => (
                      <div key={item.label}>
                        <span className={`inline-block text-[11px] font-mono font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full mb-2 border ${item.color}`}>
                          {item.label}
                        </span>
                        <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-amber-50/50 rounded-2xl p-5 flex items-start gap-4 border border-amber-100 mb-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 shrink-0">
                      <ArrowUpRight className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-amber-900 block mb-1">Outcome</span>
                      <span className="text-sm text-amber-800/80 leading-relaxed">{mainProject.outcome}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {mainProject.tech.map((t) => (
                      <span key={t} className="text-xs font-bold font-mono text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* More Projects */}
        <section className="bg-slate-50 py-20 lg:py-28 border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-14 animate-fade-up">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600 font-bold mb-4 block">/ More Projects</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">More Projects</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {moreProjects.map((proj, i) => (
                <div key={i} className="group bg-white rounded-3xl border border-slate-200 p-8 card-lift cursor-default hover:border-amber-200 hover:shadow-xl hover:shadow-amber-900/5 transition-all animate-fade-up w-full sm:w-[calc((100%-32px)/2)] lg:w-[calc((100%-64px)/3)] flex flex-col" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="flex items-start justify-between mb-5">
                    <h4 className="text-xl font-bold text-slate-900 font-[var(--font-heading)] group-hover:text-amber-700 transition-colors">{proj.title}</h4>
                    <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:rotate-12 group-hover:text-amber-500 transition-all shrink-0 mt-1" />
                  </div>
                  <p className="text-sm font-semibold text-amber-600 mb-4">{proj.subtitle}</p>
                  <p className="text-base text-slate-500 leading-relaxed mb-6 flex-grow">{proj.desc}</p>
                  
                  <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100">
                    <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider block mb-2">Key Highlights:</span>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {proj.highlights.map((h) => (
                        <span key={h} className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto pt-5 border-t border-slate-100">
                    {proj.tech.map((t) => (
                      <span key={t} className="text-xs font-bold font-mono text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner
          eyebrow="/ Have a Project in Mind?"
          title="Have a Project in Mind?"
          description="Let's discuss your requirements and build something that actually works for your business."
          primaryLabel="Start a Free Consultation"
          secondaryLabel="Explore Our Services"
          secondaryHref="/services"
        />
      </main>
      <Footer />
    </>
  );
}

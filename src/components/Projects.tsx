"use client";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const mainProject = {
  title: "Car Guru",
  category: "Flutter Mobile Application",
  subtitle: "Second-Hand Car Inventory Management Application",
  desc: "A custom Flutter-based inventory platform developed for a dealership business to manage vehicle stock, inquiry flow, and internal operations with a low-maintenance deployment model.",
  tech: ["Flutter", "Inventory Management", "Cost-Optimized Deployment"],
};

const otherProjects = [
  {
    title: "AI Ki Paathshala",
    category: "EdTech Platform",
    subtitle: "Interactive Learning & Content Management",
    desc: "An AI-powered educational product designed to make technical learning engaging and accessible, replacing traditional static learning apps.",
    tech: ["Next.js", "AI Integration", "Scalable Architecture"],
  },
  {
    title: "CET Prep Portal",
    category: "Web Application",
    subtitle: "Mock Test & Exam Preparation Workflow",
    desc: "A comprehensive preparation platform built with mock tests, previous-year question workflows, and secure payment integration for students.",
    tech: ["React", "Node.js", "Payment Gateway"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="bg-slate-50 py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600 font-bold mb-4 block">
            / Featured Projects
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
            Recent Solutions We&apos;ve Delivered
          </h2>
        </div>

        {/* ── Main Case Study ── */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm mb-8 card-lift animate-fade-up" style={{ animationDelay: "100ms" }}>
          <div className="grid lg:grid-cols-2">
            {/* Image side */}
            <div className="relative bg-slate-100 min-h-[320px] lg:min-h-[480px]">
              <Image
                src="/images/car-guru-mockup.png"
                alt="Car Guru inventory management app"
                fill
                className="object-cover"
              />
              <span className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur shadow-sm text-xs font-bold text-amber-600 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                Featured Project
              </span>
            </div>

            {/* Content side */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 font-[var(--font-heading)] mb-2">
                {mainProject.title}
              </h3>
              <p className="text-lg text-slate-800 font-semibold mb-6">
                {mainProject.subtitle}
              </p>
              <p className="text-base text-slate-500 leading-relaxed mb-8">
                {mainProject.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {mainProject.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-bold font-mono text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a href="/case-studies/car-guru" className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-900 font-bold transition-all w-fit group">
                View Case Study
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* ── Other Projects ── */}
        <div className="grid md:grid-cols-2 gap-8 animate-fade-up" style={{ animationDelay: "200ms" }}>
          {otherProjects.map((proj, i) => (
            <div
              key={i}
              className="group bg-white rounded-3xl border border-slate-200 p-8 card-lift cursor-default flex flex-col hover:border-amber-200 hover:shadow-xl hover:shadow-amber-900/5 transition-all"
            >
              <h4 className="text-2xl font-bold text-slate-900 font-[var(--font-heading)] mb-2 group-hover:text-amber-700 transition-colors">
                {proj.title}
              </h4>
              <p className="text-base font-semibold text-slate-800 mb-4">
                {proj.subtitle}
              </p>
              <p className="text-base text-slate-500 leading-relaxed mb-8 flex-grow">
                {proj.desc}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {proj.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-bold font-mono text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

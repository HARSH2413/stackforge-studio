"use client";
import { PiggyBank, Layers, HeartHandshake, Users } from "lucide-react";

const points = [
  {
    icon: PiggyBank,
    title: "Cost-Optimized Architecture",
    desc: "We strategically build lean systems that minimize long-term running cost.",
    tag: "Budget Friendly",
  },
  {
    icon: Layers,
    title: "Fully Custom Workflows",
    desc: "Every product is built around the actual business process, not generic templates.",
    tag: "Tailor Made",
  },
  {
    icon: HeartHandshake,
    title: "6 Months Complimentary Support",
    desc: "Post-launch bug fixes, minor technical guidance, and smooth assistance included.",
    tag: "Peace of Mind",
  },
  {
    icon: Users,
    title: "Direct Team Collaboration",
    desc: "Clients work directly with the development team for faster execution and communication.",
    tag: "No Middlemen",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-white py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto animate-fade-up">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600 font-bold mb-4 block">
            / Why Businesses Work With Noryant
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
            Built for Businesses That Need Practical, Not Overpriced Software
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            We focus on creating digital solutions that solve operational problems without forcing businesses into complex enterprise systems or unnecessary recurring expenses.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="group bg-white rounded-3xl border border-slate-200 p-8 card-lift cursor-default hover:border-amber-200 hover:shadow-xl hover:shadow-amber-900/5 transition-all animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start gap-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 group-hover:bg-amber-50 group-hover:scale-110 border border-slate-100 group-hover:border-amber-200 transition-all shrink-0">
                    <Icon className="w-6 h-6 text-slate-600 group-hover:text-amber-600 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-[var(--font-heading)] mb-2 group-hover:text-amber-700 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-base text-slate-500 leading-relaxed mb-4">
                      {p.desc}
                    </p>
                    <span className="inline-block text-xs font-mono font-bold text-amber-600 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full">
                      {p.tag}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

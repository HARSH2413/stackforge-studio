"use client";
import { PiggyBank, MessageCircle, Code2, Users, RefreshCw, Zap } from "lucide-react";

const advantages = [
  { icon: PiggyBank, title: "Affordable vs Traditional Agencies", desc: "Get professional-grade software at a fraction of the cost of traditional development agencies." },
  { icon: MessageCircle, title: "Fast Communication Cycle", desc: "Direct access to the development team. No middlemen, no delays in decision-making." },
  { icon: Code2, title: "Custom Development Only", desc: "Every solution is built from scratch for your specific business needs. No cookie-cutter templates." },
  { icon: Users, title: "Dedicated Technical Team", desc: "A focused team of engineers working exclusively on your project during development." },
  { icon: RefreshCw, title: "Long-Term Support", desc: "We offer ongoing maintenance and support packages so your software stays updated and functional." },
  { icon: Zap, title: "Cost-Conscious Architecture", desc: "Every technical decision is made keeping your operational costs in mind." },
];

export default function Advantages() {
  return (
    <section className="bg-slate-900 py-24 lg:py-32 relative overflow-hidden">
      {/* Decorative blurred orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-500 font-medium mb-4 block">
            / Our Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Why Businesses Trust Us
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            We combine technical expertise with business understanding to deliver
            solutions that actually make a difference.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((a, i) => {
            const Icon = a.icon;
            return (
              <div
                key={i}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800 transition-colors cursor-default"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 border border-slate-700 mb-6">
                  <Icon className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 font-[var(--font-heading)]">{a.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{a.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";
import { Check, Target, Zap, Globe } from "lucide-react";

const pillars = [
  { icon: Target, title: "Mission-Driven", desc: "Every line of code serves a clear business purpose." },
  { icon: Zap, title: "Cost-Optimized", desc: "Free-tier and lean infrastructure for long-term savings." },
  { icon: Globe, title: "Scalable", desc: "Start small, scale big — without rebuilding from scratch." },
];

export default function About() {
  return (
    <section id="about" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600 font-medium mb-4 block">
              / About Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              A Digital Solutions Studio Built for{" "}
              <span className="relative inline-block">
                Real Growth
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-amber-500/30 rounded-full" />
              </span>
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed mb-6">
              We are a growing digital solutions studio focused on transforming business
              requirements into practical software products. Our team specializes in building
              websites, mobile apps, AI automations, and internal management systems that are
              affordable, scalable, and practical to maintain.
            </p>
            <p className="text-base text-slate-500 leading-relaxed mb-8">
              We believe technology should simplify business operations — not increase
              unnecessary recurring costs. That&apos;s our founding principle.
            </p>

            <div className="space-y-3">
              {[
                "Custom solutions tailored to your workflow",
                "Cost-optimized infrastructure & deployment",
                "Startup-friendly pricing models",
                "Complimentary post-launch support",
              ].map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-50">
                    <Check className="w-3.5 h-3.5 text-amber-600" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm font-medium text-slate-600">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Stats + Pillar Cards */}
          <div className="space-y-6">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "7+", label: "Projects Delivered" },
                { num: "100%", label: "Custom Development" },
                { num: "6 Months", label: "Complimentary Support" },
                { num: "Cost-Optimized", label: "Solutions" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100 card-lift cursor-default"
                >
                  <div className="text-2xl font-extrabold text-slate-900 font-[var(--font-heading)]">
                    {s.num}
                  </div>
                  <div className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-wider">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Pillar cards */}
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="flex items-start gap-4 bg-slate-50 rounded-2xl p-5 border border-slate-100 card-lift cursor-default"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200 shrink-0">
                    <Icon className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{p.title}</h4>
                    <p className="text-sm text-slate-500 mt-0.5">{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
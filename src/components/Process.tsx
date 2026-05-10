"use client";
import { MessageSquare, Calendar, PenTool, Zap, Rocket, Wrench } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Requirement Discussion",
    desc: "We deeply understand your business workflow, pain points, and goals before writing a single line of code.",
    icon: MessageSquare,
  },
  {
    num: "02",
    title: "Workflow Planning",
    desc: "We map out the technical architecture, database design, and user flow to ensure everything fits perfectly.",
    icon: Calendar,
  },
  {
    num: "03",
    title: "UI/UX Design",
    desc: "Beautiful, intuitive interfaces designed for your users. We prototype before building so you see it first.",
    icon: PenTool,
  },
  {
    num: "04",
    title: "Agile Development",
    desc: "Iterative development with regular updates. You stay in the loop and can provide feedback at every stage.",
    icon: Zap,
  },
  {
    num: "05",
    title: "Testing & Deployment",
    desc: "Rigorous testing across devices and scenarios. We deploy to cost-optimized infrastructure for maximum reliability.",
    icon: Rocket,
  },
  {
    num: "06",
    title: "Ongoing Maintenance",
    desc: "Post-launch support, bug fixes, and feature updates. We don't disappear after delivery.",
    icon: Wrench,
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-white py-24 lg:py-32 border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600 font-medium mb-4 block">
            / Our Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            How We Work
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            A proven, structured process that ensures quality delivery every time.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="bg-slate-50 border border-slate-100 rounded-2xl p-8 relative card-lift cursor-default"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-slate-200">
                    <Icon className="w-5 h-5 text-slate-600" />
                  </div>
                  <span className="text-4xl font-extrabold text-slate-200 font-[var(--font-heading)] select-none">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-[var(--font-heading)] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

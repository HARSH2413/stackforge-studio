"use client";
import { CheckCircle2, Zap, Target, Users, Wrench } from "lucide-react";

const items = [
  { icon: CheckCircle2, text: "Delivered Real Client Solutions" },
  { icon: Zap, text: "Cost-Optimized Development" },
  { icon: Target, text: "Startup Friendly Pricing" },
  { icon: Users, text: "End-to-End Technical Support" },
  { icon: Wrench, text: "Custom Built for Every Workflow" },
];

export default function TrustStrip() {
  const doubled = [...items, ...items];

  return (
    <section className="bg-slate-900 py-5 overflow-hidden border-y border-slate-800">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-2.5 mx-10 shrink-0"
            >
              <Icon className="w-4 h-4 text-amber-500" strokeWidth={2} />
              <span className="text-sm font-medium text-slate-300">{item.text}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

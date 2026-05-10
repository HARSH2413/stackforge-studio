"use client";
import { Globe, Smartphone, Bot, Eye, Database, ArrowUpRight, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Custom Website Development",
    desc: "Professional business websites, admin dashboards, client portals, and ecommerce systems built for performance.",
    href: "/services/website-development",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Flutter-based Android & iOS applications with seamless backend integrations and beautiful interfaces.",
    href: "/services/mobile-apps",
  },
  {
    icon: Bot,
    title: "AI Automation Solutions",
    desc: "Chatbots, OCR systems, smart workflow automations, and AI integrations that reduce manual work.",
    href: "/services/ai-automation",
  },
  {
    icon: Eye,
    title: "Computer Vision Engineering",
    desc: "Monitoring systems, object detection, smart surveillance, and industrial automation powered by OpenCV.",
    href: "/services/computer-vision",
  },
  {
    icon: Database,
    title: "Business Software Systems",
    desc: "Inventory software, CRM-lite, ERP-lite, dealership systems, and management tools for your operations.",
    href: "/services/business-software",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-slate-50 dot-pattern py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600 font-medium mb-4 block">
            / Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            End-to-End Digital Solutions
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            From concept to deployment, we build software that drives real business results
            — without the enterprise price tag.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-5">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <a
                key={s.href}
                href={s.href}
                className="group rounded-2xl p-7 border card-lift flex flex-col items-center bg-white border-slate-200 w-full sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)] text-center relative"
              >
                <div className="flex justify-center mb-5 w-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl transition-colors bg-slate-100 group-hover:bg-amber-500">
                    <Icon className="w-6 h-6 transition-colors text-slate-600 group-hover:text-slate-900" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 absolute top-7 right-7 transition-transform group-hover:rotate-12 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-[var(--font-heading)] text-slate-900">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500 mb-5">
                  {s.desc}
                </p>
                <div className="mt-auto flex items-center justify-center gap-1.5 text-sm font-semibold text-amber-600 group-hover:text-amber-700 transition-colors">
                  Discover more <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

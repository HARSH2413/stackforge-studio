import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { Check, Users, Settings, PiggyBank, Headset } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Practical Software. Built for Real Business Growth. Affordable, scalable, and easy to maintain custom digital systems.",
};

const whatWeBuild = [
  "Business Websites",
  "Web Applications",
  "Mobile Applications",
  "AI Automation Systems",
  "Internal CRM / ERP Tools",
];

const stats = [
  { num: "7+", label: "Projects Delivered" },
  { num: "100%", label: "Custom Development" },
  { num: "6 Months", label: "Complimentary Support" },
  { num: "Cost-Optimized", label: "Solutions" },
];

const whyChooseUs = [
  { icon: Users, title: "Direct Technical Collaboration", desc: "You work directly with the development team, enabling faster decisions and smoother execution." },
  { icon: Settings, title: "Built Around Your Workflow", desc: "Every system is custom developed for your business process, not forced into generic templates." },
  { icon: PiggyBank, title: "Cost-Efficient & Scalable", desc: "Lean technologies and smart architecture keep both development and long-term ownership affordable." },
  { icon: Headset, title: "Ongoing Technical Support", desc: "We continue supporting, improving, and maintaining your systems after launch." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="About Us"
          title="Practical Software. Built for"
          titleHighlight="Real Business Growth."
          description="We are a software development studio helping startups and businesses build custom digital systems that solve operational problems, improve efficiency, and support long-term growth. From websites and mobile apps to AI automations and internal business software, we create solutions that are scalable, maintainable, and aligned with real business goals."
          cta={{ label: "Work With Us", href: "/contact" }}
        />

        {/* Why We Started */}
        <section className="bg-white py-24 lg:py-32 border-b border-slate-100 relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
          <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-up">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600 font-medium mb-6 block">/ Why We Started</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-8 leading-tight">A Better Alternative to Expensive Agencies & Unreliable Freelancers</h2>
              <div className="text-lg text-slate-600 leading-relaxed space-y-6 mb-12">
                <p>Many businesses struggle between two poor choices: overpriced software agencies or low-quality freelance execution.</p>
                <p>We built this studio to provide a smarter middle ground — professional custom software development with direct communication, transparent pricing, and practical long-term thinking.</p>
              </div>
              <div className="bg-white/80 backdrop-blur-md border border-amber-200/60 rounded-3xl p-10 max-w-2xl mx-auto shadow-xl shadow-amber-900/5 relative card-lift">
                <div className="absolute -top-6 -left-4 text-7xl text-amber-200 font-serif opacity-60">"</div>
                <p className="text-amber-950 font-semibold text-xl leading-relaxed font-[var(--font-heading)] relative z-10">
                  Our goal is simple: build software that adds business value without adding technical chaos.
                </p>
                <div className="absolute -bottom-10 -right-4 text-7xl text-amber-200 font-serif opacity-60">"</div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Build + Studio Snapshot */}
        <section className="bg-slate-50 py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 gradient-mesh opacity-60 pointer-events-none" />
          <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="animate-fade-up" style={{ animationDelay: "100ms" }}>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600 font-medium mb-6 block">/ What We Build + Studio Snapshot</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-10 leading-tight">Custom Solutions Across Business-Critical Areas</h2>
                <div className="space-y-4">
                  {whatWeBuild.map((item, i) => (
                    <div key={item} className="group flex items-center gap-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-200 transition-all card-lift" style={{ animationDelay: `${i * 100}ms` }}>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 shrink-0 border border-amber-100 group-hover:scale-110 transition-transform">
                        <Check className="w-6 h-6 text-amber-600" strokeWidth={3} />
                      </div>
                      <span className="text-slate-800 font-semibold text-lg">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 animate-fade-up" style={{ animationDelay: "200ms" }}>
                {stats.map((s) => (
                  <div key={s.label} className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center border border-slate-200 card-lift cursor-default shadow-sm hover:shadow-xl hover:shadow-amber-900/5 transition-all group flex flex-col justify-center items-center h-full min-h-[160px]">
                    <div className={`font-extrabold text-slate-900 font-[var(--font-heading)] mb-3 group-hover:text-amber-600 transition-colors ${s.num.length > 5 ? 'text-2xl lg:text-3xl' : 'text-4xl lg:text-5xl'}`}>{s.num}</div>
                    <div className="text-sm font-mono text-slate-500 uppercase tracking-wider font-semibold">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Businesses Choose Us */}
        <section className="bg-slate-900 py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
            <div className="text-center mb-20 max-w-3xl mx-auto animate-fade-up">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-500 font-medium mb-6 block">/ Why Businesses Choose Us</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">Fast Execution. Clear Communication. Long-Term Reliability.</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-8 lg:gap-10">
              {whyChooseUs.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="group bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 hover:bg-slate-800/80 hover:border-slate-600 transition-all card-lift animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900/80 border border-slate-700 shrink-0 group-hover:scale-110 group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-all">
                        <Icon className="w-8 h-8 text-amber-500" />
                      </div>
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">{p.title}</h3>
                        <p className="text-base text-slate-400 leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Commitment */}
        <section className="bg-white py-24 lg:py-32 border-b border-slate-200 relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
          <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center relative z-10 animate-fade-up">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600 font-medium mb-6 block">/ Our Commitment</span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-10 leading-tight">We Build Systems <br className="hidden sm:block" /><span className="text-amber-600">Designed to Last</span></h2>
            <div className="text-xl text-slate-600 leading-relaxed space-y-6 max-w-3xl mx-auto">
              <p>We believe software should be a long-term business asset, not a short-term patch.</p>
              <p>Every product we build is engineered with performance, maintainability, and future scalability in mind — so your business can grow without rebuilding from scratch.</p>
            </div>
          </div>
        </section>

        <CTABanner
          title="Ready to Build Something Useful?"
          description="Whether you need a customer platform, an internal management system, or an automation workflow, we help transform requirements into software that works in the real world."
          secondaryLabel="Start a Project With Us"
          secondaryHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}

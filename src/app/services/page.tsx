import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { services } from "@/lib/services-data";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "End-to-end digital solutions for businesses. Custom websites, Flutter mobile apps, AI automation, computer vision, business management software, and startup MVP development.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Services"
          title="End-to-End Digital Solutions for"
          titleHighlight="Modern Businesses"
          description="From concept to deployment, we build software that drives real business results — without the enterprise price tag."
          cta={{ label: "Get Free Consultation", href: "/contact" }}
        />

        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="text-center mb-16">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600 font-bold mb-4 block">
                / What We Build
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                Custom Digital Solutions for Real Business Needs
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
                Every solution is built around your workflow, goals, and business growth — no templates, no bloated systems.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              {services.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group rounded-3xl p-8 border card-lift flex flex-col items-center text-center bg-white border-slate-200 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-900/5 transition-all animate-fade-up w-full sm:w-[calc((100%-32px)/2)] lg:w-[calc((100%-64px)/3)] relative"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="flex justify-center mb-6 w-full">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl transition-all bg-slate-50 border border-slate-100 group-hover:bg-amber-50 group-hover:border-amber-200 group-hover:scale-110 shrink-0">
                        <Icon className="w-6 h-6 transition-colors text-slate-600 group-hover:text-amber-600" />
                      </div>
                      <ArrowUpRight className="w-6 h-6 absolute top-8 right-8 transition-transform group-hover:rotate-12 text-slate-300 group-hover:text-amber-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 font-[var(--font-heading)] text-slate-900 group-hover:text-amber-700 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-base leading-relaxed mb-6 text-slate-500 flex-grow">
                      {s.shortDesc}
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      {s.tech.slice(0, 3).map((t) => (
                        <span key={t} className="text-xs font-bold font-mono text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-5 border-t border-slate-100 w-full flex items-center justify-center gap-1.5 text-sm font-bold text-amber-600 group-hover:text-amber-700 transition-colors">
                      Discover more <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <CTABanner
          eyebrow="/ Need Guidance?"
          title="Not Sure Which Service Fits Your Business?"
          description="Tell us about your requirement and our team will recommend the most practical technical solution with zero consultation charges."
          primaryLabel="Start Free Consultation"
          secondaryLabel="View Our Projects"
          secondaryHref="/projects"
        />
      </main>
      <Footer />
    </>
  );
}

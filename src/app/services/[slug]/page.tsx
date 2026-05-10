import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import { services } from "@/lib/services-data";
import { Check, ArrowRight, ArrowUpRight } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.shortDesc,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = service.icon;
  const otherServices = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative bg-slate-900 pt-32 pb-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "48px 48px"
            }}
          />
          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex items-center gap-2 mb-5 text-sm text-slate-500">
              <a href="/services" className="hover:text-amber-500 transition-colors">Services</a>
              <span>/</span>
              <span className="text-slate-300">{service.title}</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-800 border border-slate-700">
                <Icon className="w-7 h-7 text-amber-500" />
              </div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-500 font-medium">/ Service</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 max-w-3xl leading-[1.05]">
              {service.title}
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed mb-8">
              {service.fullDesc}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold btn-glow transition-colors"
            >
              Get a Free Quote
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Features + Tech */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Features */}
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600 font-medium mb-4 block">/ What's Included</span>
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Key Capabilities</h2>
                <div className="space-y-4">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-start gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-50 shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-amber-600" strokeWidth={2.5} />
                      </div>
                      <span className="text-sm font-medium text-slate-600">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech stack + CTA card */}
              <div className="space-y-6">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600 font-medium mb-4 block">/ Tech Stack</span>
                  <h3 className="text-xl font-bold text-slate-900 mb-5">Technologies We Use</h3>
                  <div className="flex flex-wrap gap-3">
                    {service.tech.map((t) => (
                      <span key={t} className="text-sm font-mono font-semibold text-slate-700 bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm hover:bg-amber-500 hover:text-slate-900 hover:border-amber-500 transition-colors cursor-default">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick CTA */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-white mb-3">Ready to Start?</h3>
                  <p className="text-sm text-slate-400 mb-6">
                    Tell us about your project. We&apos;ll assess your needs and propose a cost-effective solution within 24 hours.
                  </p>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold btn-glow transition-colors text-sm"
                  >
                    Start a Conversation
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Services */}
        <section className="bg-slate-50 py-20 border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-10">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600 font-medium mb-2 block">/ Also Available</span>
              <h2 className="text-2xl font-bold text-slate-900">Other Services</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {otherServices.map((s) => {
                const OtherIcon = s.icon;
                return (
                  <a
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group bg-white border border-slate-200 rounded-2xl p-6 card-lift block"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 group-hover:bg-amber-500 transition-colors">
                        <OtherIcon className="w-5 h-5 text-slate-600 group-hover:text-slate-900 transition-colors" />
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:rotate-12 transition-transform" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">{s.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{s.shortDesc}</p>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}

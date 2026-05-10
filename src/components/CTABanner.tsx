import { ArrowRight } from "lucide-react";

interface CTABannerProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTABanner({
  eyebrow,
  title = "Ready to Build Something Great?",
  description = "Tell us about your project and we'll propose a practical, cost-effective solution. Free consultation, no obligations.",
  primaryLabel = "Start a Free Consultation",
  primaryHref = "/contact",
  secondaryLabel = "View Our Work",
  secondaryHref = "/projects",
}: CTABannerProps) {
  return (
    <section className="bg-slate-900 py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-10 text-center">
        {eyebrow && (
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-500 font-bold mb-4 block">
            {eyebrow}
          </span>
        )}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          {title}
        </h2>
        <p className="text-lg text-slate-400 mb-8 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={primaryHref}
            className="inline-flex items-center gap-2 h-12 px-7 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold btn-glow transition-colors"
          >
            {primaryLabel}
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href={secondaryHref}
            className="inline-flex items-center gap-2 h-12 px-7 rounded-lg border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold transition-colors"
          >
            {secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

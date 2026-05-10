import { ArrowRight } from "lucide-react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  titleHighlight?: string;
  description: string;
  cta?: { label: string; href: string };
}

export default function PageHero({ eyebrow, title, titleHighlight, description, cta }: PageHeroProps) {
  return (
    <section className="relative bg-slate-900 pt-32 pb-20 overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/8 rounded-full blur-[100px] pointer-events-none" />
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-500 font-medium mb-5 block">
          / {eyebrow}
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 max-w-4xl leading-[1.05]">
          {title}{" "}
          {titleHighlight && (
            <span className="relative inline-block">
              <span className="text-amber-500">{titleHighlight}</span>
            </span>
          )}
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl leading-relaxed mb-8">
          {description}
        </p>
        {cta && (
          <a
            href={cta.href}
            className="inline-flex items-center gap-2 h-12 px-7 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold transition-colors btn-glow"
          >
            {cta.label}
            <ArrowRight className="w-4 h-4" />
          </a>
        )}
      </div>
    </section>
  );
}

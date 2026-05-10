"use client";
import { ArrowRight, Play, Sparkles, CheckCircle2 } from "lucide-react";

const codeLines = [
  { indent: 0, tokens: [{ text: "const", color: "#F472B6" }, { text: " project", color: "#E2E8F0" }, { text: " = ", color: "#94A3B8" }, { text: "{", color: "#E2E8F0" }] },
  { indent: 1, tokens: [{ text: "client", color: "#67E8F9" }, { text: ":  ", color: "#94A3B8" }, { text: "'GrowingBusiness'", color: "#6EE7B7" }, { text: ",", color: "#94A3B8" }] },
  { indent: 1, tokens: [{ text: "stack", color: "#67E8F9" }, { text: ":   ", color: "#94A3B8" }, { text: "['Next.js', 'Flutter', 'Node.js']", color: "#6EE7B7" }, { text: ",", color: "#94A3B8" }] },
  { indent: 1, tokens: [{ text: "deployment", color: "#67E8F9" }, { text: ": ", color: "#94A3B8" }, { text: "'cost-optimized'", color: "#6EE7B7" }, { text: ",", color: "#94A3B8" }] },
  { indent: 1, tokens: [{ text: "support", color: "#67E8F9" }, { text: ": ", color: "#94A3B8" }, { text: "'6 months free'", color: "#6EE7B7" }, { text: ",", color: "#94A3B8" }] },
  { indent: 1, tokens: [{ text: "scalable", color: "#67E8F9" }, { text: ":  ", color: "#94A3B8" }, { text: "true", color: "#FBBF24" }, { text: ",", color: "#94A3B8" }] },
  { indent: 1, tokens: [{ text: "philosophy", color: "#67E8F9" }, { text: ": ", color: "#94A3B8" }, { text: "'Practical digital solutions.'", color: "#6EE7B7" }] },
  { indent: 0, tokens: [{ text: "};", color: "#E2E8F0" }] },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center gradient-mesh grid-pattern overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ── Left content ── */}
          <div className="lg:col-span-6 xl:col-span-7 animate-fade-up">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600 font-bold">
                Software Development Studio
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-slate-900 mb-6">
              Affordable Custom Software Built for{" "}
              <span className="relative inline-block text-amber-600">
                Real Business Needs
                <span className="absolute -bottom-2 left-0 w-full h-2 bg-amber-200 rounded-full mix-blend-multiply" />
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mb-10 font-medium">
              We are a growing software development studio helping businesses automate workflows, manage operations, and build practical digital solutions through scalable, low-maintenance technology.
            </p>

            {/* CTA Row */}
            <div className="flex flex-wrap items-center gap-4 mb-14">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold btn-glow transition-all shadow-xl shadow-slate-900/20 text-lg"
              >
                Get Free Consultation
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/projects"
                className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl bg-white border-2 border-slate-200 hover:border-slate-900 hover:bg-slate-50 text-slate-900 font-bold transition-all text-lg"
              >
                <Play className="w-5 h-5" />
                View Our Work
              </a>
            </div>

            {/* Trust Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
              {[
                { metric: "6+", label: "Solutions Delivered" },
                { metric: "100%", label: "Custom Development" },
                { metric: "6 Months", label: "Complimentary Support" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-extrabold text-slate-900 font-[var(--font-heading)]">
                    {s.metric}
                  </div>
                  <div className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-wider font-semibold">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Code Window ── */}
          <div className="lg:col-span-6 xl:col-span-5 relative animate-fade-up" style={{ animationDelay: "200ms" }}>
            <div className="animate-float">
              <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/30">
                {/* Chrome bar */}
                <div className="flex items-center gap-2 px-5 py-4 bg-slate-950/80 border-b border-slate-800/50">
                  <span className="w-3.5 h-3.5 rounded-full bg-red-500/80" />
                  <span className="w-3.5 h-3.5 rounded-full bg-amber-500/80" />
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-4 text-xs font-mono text-slate-400">noryant-project.ts</span>
                </div>

                {/* Code body */}
                <div className="p-8 font-mono text-[14px] leading-relaxed">
                  {codeLines.map((line, i) => (
                    <div key={i} style={{ paddingLeft: `${line.indent * 28}px` }} className="mb-1">
                      {line.tokens.map((token, j) => (
                        <span key={j} style={{ color: token.color }}>{token.text}</span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating tags */}
              <div className="absolute -bottom-8 -left-8 right-8 flex flex-wrap justify-center gap-3 pointer-events-none">
                {[
                  "Deployed",
                  "Free-tier Optimized",
                  "Low Maintenance"
                ].map((tag) => (
                  <div key={tag} className="bg-white/90 backdrop-blur-sm shadow-xl shadow-amber-900/5 border border-amber-100 rounded-full px-5 py-2.5 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-semibold text-slate-800">{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

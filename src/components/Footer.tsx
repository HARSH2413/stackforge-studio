"use client";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

const serviceLinks = [
  { label: "Website Development", href: "/services/website-development" },
  { label: "Mobile Apps", href: "/services/mobile-apps" },
  { label: "AI Automation", href: "/services/ai-automation" },
  { label: "Computer Vision", href: "/services/computer-vision" },
  { label: "Business Software", href: "/services/business-software" },
];

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 pt-24 pb-8 border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-slate-800">

          {/* Brand */}
          <div className="lg:col-span-4 xl:col-span-5">
            <a href="/" className="flex items-center gap-3.5 group mb-8 w-fit">
              <div className="relative animate-levitate">
                <div className="h-14 w-14 rounded-2xl logo-glass-dark shadow-lg shadow-sky-500/5 group-hover:shadow-sky-500/15 transition-all duration-300 overflow-hidden flex items-center justify-center">
                  <Image
                    src="/images/noryant-logo.png"
                    alt="Noryant"
                    width={200}
                    height={200}
                    className="w-[80%] h-[80%] object-contain logo-glow"
                  />
                </div>
              </div>
              <span className="text-[15px] font-bold tracking-[0.28em] text-white/90 font-[var(--font-brand)] uppercase group-hover:text-sky-400 transition-colors duration-300 select-none">
                NORYANT
              </span>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
              Noryant builds scalable software systems, AI tools, and operational platforms for modern businesses.
            </p>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-[0.15em] mb-6">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-slate-400 hover:text-amber-500 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-[0.15em] mb-6">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-slate-400 hover:text-amber-500 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="lg:col-span-3 xl:col-span-2">
            <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-[0.15em] mb-6">Connect</h4>
            <ul className="space-y-4">
              {[
                { label: "hello@noryant.com", href: "mailto:hello@noryant.com" },
                // { label: "WhatsApp", href: "https://wa.me/919999999999" },
                { label: "LinkedIn", href: "https://www.linkedin.com/company/noryant" },
                // { label: "GitHub", href: "https://github.com/noryant" },
              ].map((c) => (
                <li key={c.label}>
                  <a href={c.href} target="_blank" rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors break-all">
                    {c.label}
                    <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-500 transition-colors shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex justify-center text-center">
          <p className="text-xs text-slate-500 font-mono">© 2026 Noryant. Practical Digital Solutions for Modern Businesses.</p>
        </div>
      </div>
    </footer>
  );
}

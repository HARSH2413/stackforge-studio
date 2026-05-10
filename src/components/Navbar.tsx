"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";

const serviceLinks = [
  { label: "Website Development", href: "/services/website-development" },
  { label: "Mobile Apps (Flutter)", href: "/services/mobile-apps" },
  { label: "AI Automation", href: "/services/ai-automation" },
  { label: "Computer Vision", href: "/services/computer-vision" },
  { label: "Business Software", href: "/services/business-software" },

];

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close dropdown & mobile menu on route change
  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/services"
      ? pathname.startsWith("/services")
      : pathname === href;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b ${
      scrolled
        ? "border-slate-200 shadow-md backdrop-blur-md bg-white/90"
        : "border-transparent bg-white"
    }`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between">

          {/* Logo — Anti-Gravity */}
          <a href="/" className="flex items-center gap-3 group py-1">
            <div className="relative animate-levitate">
              <div className="h-10 w-10 rounded-xl logo-glass shadow-sm group-hover:shadow-lg transition-all duration-300 overflow-hidden flex items-center justify-center">
                <Image
                  src="/images/noryant-logo.png"
                  alt="Noryant"
                  width={200}
                  height={200}
                  className="h-[85%] w-[85%] object-contain logo-glow"
                  priority
                />
              </div>
            </div>
            <span className="text-[13px] font-bold tracking-[0.28em] text-slate-800 font-[var(--font-brand)] uppercase group-hover:text-sky-600 transition-colors duration-300 select-none">
              NORYANT
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">

            {/* Services dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className={`relative flex items-center gap-1 text-sm font-medium transition-colors duration-200 ${
                  isActive("/services")
                    ? "text-amber-600"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Services
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                {/* Active underline */}
                {isActive("/services") && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-amber-500 rounded-full" />
                )}
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 animate-fade-up">
                  <div className="px-3 pt-2 pb-1 mb-1 border-b border-slate-100">
                    <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-slate-400">Services</span>
                  </div>
                  {serviceLinks.map((link) => (
                    <a key={link.href} href={link.href}
                      onClick={() => setServicesOpen(false)}
                      className={`block px-3 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                        pathname === link.href
                          ? "text-amber-600 bg-amber-50"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}>
                      {link.label}
                    </a>
                  ))}
                  <div className="mt-1 pt-1 border-t border-slate-100">
                    <a href="/services" onClick={() => setServicesOpen(false)}
                      className="flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-xl transition-colors">
                      View All Services <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <a key={link.href} href={link.href}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-amber-600"
                    : "text-slate-600 hover:text-slate-900"
                }`}>
                {link.label}
                {/* Animated underline */}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-amber-500 rounded-full transition-all duration-300 ${
                  isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </a>
            ))}

            <a href="/contact"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-900 text-sm font-semibold btn-glow transition-colors">
              Start a Project <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-900 transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white py-6 space-y-2 animate-fade-up">
            {/* Services accordion */}
            <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex items-center justify-between text-base font-medium text-slate-600 hover:text-slate-900 py-2 px-1">
              Services
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileServicesOpen && (
              <div className="pl-4 space-y-1 border-l-2 border-amber-500/30 ml-1 mb-2">
                {serviceLinks.map((link) => (
                  <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                    className={`block text-sm font-medium py-1.5 ${
                      pathname === link.href ? "text-amber-600" : "text-slate-500 hover:text-slate-900"
                    }`}>
                    {link.label}
                  </a>
                ))}
                <a href="/services" onClick={() => setMobileOpen(false)}
                  className="block text-sm font-semibold text-amber-600 py-1.5">
                  View All →
                </a>
              </div>
            )}

            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className={`block text-base font-medium py-2 ${
                  isActive(link.href) ? "text-amber-600" : "text-slate-600 hover:text-slate-900"
                }`}>
                {link.label}
              </a>
            ))}

            <a href="/contact" onClick={() => setMobileOpen(false)}
              className="inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold btn-glow w-full justify-center mt-4">
              Start a Project <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

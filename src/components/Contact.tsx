"use client";
import { useState } from "react";
import { Mail, Phone, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", whatsapp: "", requirement: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/chatbot-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          projectDescription: formData.requirement,
          conversationSource: "Homepage Contact Section",
          timestamp: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setFormData({ name: "", email: "", whatsapp: "", requirement: "" });
      toast.success("Message sent successfully! We'll get back to you within 24 hours.");
    } catch {
      toast.error("Something went wrong. Please try again or email us at hello@noryant.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative bg-slate-50 py-24 lg:py-32 gradient-mesh border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left - Info */}
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600 font-medium mb-4 block">
              / Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              Let&apos;s Discuss Your Project
            </h2>
            <p className="text-lg text-slate-500 mb-10 leading-relaxed">
              Tell us about your business needs and we&apos;ll propose a practical, 
              cost-effective solution. Free consultation, no obligations.
            </p>

            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email Us", value: "hello@noryant.com", href: "mailto:hello@noryant.com" },
                // { icon: Phone, label: "WhatsApp", value: "Connect on WhatsApp", href: "https://wa.me/919999999999" },
                { icon: Linkedin, label: "LinkedIn", value: "Noryant", href: "https://www.linkedin.com/company/noryant" },
              ].map((contact) => {
                const Icon = contact.icon;
                return (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-5 p-5 bg-white border border-slate-200 rounded-2xl hover:border-amber-500 hover:shadow-md transition-all group"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 group-hover:bg-amber-50 transition-colors shrink-0">
                      <Icon className="w-5 h-5 text-slate-600 group-hover:text-amber-600 transition-colors" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-500 mb-1">{contact.label}</div>
                      <div className="text-sm font-bold text-slate-900">{contact.value}</div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-10 shadow-xl shadow-slate-200/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900 font-[var(--font-heading)] mb-6">
                Start a Conversation
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all placeholder:text-slate-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all placeholder:text-slate-400"
                  />
                </div>

{/*                 <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all placeholder:text-slate-400"
                  />
                </div> */}

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Project Requirements</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your project, business needs, and goals..."
                    value={formData.requirement}
                    onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all placeholder:text-slate-400 resize-y"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold btn-glow transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Discuss My Project
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

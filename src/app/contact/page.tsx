import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { Mail, Clock, MessageCircle, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Stackforge Studio for a free project consultation. Tell us about your business needs and we'll propose a practical, cost-effective solution.",
};

const faqs = [
  { q: "How long does a typical project take?", a: "Depending on complexity, simple websites usually take 2–4 weeks, mobile applications 4–8 weeks, and more advanced business software 6–12 weeks. We always provide a clear timeline before development begins." },
  { q: "Do you offer post-launch support?", a: "Yes. Every delivered project includes 6 months complimentary technical support, along with optional long-term maintenance if required." },
  { q: "How do you keep costs low?", a: "We use cost-optimized infrastructure, free-tier integrations where suitable, and build only the features you actually need — no unnecessary bloat or avoidable recurring expenses." },
  { q: "Can you work with a limited budget?", a: "Absolutely. We are a startup-friendly studio. We discuss your budget upfront and recommend the most practical MVP-first or phased development approach." },
  { q: "What information do I need to start?", a: "Just a rough idea is enough. We will guide you through the planning, features, and technical decisions during the free consultation. No technical knowledge is required." },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Contact"
          title="Let's Build Something"
          titleHighlight="Together"
          description="Tell us about your requirement, idea, or business problem — our team will get back to you within 24 hours with a practical technical approach."
        />

        {/* Contact body */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-16 items-start">

              {/* Left info */}
              <div className="animate-fade-up">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600 font-bold mb-4 block">/ Reach Out</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                  Get Your Free Consultation
                </h2>
                <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
                  No commitments, no obligations — just a direct discussion to understand your requirement and suggest the most cost-effective development path.
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    { icon: Mail, label: "Email Us", value: "hello@stackforgestudio.in", href: "mailto:hello@stackforgestudio.in" },
                    { icon: MessageCircle, label: "WhatsApp", value: "Chat with us on WhatsApp", href: "https://wa.me/919999999999" },
                    { icon: Clock, label: "Response Time", value: "Within 24 hours on business days", href: undefined },
                  ].map((contact) => {
                    const Icon = contact.icon;
                    const inner = (
                      <>
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-amber-50 group-hover:border-amber-200 transition-all shrink-0">
                          <Icon className="w-6 h-6 text-slate-600 group-hover:text-amber-600 transition-colors" />
                        </div>
                        <div>
                          <div className="text-xs font-mono font-bold text-slate-400 mb-1 uppercase tracking-wider">{contact.label}</div>
                          <div className="text-base font-bold text-slate-900">{contact.value}</div>
                        </div>
                      </>
                    );
                    return contact.href ? (
                      <a key={contact.label} href={contact.href} target={contact.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                        className="flex items-center gap-5 p-5 bg-white border border-slate-200 rounded-2xl hover:border-amber-200 hover:shadow-xl hover:shadow-amber-900/5 transition-all group card-lift">
                        {inner}
                      </a>
                    ) : (
                      <div key={contact.label} className="flex items-center gap-5 p-5 bg-slate-50 border border-slate-100 rounded-2xl group">
                        {inner}
                      </div>
                    );
                  })}
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-3">
                  {["Free Consultation", "Practical Proposal", "24 Hour Response"].map((badge) => (
                    <div key={badge} className="bg-white px-4 py-2 rounded-full border border-slate-200 flex items-center gap-2 shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-semibold text-slate-800">{badge}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right form */}
              <div className="animate-fade-up" style={{ animationDelay: "150ms" }}>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-slate-50 py-20 lg:py-28 border-t border-slate-100">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <div className="text-center mb-14 animate-fade-up">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600 font-bold mb-4 block">/ FAQ</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">Common Questions</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-3xl p-8 card-lift hover:border-amber-200 hover:shadow-xl hover:shadow-amber-900/5 transition-all animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 font-[var(--font-heading)]">{faq.q}</h3>
                  <p className="text-base text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

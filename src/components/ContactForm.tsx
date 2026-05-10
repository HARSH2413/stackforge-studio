"use client";
import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", whatsapp: "", service: "", requirement: "" });
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
          service: formData.service,
          projectDescription: formData.requirement,
          conversationSource: "Contact Page Form",
          timestamp: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setFormData({ name: "", email: "", whatsapp: "", service: "", requirement: "" });
      toast.success("Message sent! We'll get back to you within 24 hours.");
    } catch {
      toast.error("Something went wrong. Please try again or email us at hello@noryant.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:bg-white transition-all placeholder:text-slate-400";

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 lg:p-10 shadow-xl shadow-slate-200/50">
      <form onSubmit={handleSubmit} className="space-y-5">
        <h3 className="text-2xl font-bold text-slate-900 font-[var(--font-heading)] mb-1">Share Your Requirement With Us</h3>
        <p className="text-sm text-slate-500 mb-6 font-medium">We respond within 24 hours on business days.</p>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">Full Name</label>
            <input type="text" required placeholder="John Doe" value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClasses} />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">Email Address</label>
            <input type="email" required placeholder="john@company.com" value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClasses} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">WhatsApp Number</label>
            <input type="tel" required placeholder="+91 99999 99999" value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              className={inputClasses} />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">Service Needed</label>
            <select value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className={inputClasses}>
              <option value="">Select a service...</option>
              <option value="website">Website Development</option>
              <option value="mobile">Mobile App Development</option>
              <option value="ai">AI Automation</option>
              <option value="cv">Computer Vision</option>
              <option value="business">Business Software</option>
              <option value="other">Other / Not Sure</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-900 mb-2">Project Requirements</label>
          <textarea required rows={5} placeholder="Briefly describe what you need, what problem you're trying to solve, or what type of software you're planning."
            value={formData.requirement} onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
            className={`${inputClasses} resize-y`} />
        </div>

        <button type="submit" disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 h-14 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-base btn-glow transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30">
          {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" />Sending...</> : <>Send Message <Send className="w-4 h-4" /></>}
        </button>
      </form>
    </div>
  );
}

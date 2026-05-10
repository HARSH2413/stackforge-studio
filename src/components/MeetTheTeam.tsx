"use client";
import { ExternalLink } from "lucide-react";

const team = [
  {
    name: "Harsh Malokar",
    role: "Full Stack Development & Product Planning",
    image: "https://ui-avatars.com/api/?name=Harsh+Malokar&background=f59e0b&color=fff&size=200",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Member 2",
    role: "Mobile App & UI Engineering",
    image: "https://ui-avatars.com/api/?name=Member+2&background=0f172a&color=fff&size=200",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Member 3",
    role: "Backend / AI Automation Engineering",
    image: "https://ui-avatars.com/api/?name=Member+3&background=0f172a&color=fff&size=200",
    linkedin: "https://linkedin.com",
  },
];

export default function MeetTheTeam() {
  return (
    <section className="bg-white py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600 font-bold mb-4 block">
            / Meet The Team
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
            A Focused Team Building Practical Software
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {team.map((member, i) => (
            <div key={i} className="group bg-slate-50 rounded-3xl p-8 border border-slate-200 text-center relative shadow-sm card-lift cursor-default hover:border-amber-200 hover:shadow-xl hover:shadow-amber-900/5 transition-all animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-md group-hover:scale-105 transition-transform">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-[var(--font-heading)] mb-2 group-hover:text-amber-700 transition-colors">
                {member.name}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6 font-medium">
                {member.role}
              </p>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 hover:bg-amber-100 hover:text-amber-600 text-slate-600 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

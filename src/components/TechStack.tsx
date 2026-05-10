"use client";
import Image from "next/image";

const techs = [
  { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "OpenCV", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
];

export default function TechStack() {
  return (
    <section id="tech" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600 font-medium mb-4 block">
            / Technology
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            Our Tech Stack
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            We use industry-proven technologies to build reliable, scalable solutions.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 lg:gap-6 max-w-4xl mx-auto">
          {techs.map((tech) => (
            <div
              key={tech.name}
              className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col items-center gap-3 w-[120px] lg:w-[140px] hover:bg-white hover:border-amber-500 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <Image
                src={tech.icon}
                alt={tech.name}
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="text-xs font-semibold text-slate-600">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

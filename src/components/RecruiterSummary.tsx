"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useMotionTemplate, useMotionValue } from "framer-motion";
import { GraduationCap, Briefcase, Code, Download, Mail, Sparkles, CheckCircle } from "lucide-react";
import { profile } from "../data/profile";
import { siteConfig } from "../data/siteConfig";
import { trackEvent } from "../utils/analytics";
import Magnetic from "./motion/Magnetic";

export default function RecruiterSummary() {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0
      );
      setIsMobile(window.innerWidth < 768);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || isTouchDevice || shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleResumeDownload = () => {
    trackEvent("Resume Downloaded", { path: siteConfig.resumePath });
  };

  const handleContactClick = (medium: string) => {
    trackEvent("Recruiter Contact Triggered", { medium });
  };

  const keySkills = ["React", "Node.js", "Express", "Python", "SQL", "Power BI", "Looker Studio"];

  return (
    <div className="w-full max-w-5xl mx-auto my-16 px-6 sm:px-0 select-text">
      {/* Container Card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl border border-red-500/10 bg-gradient-to-br from-red-500/[0.01] via-rose-500/[0.01] to-orange-500/[0.01] p-8 md:p-10 relative overflow-hidden group shadow-lg shadow-red-500/[0.01] hover:border-red-500/20 hover:shadow-red-500/[0.02] transition-all duration-300 bg-white/40"
      >
        {/* Spotlight overlay (desktop only) */}
        {!isMobile && !isTouchDevice && !shouldReduceMotion && (
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
            style={{
              background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255, 59, 48, 0.04), transparent 80%)`,
            }}
          />
        )}

        {/* Decorative corner tag */}
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-full text-[9px] font-bold text-red-500 font-mono tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" /> 30s Summary
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
          
          {/* Left Block: Name, University, Contact Actions */}
          <div className="md:col-span-5 flex flex-col justify-between h-full">
            <div>
              <span className="text-[10px] font-bold text-red-500 font-mono tracking-widest uppercase">COMPUTER SCIENCE ENGINEERING</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-black mt-1 mb-2">
                {profile.name}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-normal mb-6">
                Active B.Tech student at Sanskriti University, specializing in software engineering, PostgreSQL querying, and BI dashboards.
              </p>

              {/* Education badges list */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <div className="w-7 h-7 rounded-lg bg-black/5 flex items-center justify-center shrink-0 text-gray-500">
                    <GraduationCap className="w-4.5 h-4.5" />
                  </div>
                  <span>Sanskriti University (B.Tech CSE, Grad: {profile.education.graduationYear})</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <div className="w-7 h-7 rounded-lg bg-black/5 flex items-center justify-center shrink-0 text-gray-500">
                    <Briefcase className="w-4.5 h-4.5" />
                  </div>
                  <span>2 Internships (Elevate Labs, Excelerate)</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <div className="w-7 h-7 rounded-lg bg-black/5 flex items-center justify-center shrink-0 text-gray-500">
                    <Code className="w-4.5 h-4.5" />
                  </div>
                  <span>2 Major Projects (Campus Connect, SIH Platform)</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mt-auto">
              <Magnetic>
                <a
                  href={siteConfig.resumePath}
                  download
                  onClick={handleResumeDownload}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-bold text-xs shadow-md shadow-red-500/10 hover:shadow-red-500/25 transition-all duration-300 group/btn cursor-pointer"
                >
                  Download Resume
                </a>
              </Magnetic>

              <Magnetic>
                <a
                  href={`mailto:${siteConfig.email}`}
                  onClick={() => handleContactClick("email")}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-black/5 hover:border-black/15 text-gray-700 hover:text-black transition-all font-bold text-xs shadow-sm cursor-pointer"
                >
                  Email Me <Mail className="w-4 h-4" />
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Right Block: Core Skills & Quick Highlights */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 md:pt-0 md:pl-8 md:border-l border-black/5 h-full">
            {/* Core Tech Stack */}
            <div>
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono mb-4">Core Skills</h4>
              <div className="flex flex-wrap gap-2">
                {keySkills.map(skill => (
                  <span key={skill} className="text-xs bg-black/3 border border-black/5 px-2.5 py-1.5 rounded-xl text-gray-700 font-semibold transition-all hover:bg-red-500/5 hover:border-red-500/20 hover:text-red-600">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Milestones */}
            <div>
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono mb-4">Key Metrics</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5 text-xs text-gray-600 leading-normal">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Looker & Power BI dashboard creator</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-gray-600 leading-normal">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Full-Stack chat & marketplace systems</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-gray-600 leading-normal">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Active SQL and Pandas analytics tools</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-gray-600 leading-normal">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>B.Tech Computer Science Engineering candidate</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap, Briefcase, Code, Download, Mail, Phone, ExternalLink, Sparkles, CheckCircle2, Copy, Check, Terminal, ShieldAlert, Trophy } from "lucide-react";
import { useState } from "react";
import { profile } from "../data/profile";
import { siteConfig } from "../data/siteConfig";
import { experiences, achievements } from "../data/experience";
import { projects } from "../data/projects";
import { trackEvent } from "../utils/analytics";
import Magnetic from "./motion/Magnetic";

interface RecruiterDashboardProps {
  onExit: () => void;
}

export default function RecruiterDashboard({ onExit }: RecruiterDashboardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}${window.location.pathname}?recruiter=true`;
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      trackEvent("Recruiter Share Link Copied", { url: shareUrl });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleResumeDownload = () => {
    trackEvent("Resume Downloaded from Recruiter Dashboard", { path: siteConfig.resumePath });
  };

  const handleContactClick = (medium: string) => {
    trackEvent("Recruiter Contact Triggered", { medium });
  };

  // Group skills into clean arrays
  const skillsCategories = [
    { name: "Programming", skills: ["Python", "SQL", "JavaScript", "C++"] },
    { name: "BI & Analytics", skills: ["Power BI", "Looker Studio", "Pandas", "Data Visualisation"] },
    { name: "Frontend & Web", skills: ["React", "Next.js", "Tailwind CSS", "HTML5/CSS3"] },
    { name: "Backend", skills: ["Node.js", "Express.js", "REST APIs", "MongoDB", "PostgreSQL"] }
  ];

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-7xl mx-auto pt-24 pb-20 px-6 md:px-12 select-text"
    >
      {/* Top Banner Alert / Share Option */}
      <div className="mb-8 p-4 rounded-2xl border border-red-500/15 bg-red-500/[0.02] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 text-xs text-red-600 font-medium">
          <Sparkles className="w-4.5 h-4.5 text-red-500 animate-pulse shrink-0" />
          <span><strong>Recruiter Mode Active:</strong> Bookmark this view or copy the direct link to share.</span>
        </div>
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-red-500/15 hover:border-red-500/30 hover:bg-red-500/[0.02] text-xs font-bold text-red-600 transition-all cursor-pointer shadow-sm shrink-0"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" /> Link Copied
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" /> Copy Dashboard Link
            </>
          )}
        </button>
      </div>

      {/* Premium KPI Telemetry Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: "Internship Metrics",
            value: "2",
            subtitle: "Completed Positions",
            details: "Elevate Labs & Excelerate",
            icon: <Briefcase className="w-5 h-5 text-red-500" />,
            color: "from-red-500/10 to-rose-500/5",
            borderColor: "border-red-500/10"
          },
          {
            title: "Project Metrics",
            value: "4+",
            subtitle: "Core Web Products",
            details: "Campus Connect, HeritageAI",
            icon: <Code className="w-5 h-5 text-rose-500" />,
            color: "from-rose-500/10 to-pink-500/5",
            borderColor: "border-rose-500/10"
          },
          {
            title: "Certification Metrics",
            value: "5+",
            subtitle: "Verified Credentials",
            details: "AWS Academy, Python, DBMS",
            icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
            color: "from-emerald-500/10 to-teal-500/5",
            borderColor: "border-emerald-500/10"
          },
          {
            title: "Achievement Counters",
            value: "Winner",
            subtitle: "SIH '24 Finalist",
            details: "Ministry of Education, GoI",
            icon: <Trophy className="w-5 h-5 text-amber-500" />,
            color: "from-amber-500/10 to-yellow-500/5",
            borderColor: "border-amber-500/10"
          }
        ].map((kpi, idx) => (
          <motion.div
            key={kpi.title}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.01 }}
            className={`rounded-3xl border ${kpi.borderColor} bg-white/40 p-5 shadow-sm glass-panel flex flex-col justify-between relative overflow-hidden transition-all duration-350`}
          >
            {/* Ambient visual glow */}
            <div className={`absolute -right-6 -top-6 w-16 h-16 rounded-full bg-gradient-to-br ${kpi.color} filter blur-xl opacity-60 pointer-events-none`} />
            
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest font-mono">
                  {kpi.title}
                </span>
                <span className="text-[10px] text-gray-500 font-semibold mt-0.5">
                  {kpi.subtitle}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-black/[0.02] border border-black/[0.04]">
                {kpi.icon}
              </div>
            </div>

            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-extrabold text-black tracking-tight leading-none">
                {kpi.value}
              </span>
            </div>

            <p className="text-[10px] text-gray-400 font-medium font-mono mt-3 truncate">
              {kpi.details}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Grid Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Summary & Rapid Access (4 Columns) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Main Candidate Card */}
          <div className="rounded-3xl border border-black/5 bg-white/40 p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden glass-panel">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-red-500 font-mono tracking-widest uppercase">
                B.TECH CSE CANDIDATE (2027)
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight leading-none">
                {profile.name}
              </h1>
              <p className="text-sm font-semibold text-gray-500">
                Sanskriti University
              </p>
            </div>
            
            <div className="w-full h-[1px] bg-black/5" />
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-xs text-gray-600">
                <GraduationCap className="w-4.5 h-4.5 text-gray-500 shrink-0" />
                <span>B.Tech Computer Science Engineering</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-600">
                <Briefcase className="w-4.5 h-4.5 text-gray-500 shrink-0" />
                <span>2 Data Analytics/BI Internships</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-600">
                <Code className="w-4.5 h-4.5 text-gray-500 shrink-0" />
                <span>Full-Stack Web Architectures</span>
              </div>
            </div>

            <div className="w-full h-[1px] bg-black/5 mt-1" />

            {/* Direct Rapid Call-To-Actions */}
            <div className="flex flex-col gap-2.5 mt-2">
              <a
                href={siteConfig.resumePath}
                download
                onClick={handleResumeDownload}
                className="w-full py-3.5 justify-center inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-bold text-xs shadow-md shadow-red-500/10 hover:shadow-red-500/25 transition-all duration-300 group cursor-pointer"
              >
                Download PDF Resume <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>
              <button
                onClick={onExit}
                className="w-full py-3 rounded-xl bg-black/[0.03] border border-black/5 hover:border-black/15 text-gray-700 hover:text-black hover:bg-black/[0.05] transition-all font-bold text-xs cursor-pointer"
              >
                View Full Interactive Site
              </button>
            </div>
          </div>

          {/* Quick Summary Card */}
          <div className="rounded-3xl border border-black/5 bg-white/40 p-6 shadow-sm glass-panel">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono mb-3.5">
              30s Profile Summary
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed font-normal">
              Active Computer Science student with practical internships. Proficient in database aggregates (SQL/PostgreSQL), business intelligence reports (Power BI/Looker Studio), and clean full-stack web products (Next.js/React/Node). Highly focused on analytical engineering and clean architectural patterns.
            </p>
          </div>

          {/* Direct Contact Card */}
          <div className="rounded-3xl border border-black/5 bg-white/40 p-6 shadow-sm glass-panel flex flex-col gap-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
              Contact Channels
            </h3>
            
            <div className="flex flex-col gap-3">
              <a 
                href={`mailto:${siteConfig.email}`}
                onClick={() => handleContactClick("email")}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/[0.02] border border-transparent hover:border-red-500/10 text-xs font-semibold text-gray-700 hover:text-red-600 transition-all"
              >
                <Mail className="w-4.5 h-4.5 text-red-500 shrink-0" />
                <span>{siteConfig.email}</span>
              </a>
              <a 
                href={`tel:${siteConfig.phone}`}
                onClick={() => handleContactClick("phone")}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/[0.02] border border-transparent hover:border-red-500/10 text-xs font-semibold text-gray-700 hover:text-red-600 transition-all"
              >
                <Phone className="w-4.5 h-4.5 text-rose-500 shrink-0" />
                <span>{siteConfig.phone}</span>
              </a>
              <a 
                href="https://github.com/113vab"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/[0.02] border border-transparent hover:border-red-500/10 text-xs font-semibold text-gray-700 hover:text-red-600 transition-all"
              >
                <Code className="w-4.5 h-4.5 text-gray-500 shrink-0" />
                <span className="flex items-center gap-1">github.com/113vab <ExternalLink className="w-3 h-3 opacity-50" /></span>
              </a>
            </div>
          </div>
          
        </div>

        {/* RIGHT COLUMN: Journey, Projects, Skills (8 Columns) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Categorized Skills Dashboard */}
          <div className="rounded-3xl border border-black/5 bg-white/40 p-6 md:p-8 shadow-sm glass-panel">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono mb-5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-red-500 animate-pulse" /> Core Skills Matrix
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skillsCategories.map((cat) => (
                <div key={cat.name} className="flex flex-col gap-2.5">
                  <h4 className="text-xs font-bold text-black border-l-2 border-red-500 pl-2">
                    {cat.name}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-mono text-gray-700 bg-black/[0.03] border border-black/5 px-2.5 py-1 rounded-lg hover:border-red-500/10 hover:text-red-600 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Internships & Milestones journey */}
          <div className="rounded-3xl border border-black/5 bg-white/40 p-6 md:p-8 shadow-sm glass-panel flex flex-col gap-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
              Professional Internships
            </h3>
            
            <div className="flex flex-col gap-6 pl-4 border-l border-black/5">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative flex flex-col gap-1.5 group">
                  {/* Visual bullet marker */}
                  <div className="absolute -left-[22px] top-1.5 w-3 h-3 rounded-full bg-red-500/20 group-hover:bg-red-500 transition-colors border border-white" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-base font-extrabold text-black">
                      {exp.role} @ <span className="text-red-600">{exp.company}</span>
                    </h4>
                    <span className="text-xs font-mono font-bold text-gray-400 sm:text-right">
                      {exp.date}
                    </span>
                  </div>
                  
                  {/* Highlights list */}
                  <ul className="space-y-1.5 mt-2">
                    {exp.highlights.map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Hackathon Achievement */}
              {achievements.map((ach) => (
                <div key={ach.id} className="relative flex flex-col gap-1.5 group pt-2 border-t border-black/5">
                  <div className="absolute -left-[22px] top-[14px] w-3 h-3 rounded-full bg-rose-500/20 group-hover:bg-rose-500 transition-colors border border-white" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-base font-extrabold text-black">
                      {ach.title}
                    </h4>
                    <span className="text-xs font-mono font-bold text-gray-400 sm:text-right">
                      {ach.date}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-rose-500 font-mono tracking-widest uppercase block -mt-1">
                    {ach.issuer}
                  </span>
                  <p className="text-xs text-gray-500 leading-relaxed font-normal mt-1.5">
                    {ach.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects Dashboard */}
          <div className="rounded-3xl border border-black/5 bg-white/40 p-6 md:p-8 shadow-sm glass-panel flex flex-col gap-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
              Featured Web Products
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div 
                  key={proj.id}
                  className="p-5 rounded-2xl border border-black/5 bg-white/50 flex flex-col justify-between hover:border-red-500/10 hover:shadow-md transition-all duration-300"
                >
                  <div>
                    <h4 className="text-sm font-extrabold text-black mb-1.5 group-hover:text-red-500">
                      {proj.title}
                    </h4>
                    <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-wider text-red-500 bg-red-500/5 px-2 py-0.5 rounded-md mb-3">
                      {proj.category}
                    </span>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4">
                      {proj.desc}
                    </p>
                  </div>
                  
                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {proj.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="text-[9px] font-mono text-gray-500 bg-black/3 px-1.5 py-0.5 rounded border border-black/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Links */}
                    <div className="flex gap-4 border-t border-black/5 pt-3 mt-auto">
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold text-gray-500 hover:text-red-600 transition-colors inline-flex items-center gap-1"
                      >
                        Code
                      </a>
                      <a
                        href={proj.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold text-gray-500 hover:text-red-600 transition-colors inline-flex items-center gap-1 ml-auto"
                      >
                        Live Demo <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}

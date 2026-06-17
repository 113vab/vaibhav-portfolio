"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowDown, Sparkles, FolderGit2, FileDown, Mail, Briefcase, GitBranch, Target, Terminal, Trophy, Cpu, Activity } from "lucide-react";
import { profile } from "../data/profile";
import { siteConfig } from "../data/siteConfig";
import Magnetic from "./motion/Magnetic";

interface HeroProps {
  setRecruiterMode?: (val: boolean) => void;
}

export default function Hero({ setRecruiterMode }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Switch to mobile grid for tablets/mobiles
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  // Parallax layers for 3D depth illusion on desktop
  const githubY = useTransform(scrollY, [0, 500], [0, -45]);
  const projectsY = useTransform(scrollY, [0, 500], [0, 20]);
  const skillsYPanel = useTransform(scrollY, [0, 500], [0, -60]);
  const recruiterY = useTransform(scrollY, [0, 500], [0, 35]);
  const experienceY = useTransform(scrollY, [0, 500], [0, -25]);
  const certsY = useTransform(scrollY, [0, 500], [0, 15]);

  const handleScrollTo = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleRecruiterClick = () => {
    if (setRecruiterMode) {
      setRecruiterMode(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("recruiter", "true");
        window.history.pushState({}, "", url.toString());
      }
    }
  };

  const headlineWords = profile.headline.split(" ");
  const subHeadlineWords = profile.subHeadline.split(" ");

  // Render methods for the 6 custom operating system modules
  const renderGithubPanel = () => (
    <button 
      onClick={() => handleScrollTo("github")}
      className="flex flex-col gap-2 text-left w-full h-full cursor-pointer focus:outline-none"
    >
      <div className="flex items-center justify-between w-full">
        <span className="text-[8px] font-bold text-gray-400 font-mono tracking-wider uppercase flex items-center gap-1">
          <GitBranch className="w-3.5 h-3.5 text-red-500 animate-pulse" /> GitHub Commits
        </span>
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
      </div>
      <div className="grid grid-cols-7 gap-0.5 mt-1 pointer-events-none">
        {Array.from({ length: 21 }).map((_, idx) => {
          const intensities = ["bg-black/5", "bg-red-500/10", "bg-red-500/25", "bg-red-500/40", "bg-red-500/60"];
          const bg = intensities[Math.floor(Math.sin(idx + 2) * 2.2) + 2] || "bg-black/5";
          return <span key={idx} className={`w-3 h-3 rounded-sm ${bg}`} />;
        })}
      </div>
    </button>
  );

  const renderInternshipPanel = () => (
    <button 
      onClick={() => handleScrollTo("certifications")}
      className="flex flex-col gap-1 text-left w-full h-full cursor-pointer focus:outline-none"
    >
      <div className="flex items-center justify-between w-full">
        <span className="text-[8px] font-bold text-gray-400 font-mono tracking-wider uppercase flex items-center gap-1">
          <Briefcase className="w-3.5 h-3.5 text-red-500" /> Experience
        </span>
        <span className="text-[7px] font-bold text-rose-600 bg-red-500/5 border border-red-500/10 px-1.5 py-0.5 rounded uppercase">ACTIVE</span>
      </div>
      <h4 className="text-[10px] font-bold text-black mt-1">2 Data Analyst Internships</h4>
      <p className="text-[9px] text-gray-500 leading-normal">Looker dashboards & Postgres DB querying metrics.</p>
    </button>
  );

  const renderSkillsPanel = () => (
    <button 
      onClick={() => handleScrollTo("vaibhav-core")}
      className="flex flex-col gap-1 text-left w-full h-full cursor-pointer focus:outline-none"
    >
      <span className="text-[8px] font-bold text-gray-400 font-mono tracking-wider uppercase flex items-center gap-1">
        <Terminal className="w-3.5 h-3.5 text-gray-400" /> Core Tech
      </span>
      <div className="flex flex-col gap-0.5 text-[9px] text-gray-600 mt-1 w-full font-mono">
        <div className="flex justify-between border-b border-black/5 pb-0.5">
          <span>Python:</span>
          <span className="font-bold text-black">85%</span>
        </div>
        <div className="flex justify-between border-b border-black/5 pb-0.5">
          <span>React UI:</span>
          <span className="font-bold text-black">85%</span>
        </div>
        <div className="flex justify-between">
          <span>SQL DBs:</span>
          <span className="font-bold text-black">92%</span>
        </div>
      </div>
    </button>
  );

  const renderProjectsPanel = () => (
    <button 
      onClick={() => handleScrollTo("projects")}
      className="flex flex-col gap-1 text-left w-full h-full cursor-pointer focus:outline-none"
    >
      <span className="text-[8px] font-bold text-gray-400 font-mono tracking-wider uppercase flex items-center gap-1">
        <FolderGit2 className="w-3.5 h-3.5 text-rose-500" /> Project Engine
      </span>
      <h4 className="text-[10px] font-bold text-black mt-1">4+ Core Deployed Apps</h4>
      <p className="text-[9px] text-gray-500 leading-normal">Campus Connect & SIH 2024 Tourism Platform maps flow.</p>
    </button>
  );

  const renderCertificationsPanel = () => (
    <button 
      onClick={() => handleScrollTo("certifications")}
      className="flex flex-col gap-1 text-left w-full h-full cursor-pointer focus:outline-none"
    >
      <span className="text-[8px] font-bold text-gray-400 font-mono tracking-wider uppercase flex items-center gap-1">
        <Trophy className="w-3.5 h-3.5 text-amber-500" /> Credentials
      </span>
      <h4 className="text-[10px] font-bold text-black mt-1">AWS Certified Associate</h4>
      <p className="text-[9px] text-gray-500 leading-normal">5+ verified badges, databases, & analytical certifications.</p>
    </button>
  );

  const renderRecruiterModePanel = () => (
    <button 
      onClick={handleRecruiterClick}
      className="flex flex-col gap-1.5 text-left w-full h-full cursor-pointer focus:outline-none"
    >
      <div className="flex items-center justify-between w-full">
        <span className="text-[8px] font-bold text-red-500 font-mono tracking-wider uppercase flex items-center gap-1">
          <Activity className="w-3.5 h-3.5 text-red-500 animate-pulse" /> Telemetry Control
        </span>
      </div>
      <div className="mt-1 w-full py-1.5 text-center bg-red-500 text-white rounded-lg font-bold text-[9px] font-mono tracking-wide uppercase hover:bg-red-600 transition-colors shadow-sm">
        👔 Recruiter Mode (30s)
      </div>
    </button>
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-6 md:px-12 overflow-hidden bg-gradient-to-b from-red-50/20 via-rose-50/10 to-white select-none"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 relative">
        
        {/* Left Side: Standard Introduction Headline */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-[10px] font-bold uppercase tracking-wider text-red-600 border border-red-500/15 mb-6 shadow-sm bg-white/50 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>{profile.name} // OS VERSION 1.2</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 text-black select-none flex flex-col items-center lg:items-start">
            <span className="block overflow-hidden py-1 flex flex-wrap gap-x-2.5">
              {headlineWords.map((word, idx) => (
                <motion.span
                  key={idx}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 85, damping: 16, delay: 0.1 + idx * 0.04 }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden py-1 flex flex-wrap gap-x-2.5">
              {subHeadlineWords.map((word, idx) => (
                <motion.span
                  key={idx}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 85, damping: 16, delay: 0.35 + idx * 0.04 }}
                  className="inline-block bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 bg-clip-text text-transparent"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Bio Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-sm sm:text-base text-gray-500 max-w-xl mb-10 leading-relaxed font-normal"
          >
            {profile.role} specializing in Data Analytics, Business Intelligence, and Full-Stack Development. Welcome to the cockpit control center.
          </motion.p>

          {/* CTA Buttons Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-wrap justify-center lg:justify-start items-center gap-3.5 w-full"
          >
            <Magnetic>
              <button
                onClick={() => handleScrollTo("projects")}
                className="relative overflow-hidden flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white shadow-md shadow-red-500/10 hover:shadow-red-500/25 transition-all duration-300 group cursor-pointer"
              >
                {!shouldReduceMotion && (
                  <motion.span
                    initial={{ x: "-150%" }}
                    whileHover={{ x: ["-150%", "150%"] }}
                    transition={{ repeat: Infinity, repeatType: "loop", duration: 2.5, ease: [0.16, 1, 0.3, 1], repeatDelay: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-20 pointer-events-none"
                  />
                )}
                <FolderGit2 className="w-4 h-4 z-10" />
                <span className="relative z-10">Explore Work</span>
              </button>
            </Magnetic>

            <Magnetic>
              <a
                href={siteConfig.resumePath}
                download={`${profile.name.replace(/\s+/g, "_")}_Resume.pdf`}
                className="relative overflow-hidden flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs bg-white border border-black/10 hover:border-black/20 text-gray-800 hover:text-black hover:bg-white shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-md group"
              >
                {!shouldReduceMotion && (
                  <motion.span
                    initial={{ x: "-150%" }}
                    whileHover={{ x: ["-150%", "150%"] }}
                    transition={{ repeat: Infinity, repeatType: "loop", duration: 2.5, ease: [0.16, 1, 0.3, 1], repeatDelay: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent skew-x-20 pointer-events-none"
                  />
                )}
                <FileDown className="w-4 h-4 text-red-500 z-10" />
                <span className="relative z-10">Get Resume</span>
              </a>
            </Magnetic>

            <Magnetic>
              <button
                onClick={() => handleScrollTo("contact")}
                className="relative overflow-hidden flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs bg-black/[0.03] border border-black/5 hover:border-black/15 text-gray-700 hover:text-black hover:bg-black/[0.06] transition-all duration-300 backdrop-blur-sm group cursor-pointer"
              >
                <Mail className="w-4 h-4 z-10" />
                <span className="relative z-10">Contact</span>
              </button>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right Side: OS Floating Command Center Visualizer */}
        <div className="lg:col-span-6 flex justify-center items-center relative min-h-[380px] lg:min-h-[460px] w-full">
          
          {/* DESKTOP HOLOGRAPHIC COCKPIT */}
          {!isMobile ? (
            <div className="relative w-full aspect-[4/3] max-w-lg pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
              
              {/* Pulsing Vaibhav Reactor Core Center Node */}
              <div 
                style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
                className="absolute z-30"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 via-rose-500 to-rose-600 text-white font-extrabold text-[8px] uppercase tracking-wider flex flex-col items-center justify-center border border-white/20 shadow-xl shadow-red-500/20 select-none relative">
                  <div className="absolute inset-0 rounded-full border border-white/10 border-t-white animate-[spin_8s_linear_infinite]" />
                  <Cpu className="w-3.5 h-3.5 mb-0.5 animate-pulse" />
                  <span className="text-[6px] font-mono opacity-80 leading-none">CORE</span>
                  <span className="font-extrabold text-[9px] tracking-tight leading-none mt-0.5">VAIBHAV</span>
                </div>
                <div className="absolute inset-0 rounded-full bg-red-500/10 filter blur-md animate-pulse pointer-events-none scale-110" />
              </div>

              {/* 1. GitHub Module (Top-Left) */}
              <motion.div
                style={{ 
                  y: shouldReduceMotion ? 0 : githubY,
                  left: "6%",
                  top: "10%",
                  boxShadow: "0 20px 40px -15px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.6)"
                }}
                whileHover={{ scale: 1.03 }}
                className="absolute w-44 p-3.5 rounded-2xl border border-white/25 bg-white/40 shadow-lg backdrop-blur-md pointer-events-auto glass-panel transition-shadow"
              >
                {renderGithubPanel()}
              </motion.div>

              {/* 2. Projects Module (Top-Right) */}
              <motion.div
                style={{ 
                  y: shouldReduceMotion ? 0 : projectsY,
                  right: "6%",
                  top: "12%",
                  boxShadow: "0 20px 40px -15px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.6)"
                }}
                whileHover={{ scale: 1.03 }}
                className="absolute w-44 p-3.5 rounded-2xl border border-white/25 bg-white/40 shadow-lg backdrop-blur-md pointer-events-auto glass-panel transition-shadow"
              >
                {renderProjectsPanel()}
              </motion.div>

              {/* 3. Skills Module (Middle-Left) */}
              <motion.div
                style={{ 
                  y: shouldReduceMotion ? 0 : skillsYPanel,
                  left: "1%",
                  top: "45%",
                  boxShadow: "0 20px 40px -15px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.6)"
                }}
                whileHover={{ scale: 1.03 }}
                className="absolute w-44 p-3.5 rounded-2xl border border-white/25 bg-white/40 shadow-lg backdrop-blur-md pointer-events-auto glass-panel transition-shadow"
              >
                {renderSkillsPanel()}
              </motion.div>

              {/* 4. Recruiter Mode Control (Middle-Right) */}
              <motion.div
                style={{ 
                  y: shouldReduceMotion ? 0 : recruiterY,
                  right: "1%",
                  top: "43%",
                  boxShadow: "0 20px 40px -15px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.6)"
                }}
                whileHover={{ scale: 1.03 }}
                className="absolute w-44 p-3.5 rounded-2xl border border-white/25 bg-white/40 shadow-lg backdrop-blur-md pointer-events-auto glass-panel transition-shadow"
              >
                {renderRecruiterModePanel()}
              </motion.div>

              {/* 5. Experience Module (Bottom-Left) */}
              <motion.div
                style={{ 
                  y: shouldReduceMotion ? 0 : experienceY,
                  left: "8%",
                  bottom: "8%",
                  boxShadow: "0 20px 40px -15px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.6)"
                }}
                whileHover={{ scale: 1.03 }}
                className="absolute w-44 p-3.5 rounded-2xl border border-white/25 bg-white/40 shadow-lg backdrop-blur-md pointer-events-auto glass-panel transition-shadow"
              >
                {renderInternshipPanel()}
              </motion.div>

              {/* 6. Certifications Module (Bottom-Right) */}
              <motion.div
                style={{ 
                  y: shouldReduceMotion ? 0 : certsY,
                  right: "8%",
                  bottom: "10%",
                  boxShadow: "0 20px 40px -15px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.6)"
                }}
                whileHover={{ scale: 1.03 }}
                className="absolute w-44 p-3.5 rounded-2xl border border-white/25 bg-white/40 shadow-lg backdrop-blur-md pointer-events-auto glass-panel transition-shadow"
              >
                {renderCertificationsPanel()}
              </motion.div>

            </div>
          ) : (
            /* MOBILE STATIC GRID */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full px-2">
              <div className="p-4 rounded-2xl border border-black/5 bg-white/40 shadow-sm glass-panel">
                {renderRecruiterModePanel()}
              </div>
              <div className="p-4 rounded-2xl border border-black/5 bg-white/40 shadow-sm glass-panel">
                {renderGithubPanel()}
              </div>
              <div className="p-4 rounded-2xl border border-black/5 bg-white/40 shadow-sm glass-panel">
                {renderInternshipPanel()}
              </div>
              <div className="p-4 rounded-2xl border border-black/5 bg-white/40 shadow-sm glass-panel">
                {renderProjectsPanel()}
              </div>
              <div className="p-4 rounded-2xl border border-black/5 bg-white/40 shadow-sm glass-panel">
                {renderSkillsPanel()}
              </div>
              <div className="p-4 rounded-2xl border border-black/5 bg-white/40 shadow-sm glass-panel">
                {renderCertificationsPanel()}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <button
          onClick={() => handleScrollTo("about")}
          className="p-3 rounded-full border border-black/10 bg-white/60 text-gray-500 hover:text-black hover:bg-white transition-all duration-300 cursor-pointer animate-bounce shadow-sm backdrop-blur-md focus:outline-none"
          aria-label="Scroll Down"
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

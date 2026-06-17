"use client";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowDown, Sparkles, FolderGit2, FileDown, Mail, Calendar, Briefcase, GitBranch, Target, Terminal } from "lucide-react";
import { profile } from "../data/profile";
import { siteConfig } from "../data/siteConfig";
import Magnetic from "./motion/Magnetic";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Use 1024 to ensure columns have room on tablets/desktops
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  // Parallax shifts for floating command center cards on desktop
  const githubY = useTransform(scrollY, [0, 500], [0, -50]);
  const internshipY = useTransform(scrollY, [0, 500], [0, 25]);
  const focusY = useTransform(scrollY, [0, 500], [0, -70]);
  const skillsYPanel = useTransform(scrollY, [0, 500], [0, 35]);

  // General text layers parallax
  const badgeY = useTransform(scrollY, [0, 500], [0, 15]);
  const headlineY = useTransform(scrollY, [0, 500], [0, 35]);
  const descY = useTransform(scrollY, [0, 500], [0, 25]);
  const ctaY = useTransform(scrollY, [0, 500], [0, 15]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Mobile bypass
  const finalBadgeY = isMobile || shouldReduceMotion ? 0 : badgeY;
  const finalHeadlineY = isMobile || shouldReduceMotion ? 0 : headlineY;
  const finalDescY = isMobile || shouldReduceMotion ? 0 : descY;
  const finalCtaY = isMobile || shouldReduceMotion ? 0 : ctaY;
  const finalOpacity = isMobile ? 1 : opacity;

  // Stagger sequence
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: shouldReduceMotion ? 0 : 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 90,
        damping: 18,
        mass: 0.8,
      },
    },
  };

  const lineVariants = {
    hidden: { y: shouldReduceMotion ? 0 : "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 85,
        damping: 16,
        mass: 0.7,
      },
    },
  };

  const ctaContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const ctaItemVariants = {
    hidden: { y: shouldReduceMotion ? 0 : 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 16,
      },
    },
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
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

  const headlineWords = profile.headline.split(" ");
  const subHeadlineWords = profile.subHeadline.split(" ");

  // Custom components for panels to avoid duplicating code
  const renderGithubPanel = () => (
    <div className="flex flex-col gap-2 text-left">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-bold text-gray-400 font-mono tracking-wider uppercase flex items-center gap-1">
          <GitBranch className="w-3.5 h-3.5 text-red-500" /> GitHub Commits
        </span>
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
      </div>
      {/* Simulated GitHub heat map grid */}
      <div className="grid grid-cols-7 gap-1 mt-1">
        {Array.from({ length: 28 }).map((_, idx) => {
          const intensities = ["bg-black/5", "bg-red-500/10", "bg-red-500/25", "bg-red-500/40", "bg-red-500/60"];
          const bg = intensities[Math.floor(Math.sin(idx + 3) * 2.5) + 2] || "bg-black/5";
          return <span key={idx} className={`w-3.5 h-3.5 rounded-sm ${bg}`} />;
        })}
      </div>
    </div>
  );

  const renderInternshipPanel = () => (
    <div className="flex flex-col gap-1.5 text-left">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-bold text-gray-400 font-mono tracking-wider uppercase flex items-center gap-1">
          <Briefcase className="w-3.5 h-3.5 text-rose-500" /> Internship Status
        </span>
        <span className="text-[8px] font-bold text-rose-600 bg-rose-500/10 border border-rose-500/15 px-1.5 py-0.5 rounded">ACTIVE</span>
      </div>
      <h4 className="text-xs font-bold text-black mt-0.5">Data Analyst Intern</h4>
      <p className="text-[10px] text-gray-500 font-medium">Elevate Labs • Monitoring Growth KPIs & Sales dashboards</p>
    </div>
  );

  const renderFocusPanel = () => (
    <div className="flex flex-col gap-1.5 text-left">
      <span className="text-[9px] font-bold text-gray-400 font-mono tracking-wider uppercase flex items-center gap-1">
        <Target className="w-3.5 h-3.5 text-red-500 animate-pulse" /> Active Focus
      </span>
      <h4 className="text-xs font-bold text-black mt-0.5">Campus Connect Platform</h4>
      <p className="text-[10px] text-gray-500 font-medium">Building real-time forums & student listings portal</p>
    </div>
  );

  const renderSkillsPanel = () => (
    <div className="flex flex-col gap-1.5 text-left font-mono">
      <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase flex items-center gap-1">
        <Terminal className="w-3.5 h-3.5 text-gray-500" /> System Metrics
      </span>
      <div className="flex flex-col gap-0.5 text-[10px] text-gray-600 mt-0.5">
        <div className="flex justify-between border-b border-black/5 pb-0.5">
          <span>Python:</span>
          <span className="font-bold text-black">85%</span>
        </div>
        <div className="flex justify-between border-b border-black/5 pb-0.5">
          <span>SQL DB:</span>
          <span className="font-bold text-black">92%</span>
        </div>
        <div className="flex justify-between">
          <span>Power BI:</span>
          <span className="font-bold text-black">90%</span>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-12 px-6 md:px-12 overflow-hidden bg-gradient-to-b from-red-50/40 via-rose-50/20 to-white select-none"
    >
      {/* Layer 2: Floating Command Center Panels (Hidden on mobile) */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          
          {/* GitHub Activity Grid (Left Top) */}
          <motion.div
            style={{ 
              y: shouldReduceMotion ? 0 : githubY,
              boxShadow: "0 20px 40px -15px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.6)"
            }}
            className="absolute top-[20%] left-[4%] w-48 p-4 rounded-2xl border border-white/20 bg-white/40 shadow-xl backdrop-blur-lg flex flex-col gap-2 pointer-events-auto glass-panel"
          >
            {renderGithubPanel()}
          </motion.div>

          {/* Internship Status Card (Right Top) */}
          <motion.div
            style={{ 
              y: shouldReduceMotion ? 0 : internshipY,
              boxShadow: "0 20px 40px -15px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.6)"
            }}
            className="absolute top-[22%] right-[4%] w-48 p-4 rounded-2xl border border-white/20 bg-white/40 shadow-xl backdrop-blur-lg flex flex-col gap-2 pointer-events-auto glass-panel"
          >
            {renderInternshipPanel()}
          </motion.div>

          {/* Focus Card (Left Bottom) */}
          <motion.div
            style={{ 
              y: shouldReduceMotion ? 0 : focusY,
              boxShadow: "0 20px 40px -15px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.6)"
            }}
            className="absolute bottom-[28%] left-[4%] w-48 p-4 rounded-2xl border border-white/20 bg-white/40 shadow-xl backdrop-blur-lg flex flex-col gap-2 pointer-events-auto glass-panel"
          >
            {renderFocusPanel()}
          </motion.div>

          {/* Skills Card (Right Bottom) */}
          <motion.div
            style={{ 
              y: shouldReduceMotion ? 0 : skillsYPanel,
              boxShadow: "0 20px 40px -15px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.6)"
            }}
            className="absolute bottom-[26%] right-[4%] w-48 p-4 rounded-2xl border border-white/20 bg-white/40 shadow-xl backdrop-blur-lg flex flex-col gap-2 pointer-events-auto glass-panel"
          >
            {renderSkillsPanel()}
          </motion.div>
        </div>
      )}

      {/* Main Centered Content Grid */}
      <motion.div
        style={{ opacity: finalOpacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center text-center z-10 relative"
      >
        {/* Layer 3: Status Badge */}
        <motion.div
          variants={itemVariants}
          style={{ y: finalBadgeY }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs font-bold uppercase tracking-widest text-red-600 border border-red-500/15 mb-8 shadow-sm bg-white/50 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-red-500 animate-pulse" />
          <span>{profile.name}</span>
        </motion.div>

        {/* Layer 4: Headline */}
        <motion.h1 
          style={{ y: finalHeadlineY }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tighter leading-[1.1] mb-6 text-black select-none flex flex-col items-center"
        >
          <span className="block overflow-hidden py-1 flex flex-wrap justify-center gap-x-3 sm:gap-x-4">
            {headlineWords.map((word, idx) => (
              <span key={idx} className="inline-block overflow-hidden">
                <motion.span
                  variants={lineVariants}
                  className="inline-block"
                  transition={{
                    type: "spring" as const,
                    stiffness: 85,
                    damping: 16,
                    mass: 0.7,
                    delay: 0.1 + idx * 0.04
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
          <span className="block overflow-hidden py-1 flex flex-wrap justify-center gap-x-3 sm:gap-x-4">
            {subHeadlineWords.map((word, idx) => (
              <span key={idx} className="inline-block overflow-hidden">
                <motion.span
                  variants={lineVariants}
                  className="inline-block bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 bg-clip-text text-transparent"
                  transition={{
                    type: "spring" as const,
                    stiffness: 85,
                    damping: 16,
                    mass: 0.7,
                    delay: 0.4 + idx * 0.04
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
        </motion.h1>

        {/* Description Description */}
        <motion.p
          variants={itemVariants}
          style={{ y: finalDescY }}
          className="text-base sm:text-lg md:text-xl text-gray-500 max-w-2xl mb-12 leading-relaxed font-normal px-4"
        >
          {profile.role} specializing in Data Analytics, Business Intelligence, and Full-Stack Development.
        </motion.p>

        {/* Layer 5: CTA Buttons Row */}
        <motion.div
          variants={ctaContainerVariants}
          style={{ y: finalCtaY }}
          className="flex flex-wrap justify-center items-center gap-4 px-4 w-full"
        >
          {/* View Work Button */}
          <motion.div variants={ctaItemVariants}>
            <Magnetic>
              <motion.a
                href="#projects"
                onClick={(e) => handleScrollTo(e, "projects")}
                whileHover="hover"
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className="relative overflow-hidden flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white shadow-md shadow-red-500/10 hover:shadow-red-500/25 transition-all duration-300 group"
              >
                {!shouldReduceMotion && (
                  <motion.span
                    initial={{ x: "-150%" }}
                    variants={{
                      hover: { x: ["-150%", "150%"] }
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 2.5,
                      ease: [0.16, 1, 0.3, 1],
                      repeatDelay: 0.8
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-20 pointer-events-none"
                  />
                )}
                <FolderGit2 className="w-4 h-4 z-10 group-hover:translate-x-0.5 transition-transform duration-300" />
                <span className="relative z-10">View Projects</span>
              </motion.a>
            </Magnetic>
          </motion.div>

          {/* Download Resume Button */}
          <motion.div variants={ctaItemVariants}>
            <Magnetic>
              <motion.a
                href={siteConfig.resumePath}
                download={`${profile.name.replace(/\s+/g, "_")}_Resume.pdf`}
                whileHover="hover"
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className="relative overflow-hidden flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm bg-white/70 border border-black/10 hover:border-black/20 text-gray-800 hover:text-black hover:bg-white shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-md group"
              >
                {!shouldReduceMotion && (
                  <motion.span
                    initial={{ x: "-150%" }}
                    variants={{
                      hover: { x: ["-150%", "150%"] }
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 2.5,
                      ease: [0.16, 1, 0.3, 1],
                      repeatDelay: 0.8
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent skew-x-20 pointer-events-none"
                  />
                )}
                <FileDown className="w-4 h-4 text-red-500 z-10 group-hover:translate-y-0.5 transition-transform duration-300" />
                <span className="relative z-10">Download Resume</span>
              </motion.a>
            </Magnetic>
          </motion.div>

          {/* Contact Button */}
          <motion.div variants={ctaItemVariants}>
            <Magnetic>
              <motion.a
                href="#contact"
                onClick={(e) => handleScrollTo(e, "contact")}
                whileHover="hover"
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className="relative overflow-hidden flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm bg-black/[0.03] border border-black/5 hover:border-black/15 text-gray-700 hover:text-black hover:bg-black/[0.06] transition-all duration-300 backdrop-blur-sm group"
              >
                {!shouldReduceMotion && (
                  <motion.span
                    initial={{ x: "-150%" }}
                    variants={{
                      hover: { x: ["-150%", "150%"] }
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 2.5,
                      ease: [0.16, 1, 0.3, 1],
                      repeatDelay: 0.8
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent skew-x-20 pointer-events-none"
                  />
                )}
                <Mail className="w-4 h-4 z-10 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                <span className="relative z-10">Contact Me</span>
              </motion.a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* STATIC COMMAND CENTER GRID FOR MOBILE SCREEN SIZES */}
        {isMobile && (
          <motion.div
            variants={ctaContainerVariants}
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full px-4"
          >
            <div className="p-4 rounded-2xl border border-black/5 bg-white/40 shadow-sm glass-panel">
              {renderGithubPanel()}
            </div>
            <div className="p-4 rounded-2xl border border-black/5 bg-white/40 shadow-sm glass-panel">
              {renderInternshipPanel()}
            </div>
            <div className="p-4 rounded-2xl border border-black/5 bg-white/40 shadow-sm glass-panel">
              {renderFocusPanel()}
            </div>
            <div className="p-4 rounded-2xl border border-black/5 bg-white/40 shadow-sm glass-panel">
              {renderSkillsPanel()}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <a
          href="#about"
          onClick={(e) => handleScrollTo(e, "about")}
          className="p-3 rounded-full border border-black/10 bg-white/60 text-gray-500 hover:text-black hover:bg-white transition-all duration-300 cursor-pointer animate-bounce shadow-sm backdrop-blur-md"
          aria-label="Scroll Down"
        >
          <ArrowDown className="w-4.5 h-4.5" />
        </a>
      </div>
    </section>
  );
}

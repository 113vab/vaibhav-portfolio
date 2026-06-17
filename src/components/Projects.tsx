"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate, useReducedMotion } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";
import { GithubIcon as Github } from "./icons/BrandIcons";
import { projects } from "../data/projects";
import { Project } from "../types/portfolio";
import Magnetic from "./motion/Magnetic";

const renderCampusConnectFlow = () => {
  return (
    <div className="w-full h-full p-2.5 relative flex flex-col justify-center items-center bg-black/[0.01]">
      <div className="absolute w-24 h-24 rounded-full bg-red-500/5 filter blur-xl pointer-events-none" />
      <div className="w-full max-w-sm aspect-[24/10] relative">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 480 200" fill="none">
          <path d="M 85,100 L 135,100" stroke="#000" strokeOpacity="0.06" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 205,100 L 255,100" stroke="#000" strokeOpacity="0.06" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 325,100 C 350,100 350,50 375,50" stroke="#000" strokeOpacity="0.06" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 325,100 C 350,100 350,150 375,150" stroke="#000" strokeOpacity="0.06" strokeWidth="2" strokeDasharray="4 4" />

          <path d="M 85,100 L 135,100" stroke="url(#redGrad)" strokeWidth="2" strokeLinecap="round" />
          <path d="M 205,100 L 255,100" stroke="url(#redGrad)" strokeWidth="2" strokeLinecap="round" />
          <path d="M 325,100 C 350,100 350,50 375,50" stroke="url(#redGrad)" strokeWidth="2" strokeLinecap="round" />
          <path d="M 325,100 C 350,100 350,150 375,150" stroke="url(#redGrad)" strokeWidth="2" strokeLinecap="round" />

          <defs>
            <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          <circle r="4" fill="#ef4444" className="shadow-[0_0_8px_#ef4444]">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 85,100 L 135,100" />
          </circle>
          <circle r="4" fill="#f43f5e" className="shadow-[0_0_8px_#f43f5e]">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 205,100 L 255,100" />
          </circle>
          <circle r="3.5" fill="#3b82f6" className="shadow-[0_0_8px_#3b82f6]">
            <animateMotion dur="3s" repeatCount="indefinite" path="M 325,100 C 350,100 350,50 375,50" />
          </circle>
          <circle r="3.5" fill="#10b981" className="shadow-[0_0_8px_#10b981]">
            <animateMotion dur="3s" repeatCount="indefinite" path="M 325,100 C 350,100 350,150 375,150" />
          </circle>
        </svg>

        <div style={{ left: "10.4%", top: "50%", transform: "translate(-50%, -50%)" }} className="absolute px-2 py-1 rounded-xl border border-black/5 bg-white shadow-sm flex flex-col items-center justify-center min-w-[65px] pointer-events-none">
          <span className="text-[6px] font-mono text-gray-400 font-bold uppercase tracking-wider">Client</span>
          <span className="text-[9px] font-bold text-black font-sans leading-none mt-0.5">User</span>
        </div>

        <div style={{ left: "35.4%", top: "50%", transform: "translate(-50%, -50%)" }} className="absolute px-2 py-1 rounded-xl border border-red-500/10 bg-white/95 shadow-sm flex flex-col items-center justify-center min-w-[65px] pointer-events-none">
          <span className="text-[6px] font-mono text-red-500 font-bold uppercase tracking-wider">React</span>
          <span className="text-[9px] font-bold text-black font-sans leading-none mt-0.5">Frontend</span>
        </div>

        <div style={{ left: "60.4%", top: "50%", transform: "translate(-50%, -50%)" }} className="absolute px-2 py-1 rounded-xl border border-black/5 bg-white shadow-sm flex flex-col items-center justify-center min-w-[65px] pointer-events-none">
          <span className="text-[6px] font-mono text-gray-400 font-bold uppercase tracking-wider">Express</span>
          <span className="text-[9px] font-bold text-black font-sans leading-none mt-0.5">REST API</span>
        </div>

        <div style={{ left: "85.4%", top: "25%", transform: "translate(-50%, -50%)" }} className="absolute px-2 py-1 rounded-xl border border-emerald-500/10 bg-white shadow-sm flex flex-col items-center justify-center min-w-[65px] pointer-events-none">
          <span className="text-[6px] font-mono text-emerald-600 font-bold uppercase tracking-wider">MongoDB</span>
          <span className="text-[8px] font-bold text-black font-mono leading-none mt-0.5">NoSQL</span>
        </div>

        <div style={{ left: "85.4%", top: "75%", transform: "translate(-50%, -50%)" }} className="absolute px-2 py-1 rounded-xl border border-blue-500/10 bg-white shadow-sm flex flex-col items-center justify-center min-w-[65px] pointer-events-none">
          <span className="text-[6px] font-mono text-blue-600 font-bold uppercase tracking-wider">Postgres</span>
          <span className="text-[8px] font-bold text-black font-mono leading-none mt-0.5">Relational</span>
        </div>
      </div>
    </div>
  );
};

const renderHeritageAIFlow = () => {
  return (
    <div className="w-full h-full p-2.5 relative flex flex-col justify-center items-center bg-black/[0.01]">
      <div className="absolute w-20 h-20 rounded-full bg-rose-500/5 filter blur-xl pointer-events-none" />
      <div className="w-full max-w-sm aspect-[40/12] relative">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 120" fill="none">
          <path d="M 85,60 L 115,60" stroke="#000" strokeOpacity="0.06" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 185,60 L 215,60" stroke="#000" strokeOpacity="0.06" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 285,60 L 315,60" stroke="#000" strokeOpacity="0.06" strokeWidth="2" strokeDasharray="4 4" />

          <path d="M 85,60 L 115,60" stroke="url(#roseGrad)" strokeWidth="2" strokeLinecap="round" />
          <path d="M 185,60 L 215,60" stroke="url(#roseGrad)" strokeWidth="2" strokeLinecap="round" />
          <path d="M 285,60 L 315,60" stroke="url(#roseGrad)" strokeWidth="2" strokeLinecap="round" />

          <defs>
            <linearGradient id="roseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          <circle r="3.5" fill="#f43f5e" className="shadow-[0_0_8px_#f43f5e]">
            <animateMotion dur="2s" repeatCount="indefinite" path="M 85,60 L 115,60" />
          </circle>
          <circle r="3.5" fill="#ec4899" className="shadow-[0_0_8px_#ec4899]">
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M 185,60 L 215,60" />
          </circle>
          <circle r="3.5" fill="#3b82f6" className="shadow-[0_0_8px_#3b82f6]">
            <animateMotion dur="2.4s" repeatCount="indefinite" path="M 285,60 L 315,60" />
          </circle>
        </svg>

        <div style={{ left: "12.5%", top: "50%", transform: "translate(-50%, -50%)" }} className="absolute px-2 py-1 rounded-xl border border-black/5 bg-white shadow-sm flex flex-col items-center justify-center min-w-[60px] pointer-events-none">
          <span className="text-[6px] font-mono text-gray-400 font-bold uppercase tracking-wider">Client</span>
          <span className="text-[9px] font-bold text-black font-sans leading-none mt-0.5">User</span>
        </div>

        <div style={{ left: "37.5%", top: "50%", transform: "translate(-50%, -50%)" }} className="absolute px-2 py-1 rounded-xl border border-rose-500/10 bg-white/95 shadow-sm flex flex-col items-center justify-center min-w-[60px] pointer-events-none">
          <span className="text-[6px] font-mono text-rose-500 font-bold uppercase tracking-wider">React</span>
          <span className="text-[9px] font-bold text-black font-sans leading-none mt-0.5">UI Platform</span>
        </div>

        <div style={{ left: "62.5%", top: "50%", transform: "translate(-50%, -50%)" }} className="absolute px-2 py-1 rounded-xl border border-black/5 bg-white shadow-sm flex flex-col items-center justify-center min-w-[60px] pointer-events-none">
          <span className="text-[6px] font-mono text-gray-400 font-bold uppercase tracking-wider">Maps</span>
          <span className="text-[9px] font-bold text-black font-sans leading-none mt-0.5">Maps API</span>
        </div>

        <div style={{ left: "87.5%", top: "50%", transform: "translate(-50%, -50%)" }} className="absolute px-2 py-1 rounded-xl border border-amber-500/10 bg-white shadow-sm flex flex-col items-center justify-center min-w-[60px] pointer-events-none">
          <span className="text-[6px] font-mono text-amber-600 font-bold uppercase tracking-wider">REST API</span>
          <span className="text-[9px] font-bold text-black font-mono leading-none mt-0.5">Tourism Data</span>
        </div>
      </div>
    </div>
  );
};

const filterOptions = [
  { id: "all", label: "All Projects" },
  { id: "fullstack", label: "Fullstack" },
  { id: "frontend", label: "Frontend" },
];

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0
      );
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Motion values for normalized mouse positions over the card [0, 1]
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Motion values in pixels relative to card container for spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Soft spring config for tilt rotation & depth offsets (2-3 degrees max)
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [0, 1], [2.5, -2.5]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-2.5, 2.5]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || isTouchDevice || shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    
    x.set(clientX / width);
    y.set(clientY / height);
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  // Render mock elements based on project title
  const renderVisualMockup = () => {
    if (project.title === "Campus Connect" || project.id === 1) {
      return renderCampusConnectFlow();
    }
    if (project.title === "SIH 2024 Heritage Tourism Platform" || project.id === 2) {
      return renderHeritageAIFlow();
    }
    // Fallback card mockup representation
    return (
      <div className="w-full h-full relative flex items-center justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:14px_24px] opacity-20" />
        <div className="absolute w-24 h-24 rounded-full bg-red-500/10 filter blur-xl group-hover:scale-150 transition-transform duration-700" />
        <Code className="w-12 h-12 text-red-500/20 group-hover:text-red-500/40 group-hover:scale-110 transition-all duration-500 relative z-10" />
      </div>
    );
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isMobile || shouldReduceMotion ? 0 : rotateX,
        rotateY: isMobile || shouldReduceMotion ? 0 : rotateY,
        transformStyle: isMobile ? "flat" : "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group rounded-3xl glass-panel flex flex-col h-full overflow-hidden relative transition-all duration-350 hover:border-red-500/25 shadow-md hover:shadow-xl bg-white/40"
    >
      {/* Reflective Sheen Glare Overlay */}
      {!shouldReduceMotion && (
        <motion.div
          initial={{ x: "-150%" }}
          whileHover={project.id === 1 ? { x: ["-150%", "150%"] } : { x: "150%" }}
          transition={project.id === 1 ? {
            repeat: Infinity,
            repeatType: "loop" as const,
            duration: 2.8,
            ease: [0.16, 1, 0.3, 1],
            repeatDelay: 1.0
          } : {
            duration: 1.6,
            ease: [0.16, 1, 0.3, 1] as const
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/12 to-transparent skew-x-20 pointer-events-none z-20"
        />
      )}

      {/* Spotlight Illumination Overlay (Desktop Only) */}
      {!isMobile && !isTouchDevice && !shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
          style={{
            background: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(255, 59, 48, 0.05), transparent 80%)`,
          }}
        />
      )}

      {/* Visual mockup container */}
      <div 
        className="relative h-48 w-full overflow-hidden flex items-center justify-center border-b border-black/[0.05] z-10"
        style={{ transformStyle: isMobile ? "flat" : "preserve-3d" }}
      >
        <motion.div 
          initial={shouldReduceMotion ? { opacity: 0 } : { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", scale: 1.08, opacity: 0 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
          whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
          className="w-full h-full"
          style={{ transformStyle: isMobile ? "flat" : "preserve-3d" }}
        >
          {renderVisualMockup()}
        </motion.div>

        {/* Hover Button Reveal Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileHover={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/2 flex items-center justify-center z-15 pointer-events-none"
        >
          <Link
            href={`/projects/${project.id}`}
            className="px-4 py-2.5 rounded-xl bg-white shadow-lg text-xs font-bold text-black flex items-center gap-1.5 pointer-events-auto border border-black/5"
          >
            Read Case Study <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* Category Badge */}
        <span className="absolute top-4 right-4 text-[10px] font-mono font-bold uppercase tracking-wider text-red-600 px-2.5 py-1 rounded-full bg-white/90 border border-black/5 backdrop-blur-md z-20">
          {project.category}
        </span>
      </div>

      {/* Info Container */}
      <div 
        className="p-6 md:p-8 flex flex-col flex-1 justify-between relative z-10"
        style={{ 
          transform: isMobile ? "none" : "translateZ(10px)", 
          transformStyle: isMobile ? "flat" : "preserve-3d" 
        }}
      >
        <div>
          <h3 className="text-xl font-bold text-black mb-3 group-hover:text-red-500 transition-colors duration-300">
            <Link href={`/projects/${project.id}`}>
              {project.title}
            </Link>
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed font-normal mb-6">
            {project.desc}
          </p>
        </div>

        {/* Tags & Action Buttons */}
        <div>
          {/* Tags List */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] sm:text-xs text-gray-600 font-mono px-2 py-0.5 rounded bg-black/3 border border-black/5"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex gap-4 border-t border-black/5 pt-5 overflow-hidden">
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={shouldReduceMotion ? {} : { scale: 1.05, x: 2 }}
              className="group/link relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1.5px] after:w-full after:origin-right after:scale-x-0 after:bg-red-500 after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100 inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-red-600 transition-colors duration-300"
            >
              <Github className="w-4 h-4 group-hover/link:scale-115 transition-transform duration-300" />
              Code
            </motion.a>
            <motion.a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={shouldReduceMotion ? {} : { scale: 1.05, x: -2 }}
              className="group/link relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1.5px] after:w-full after:origin-right after:scale-x-0 after:bg-red-500 after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100 inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-red-600 transition-colors duration-300 ml-auto"
            >
              Live Demo
              <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FeaturedProjectShowcase({ project, shouldReduceMotion }: { project: Project; shouldReduceMotion: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0
      );
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Mouse-based tilt values (max 2-3 degrees)
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [0, 1], [2, -2]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-2, 2]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || isTouchDevice || shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  const renderFeaturedMockup = () => {
    if (project.title === "Campus Connect" || project.id === 1) {
      return renderCampusConnectFlow();
    }
    if (project.title === "SIH 2024 Heritage Tourism Platform" || project.id === 2) {
      return renderHeritageAIFlow();
    }
    return (
      <div className="w-full h-full relative flex items-center justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:14px_24px] opacity-20" />
        <div className="absolute w-36 h-36 rounded-full bg-red-500/10 filter blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
        <Code className="w-12 h-12 text-red-500/20 group-hover:text-red-500/40 group-hover:scale-110 transition-all duration-500 relative z-10" />
      </div>
    );
  };

  const features = [
    { title: "Support Forums", desc: "Interactive student forums enabling sub-community creation and campus-wide collaborations." },
    { title: "Peer Messaging", desc: "Real-time peer chat with active indicator status to keep students connected instantly." },
    { title: "Student Marketplace", desc: "A secure campus-only portal for peer transactions of books, items, and services." }
  ];

  return (
    <div ref={containerRef} className="mb-24 md:mb-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
        {/* Left Side: Mockup Visual */}
        <div className="lg:col-span-6 flex justify-center items-center">
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX: isMobile || shouldReduceMotion ? 0 : rotateX,
              rotateY: isMobile || shouldReduceMotion ? 0 : rotateY,
              transformStyle: isMobile ? "flat" : "preserve-3d",
            }}
            whileHover={{ scale: 1.01 }}
            className="group w-full max-w-lg aspect-[4/3] rounded-3xl glass-panel relative border border-black/5 flex items-center justify-center p-6 overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white/40"
          >
            {/* Ambient reflection sheen loop */}
            {!shouldReduceMotion && (
              <motion.div
                initial={{ x: "-150%" }}
                whileHover={{ x: ["-150%", "150%"] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop" as const,
                  duration: 2.8,
                  ease: [0.16, 1, 0.3, 1],
                  repeatDelay: 1.0
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/12 to-transparent skew-x-20 pointer-events-none z-20"
              />
            )}

            {/* Spotlight reflection */}
            {!isMobile && !isTouchDevice && !shouldReduceMotion && (
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                style={{
                  background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255, 59, 48, 0.04), transparent 80%)`,
                }}
              />
            )}

            {/* Inner mockup container */}
            <div className="w-full h-full relative" style={{ transformStyle: isMobile ? "flat" : "preserve-3d" }}>
              {renderFeaturedMockup()}
            </div>
            
            {/* Floating indicator */}
            <span className="absolute top-6 right-6 text-[10px] font-mono font-bold uppercase tracking-wider text-red-600 px-3 py-1 rounded-full bg-white/90 border border-black/5 backdrop-blur-md z-20">
              FEATURED PROJECT
            </span>
          </motion.div>
        </div>

        {/* Right Side: Showcase storytelling details */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="mb-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-500 px-2.5 py-1 rounded-full bg-red-500/5 border border-red-500/10">
              {project.category.toUpperCase()} PLATFORM
            </span>
          </div>
          
          <h3 className="text-3xl sm:text-4xl font-extrabold text-black mb-4 tracking-tight leading-tight">
            {project.title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed text-base mb-8 max-w-xl">
            {project.desc}
          </p>

          {/* Progressive Feature Cards */}
          <div className="space-y-4 mb-8">
            {features.map((feat, idx) => {
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-4 rounded-2xl bg-black/[0.01] border border-black/[0.03] flex gap-4 hover:bg-white hover:border-red-500/10 hover:shadow-md hover:shadow-red-500/[0.01] transition-all duration-300 group/feat"
                >
                  <div className="w-8 h-8 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/feat:bg-red-500/15 transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black text-sm mb-1">{feat.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{feat.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Technology stack fades in sequentially */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8 pt-6 border-t border-black/5"
          >
            <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono mb-3.5">
              Technology Stack
            </h5>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono text-gray-600 bg-black/[0.03] border border-black/5 px-2.5 py-1 rounded-xl transition-all duration-300 hover:bg-red-500/5 hover:border-red-500/15 hover:text-red-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CTA buttons reveal last */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Magnetic>
              <Link href={`/projects/${project.id}`} passHref legacyBehavior>
                <motion.a
                  whileHover="hover"
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  className="relative overflow-hidden inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white shadow-md shadow-red-500/10 hover:shadow-red-500/25 transition-all duration-300 group/btn cursor-pointer"
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
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-20 pointer-events-none"
                    />
                  )}
                  Read Case Study
                  <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                </motion.a>
              </Link>
            </Magnetic>

            <Magnetic>
              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover="hover"
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className="relative overflow-hidden inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs bg-black/[0.03] border border-black/5 hover:border-black/15 text-gray-700 hover:text-black hover:bg-black/[0.06] transition-all duration-300 group/btn cursor-pointer"
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
                Explore Live Platform
                <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
              </motion.a>
            </Magnetic>

            <Magnetic>
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover="hover"
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className="relative overflow-hidden inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs bg-black/[0.03] border border-black/5 hover:border-black/15 text-gray-700 hover:text-black hover:bg-black/[0.06] transition-all duration-300 group/btn cursor-pointer"
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
                Source Code
                <Github className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform duration-300" />
              </motion.a>
            </Magnetic>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState("all");
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    return project.category === filter;
  });

  const titleWords = "Featured Projects".split(" ");

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-28 md:py-36 px-6 md:px-12 relative"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1] as const,
              staggerChildren: 0.08,
              delayChildren: 0.05
            }
          }
        }}
        className="max-w-7xl mx-auto z-10 relative"
      >
        
        {/* Section Heading with word reveal */}
        <motion.div variants={cardVariants} className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5 mb-2.5">
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                className="w-6 h-[1px] bg-red-500 origin-left block"
              />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 font-mono">03 / Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight flex gap-x-3 flex-wrap">
              {titleWords.map((word, idx) => (
                <span key={idx} className="inline-block overflow-hidden">
                  <motion.span
                    variants={{
                      hidden: { y: shouldReduceMotion ? 0 : "100%", opacity: 0 },
                      visible: { 
                        y: 0, 
                        opacity: 1, 
                        transition: { 
                          type: "spring" as const, 
                          stiffness: 110, 
                          damping: 20,
                          delay: idx * 0.05 
                        } 
                      }
                    }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h2>
          </div>

          {/* Filter Navigation */}
          <div className="flex flex-wrap gap-2 bg-black/[0.02] border border-black/[0.05] p-1.5 rounded-2xl backdrop-blur-sm z-20">
            {filterOptions.map((opt) => (
              <motion.button
                key={opt.id}
                onClick={() => setFilter(opt.id)}
                whileTap={{ scale: 0.97 }}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 cursor-pointer ${
                  filter === opt.id
                    ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-sm shadow-red-500/10"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {opt.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Featured Project Showcase: Campus Connect (id: 1) */}
        <AnimatePresence mode="wait">
          {((filter === "all" || filter === "fullstack") && projects.find(p => p.id === 1)) && (
            <motion.div
              key="featured-showcase"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {(() => {
                const featuredProject = projects.find(p => p.id === 1);
                return featuredProject ? (
                  <FeaturedProjectShowcase
                    project={featuredProject}
                    shouldReduceMotion={!!shouldReduceMotion}
                  />
                ) : null;
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Other Projects Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProjects.filter(p => p.id !== 1).length > 0 && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-16 pt-16 border-t border-black/5"
            >
              {filter === "all" && (
                <motion.h4 variants={cardVariants} className="text-sm font-extrabold text-gray-400 uppercase tracking-widest font-mono mb-8 text-center">
                  More Projects
                </motion.h4>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto justify-center">
                {filteredProjects.filter(p => p.id !== 1).map((project) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    key={project.id}
                    variants={cardVariants}
                    className="h-full"
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </section>
  );
}

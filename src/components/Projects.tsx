"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate, useReducedMotion } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";
import { GithubIcon as Github } from "./icons/BrandIcons";
import { projects } from "../data/projects";
import { Project } from "../types/portfolio";
import Magnetic from "./motion/Magnetic";

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

  // Layered depth offsets for parallax mockup rendering (only for desktop)
  const depthX1 = useSpring(useTransform(x, [0, 1], [-2.5, 2.5]), springConfig);
  const depthY1 = useSpring(useTransform(y, [0, 1], [-2.5, 2.5]), springConfig);

  const depthX2 = useSpring(useTransform(x, [0, 1], [-6, 6]), springConfig);
  const depthY2 = useSpring(useTransform(y, [0, 1], [-6, 6]), springConfig);

  const depthX3 = useSpring(useTransform(x, [0, 1], [4, -4]), springConfig);
  const depthY3 = useSpring(useTransform(y, [0, 1], [4, -4]), springConfig);

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
    // Parallax values or flat static replacements for mobile
    const moveX1 = isMobile || shouldReduceMotion ? 0 : depthX1;
    const moveY1 = isMobile || shouldReduceMotion ? 0 : depthY1;
    const moveX2 = isMobile || shouldReduceMotion ? 0 : depthX2;
    const moveY2 = isMobile || shouldReduceMotion ? 0 : depthY2;
    const moveX3 = isMobile || shouldReduceMotion ? 0 : depthX3;
    const moveY3 = isMobile || shouldReduceMotion ? 0 : depthY3;

    if (project.title === "Campus Connect") {
      return (
        <div className="w-full h-full relative flex items-center justify-center" style={{ transformStyle: isMobile ? "flat" : "preserve-3d" }}>
          {/* Base Layer: Grid & Glow */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:14px_24px] opacity-20" />
          <div className="absolute w-28 h-28 rounded-full bg-red-500/10 filter blur-xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
          
          {/* Layer 1: Main Platform Feed mockup (tilted white card) */}
          <motion.div
            style={{
              x: moveX1,
              y: moveY1,
              z: isMobile ? 0 : 8,
              rotate: -3
            }}
            className="w-48 h-28 bg-white rounded-xl shadow-md border border-black/5 p-2.5 flex gap-2 z-10"
          >
            {/* Mock Channels Sidebar */}
            <div className="w-12 border-r border-black/5 pr-1 flex flex-col gap-1.5">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <div className="w-7 h-2 rounded bg-black/10" />
              </div>
              <div className="w-8 h-1 rounded bg-black/5" />
              <div className="w-10 h-1 rounded bg-black/5" />
              <div className="w-7 h-1 rounded bg-black/5" />
            </div>

            {/* Mock feed content list */}
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex items-center gap-1">
                <div className="w-3.5 h-3.5 rounded-full bg-red-500/20" />
                <div className="w-14 h-1.5 rounded bg-black/10" />
              </div>
              <div className="space-y-1 my-1">
                <div className="w-full h-1 rounded bg-black/5" />
                <div className="w-full h-1 rounded bg-black/5" />
                <div className="w-4/5 h-1 rounded bg-black/5" />
              </div>
              <div className="flex justify-between items-center">
                <div className="w-8 h-2.5 rounded bg-red-500/10" />
                <div className="w-5 h-1.5 rounded bg-black/5" />
              </div>
            </div>
          </motion.div>

          {/* Layer 2: Chat Bubble avatar card */}
          <motion.div
            style={{
              x: moveX2,
              y: moveY2,
              z: isMobile ? 0 : 20,
              rotate: 1
            }}
            className="absolute top-5 right-10 w-24 h-11 bg-white rounded-lg shadow-lg border border-black/5 p-2 flex items-center gap-1.5 z-20"
          >
            <div className="w-5.5 h-5.5 rounded-full bg-rose-500/20 flex items-center justify-center text-[7px] font-bold text-rose-600 font-mono">
              VV
            </div>
            <div className="flex-1 space-y-1">
              <div className="w-10 h-1 bg-black/15 rounded" />
              <div className="w-12 h-1 bg-black/5 rounded" />
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 self-start mt-0.5" />
          </motion.div>

          {/* Layer 3: Marketplace Item Badge */}
          <motion.div
            style={{
              x: moveX3,
              y: moveY3,
              z: isMobile ? 0 : 12,
              rotate: -1
            }}
            className="absolute bottom-5 left-8 px-2.5 py-1 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-md shadow-lg text-[8px] font-bold font-mono tracking-wider z-20"
          >
            MARKETPLACE
          </motion.div>
        </div>
      );
    }

    if (project.title === "SIH 2024 Heritage Tourism Platform") {
      return (
        <div className="w-full h-full relative flex items-center justify-center" style={{ transformStyle: isMobile ? "flat" : "preserve-3d" }}>
          {/* Base Layer: Glow and Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:14px_24px] opacity-20" />
          <div className="absolute w-28 h-28 rounded-full bg-rose-500/10 filter blur-xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
          
          {/* Layer 1: Travel Card mockup */}
          <motion.div
            style={{
              x: moveX1,
              y: moveY1,
              z: isMobile ? 0 : 8,
              rotate: 2
            }}
            className="w-40 h-24 bg-white rounded-xl shadow-md border border-black/5 overflow-hidden flex flex-col z-10"
          >
            <div className="h-10 bg-gradient-to-br from-pink-200 to-rose-300 relative">
              <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-white/80 backdrop-blur-sm text-[6px] font-bold text-rose-700 font-mono">
                TAJ MAHAL
              </div>
            </div>
            <div className="p-2 flex-1 flex flex-col justify-between">
              <div className="w-16 h-1.5 bg-black/15 rounded" />
              <div className="flex justify-between items-center mt-1">
                <div className="w-10 h-1 bg-black/5 rounded" />
                <div className="w-6 h-2 bg-emerald-500/15 rounded" />
              </div>
            </div>
          </motion.div>

          {/* Layer 2: Map Pin */}
          <motion.div
            style={{
              x: moveX2,
              y: moveY2,
              z: isMobile ? 0 : 20
            }}
            className="absolute top-6 left-16 w-8 h-8 rounded-full bg-white shadow-lg border border-black/5 flex items-center justify-center text-rose-500 z-20"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
          </motion.div>

          {/* Layer 3: Rating/Review Badge */}
          <motion.div
            style={{
              x: moveX3,
              y: moveY3,
              z: isMobile ? 0 : 15,
              rotate: -2
            }}
            className="absolute bottom-6 right-16 px-2 py-1 bg-white rounded shadow-md border border-black/5 text-[7px] font-bold text-gray-700 font-mono flex items-center gap-0.5 z-20"
          >
            <span>⭐</span>
            <span>4.9</span>
          </motion.div>
        </div>
      );
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

  const depthX1 = useSpring(useTransform(x, [0, 1], [-2, 2]), springConfig);
  const depthY1 = useSpring(useTransform(y, [0, 1], [-2, 2]), springConfig);
  const depthX2 = useSpring(useTransform(x, [0, 1], [-5, 5]), springConfig);
  const depthY2 = useSpring(useTransform(y, [0, 1], [-5, 5]), springConfig);
  const depthX3 = useSpring(useTransform(x, [0, 1], [3, -3]), springConfig);
  const depthY3 = useSpring(useTransform(y, [0, 1], [3, -3]), springConfig);

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
    const moveX1 = isMobile || shouldReduceMotion ? 0 : depthX1;
    const moveY1 = isMobile || shouldReduceMotion ? 0 : depthY1;
    const moveX2 = isMobile || shouldReduceMotion ? 0 : depthX2;
    const moveY2 = isMobile || shouldReduceMotion ? 0 : depthY2;
    const moveX3 = isMobile || shouldReduceMotion ? 0 : depthX3;
    const moveY3 = isMobile || shouldReduceMotion ? 0 : depthY3;

    return (
      <div className="w-full h-full relative flex items-center justify-center" style={{ transformStyle: isMobile ? "flat" : "preserve-3d" }}>
        {/* Base Layer: Grid & Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:14px_24px] opacity-20" />
        <div className="absolute w-36 h-36 rounded-full bg-red-500/10 filter blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
        
        {/* Layer 1: Main Platform Feed mockup */}
        <motion.div
          style={{
            x: moveX1,
            y: moveY1,
            z: isMobile ? 0 : 10,
            rotate: -2
          }}
          className="w-56 h-32 bg-white rounded-xl shadow-md border border-black/5 p-3 flex gap-2.5 z-10"
        >
          {/* Mock Channels Sidebar */}
          <div className="w-14 border-r border-black/5 pr-1.5 flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <div className="w-9 h-2.5 rounded bg-black/10" />
            </div>
            <div className="w-10 h-1.5 rounded bg-black/5" />
            <div className="w-12 h-1.5 rounded bg-black/5" />
            <div className="w-9 h-1.5 rounded bg-black/5" />
          </div>

          {/* Mock feed content list */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-red-500/20" />
              <div className="w-18 h-2 rounded bg-black/10" />
            </div>
            <div className="space-y-1.5 my-2">
              <div className="w-full h-1.5 rounded bg-black/5" />
              <div className="w-full h-1.5 rounded bg-black/5" />
              <div className="w-5/6 h-1.5 rounded bg-black/5" />
            </div>
            <div className="flex justify-between items-center">
              <div className="w-10 h-3 rounded bg-red-500/10" />
              <div className="w-6 h-2 rounded bg-black/5" />
            </div>
          </div>
        </motion.div>

        {/* Layer 2: Chat Bubble avatar card */}
        <motion.div
          style={{
            x: moveX2,
            y: moveY2,
            z: isMobile ? 0 : 25,
            rotate: 2
          }}
          className="absolute top-4 right-6 w-28 h-12 bg-white rounded-lg shadow-lg border border-black/5 p-2 flex items-center gap-2 z-20"
        >
          <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center text-[8px] font-bold text-rose-600 font-mono">
            VV
          </div>
          <div className="flex-1 space-y-1">
            <div className="w-12 h-1.5 bg-black/15 rounded" />
            <div className="w-14 h-1 bg-black/5 rounded" />
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 self-start mt-0.5" />
        </motion.div>

        {/* Layer 3: Marketplace Item Badge */}
        <motion.div
          style={{
            x: moveX3,
            y: moveY3,
            z: isMobile ? 0 : 18,
            rotate: -1
          }}
          className="absolute bottom-4 left-6 px-3 py-1 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-md shadow-lg text-[9px] font-bold font-mono tracking-wider z-20"
        >
          MARKETPLACE
        </motion.div>
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

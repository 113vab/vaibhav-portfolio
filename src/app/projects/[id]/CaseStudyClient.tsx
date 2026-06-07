"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionTemplate, useReducedMotion, useMotionValue } from "framer-motion";
import { ArrowLeft, ExternalLink, Code, CheckCircle, AlertTriangle, Lightbulb, Server, ShieldAlert, Cpu, X, Bot } from "lucide-react";
import { GithubIcon as Github } from "../../../components/icons/BrandIcons";
import { projects } from "../../../data/projects";
import { caseStudies } from "../../../data/caseStudies";
import Magnetic from "../../../components/motion/Magnetic";
import { trackEvent } from "../../../utils/analytics";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "problem-statement", label: "Problem Statement" },
  { id: "why-built", label: "Why I Built It" },
  { id: "architecture", label: "System Architecture" },
  { id: "features", label: "Features" },
  { id: "technical-challenges", label: "Technical Challenges" },
  { id: "solutions", label: "Solutions" },
  { id: "screenshots", label: "Screenshots" },
  { id: "lessons", label: "Lessons Learned" },
  { id: "future-improvements", label: "Future Improvements" },
];

const ccArchitectureNodes = [
  {
    id: "user",
    title: "User",
    tech: "Client Interaction",
    desc: "Students interact with forums, send real-time peer messages, or browse marketplace listings.",
    icon: "user"
  },
  {
    id: "frontend",
    title: "React Frontend",
    tech: "React / Vite / Framer Motion",
    desc: "Renders the dynamic workspace, manages client routing, and maintains WebSockets connection states.",
    icon: "globe"
  },
  {
    id: "api",
    title: "Node.js / Express API",
    tech: "Express / Socket.io / JWT",
    desc: "Handles authorization guards, manages REST endpoints, rates-limits requests, and broadcasts websocket events.",
    icon: "cpu"
  },
  {
    id: "mongodb",
    title: "MongoDB",
    tech: "NoSQL Forum & Chats",
    desc: "Stores unstructured, high-write data models such as student group messages and forum discussion trees.",
    icon: "database"
  },
  {
    id: "postgresql",
    title: "PostgreSQL",
    tech: "Relational Profile & Listings",
    desc: "Enforces integrity rules for transaction records, student authentication credentials, and active listings.",
    icon: "database"
  }
];

const sihArchitectureNodes = [
  {
    id: "user",
    title: "User",
    tech: "Client Browser",
    desc: "Travelers explore maps, query historical eras, discover local artisans, and plan itineraries.",
    icon: "user"
  },
  {
    id: "frontend",
    title: "React Frontend",
    tech: "React / CSS / Responsive",
    desc: "Handles interactive state, manages local state search filters, and renders card transitions.",
    icon: "globe"
  },
  {
    id: "map-apis",
    title: "Leaflet & Maps API",
    tech: "Mapping Services",
    desc: "Injects live tiles, plots heritage pins, and renders geolocation details directly on viewports.",
    icon: "map"
  },
  {
    id: "tourism-directory",
    title: "Tourism Directories",
    tech: "REST APIs",
    desc: "Fetches official government contacts, regional event guides, and local lodging directory endpoints.",
    icon: "server"
  }
];

import { User, Globe, Database, Map } from "lucide-react";

function ArchitectureVisualizer({ projectId }: { projectId: number }) {
  const shouldReduceMotion = useReducedMotion();
  const nodes = projectId === 1 ? ccArchitectureNodes : sihArchitectureNodes;

  const iconMap: Record<string, React.ComponentType<any>> = {
    user: User,
    globe: Globe,
    cpu: Cpu,
    database: Database,
    map: Map,
    server: Server,
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const nodeVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="w-full max-w-xl mx-auto py-4 flex flex-col items-center"
    >
      {nodes.map((node, idx) => {
        const IconComponent = iconMap[node.icon] || Server;
        const isLast = idx === nodes.length - 1;

        return (
          <div key={node.id} className="w-full flex flex-col items-center">
            {/* Card Node */}
            <motion.div
              variants={nodeVariants}
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              className="w-full max-w-md p-5 rounded-2xl glass-panel border border-black/5 bg-white/70 hover:bg-white hover:border-red-500/25 transition-all duration-300 hover:shadow-lg flex items-start gap-4 relative group"
            >
              {/* Soft glow circle inside icon frame on card hover */}
              <div className="absolute inset-0 rounded-2xl bg-red-500/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              {/* Icon Container */}
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </div>

              {/* Text Container */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-1.5">
                  <h4 className="font-extrabold text-black text-sm tracking-tight">{node.title}</h4>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-gray-400 px-1.5 py-0.5 rounded bg-black/5">
                    {node.tech}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed font-normal">
                  {node.desc}
                </p>
              </div>
            </motion.div>

            {/* Connection Line */}
            {!isLast && (
              <div className="flex flex-col items-center my-3 select-none pointer-events-none">
                <div className="w-[2px] h-10 relative overflow-hidden bg-black/5 rounded-full">
                  {/* Animated flow indicator */}
                  <motion.div
                    initial={{ y: "-100%" }}
                    animate={{ y: "100%" }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.8,
                      ease: "linear"
                    }}
                    className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-transparent via-red-500 to-transparent"
                  />
                </div>
                <div className="w-2.5 h-2.5 rounded-full border border-black/10 bg-white flex items-center justify-center -mt-1 shadow-sm">
                  <div className="w-1 h-1 rounded-full bg-red-500 animate-ping" />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
}

export default function CaseStudyClient({ projectId }: { projectId: number }) {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const project = projects.find((p) => p.id === projectId);
  const study = caseStudies.find((s) => s.projectId === projectId);

  const [activeSection, setActiveSection] = useState("overview");

  // Lightbox Modal States
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const touchStartX = useRef(0);

  // Page Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track page visit analytics
  useEffect(() => {
    trackEvent("Case Study Page Visited", { projectId, title: project?.title });
  }, [projectId, project]);

  // Track scroll position to update active table of contents link
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140; // Offset for sticky headers
      
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  if (!project || !study) return null;

  // Lightbox Actions
  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
    trackEvent("Lightbox Gallery Opened", { projectId, index: idx });
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    if (!study.screenshots) return;
    setLightboxIndex((prev) => (prev + 1) % study.screenshots!.length);
  };

  const prevImage = () => {
    if (!study.screenshots) return;
    setLightboxIndex((prev) => (prev - 1 + study.screenshots!.length) % study.screenshots!.length);
  };

  // Mobile swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
  };

  // Smooth scroll handler
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  // Structured Data Schema for Project
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": project.title,
    "description": project.desc,
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires HTML5/JavaScript",
    "creator": {
      "@type": "Person",
      "name": "Vaibhav Vishal",
      "url": "https://github.com/113vab"
    }
  };

  // Setup visual screenshot mockup component with 3D cursor tilt
  const MockupVisual = () => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
      const checkTouch = () => {
        setIsTouchDevice(
          "ontouchstart" in window || navigator.maxTouchPoints > 0
        );
      };
      checkTouch();
    }, []);

    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const rotateX = useSpring(useTransform(y, [0, 1], [4, -4]), springConfig);
    const rotateY = useSpring(useTransform(x, [0, 1], [-4, 4]), springConfig);

    const depthX1 = useSpring(useTransform(x, [0, 1], [-5, 5]), springConfig);
    const depthY1 = useSpring(useTransform(y, [0, 1], [-5, 5]), springConfig);
    const depthX2 = useSpring(useTransform(x, [0, 1], [-10, 10]), springConfig);
    const depthY2 = useSpring(useTransform(y, [0, 1], [-10, 10]), springConfig);
    const depthX3 = useSpring(useTransform(x, [0, 1], [7, -7]), springConfig);
    const depthY3 = useSpring(useTransform(y, [0, 1], [7, -7]), springConfig);

    const springYForShadow = useSpring(y, springConfig);
    const shadowInterpolation = useTransform(
      springYForShadow,
      [0, 1],
      [
        "0 30px 60px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.01)",
        "0 15px 30px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.01)"
      ]
    );

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice || shouldReduceMotion || !cardRef.current) return;
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

    return (
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
          boxShadow: shouldReduceMotion ? "none" : shadowInterpolation,
        }}
        className="group w-full max-w-2xl aspect-[16/10] rounded-3xl glass-panel relative border border-black/5 flex items-center justify-center p-8 overflow-hidden transition-colors duration-350 hover:border-red-500/20"
      >
        {/* Sheen loop */}
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

        {/* Spotlight overlay */}
        {!isTouchDevice && !shouldReduceMotion && (
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
            style={{
              background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(255, 59, 48, 0.04), transparent 80%)`,
            }}
          />
        )}

        {/* 3D Interface Stack mock elements */}
        {project.id === 1 ? (
          <div className="w-full h-full relative flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:16px_28px] opacity-20" />
            
            {/* Base layer platform board */}
            <motion.div
              style={{
                x: shouldReduceMotion ? 0 : depthX1,
                y: shouldReduceMotion ? 0 : depthY1,
                z: 15,
                rotate: -2
              }}
              className="w-72 h-44 bg-white rounded-xl shadow-lg border border-black/5 p-4 flex gap-3 z-10"
            >
              <div className="w-18 border-r border-black/5 pr-2 flex flex-col gap-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <div className="w-10 h-3 rounded bg-black/10" />
                </div>
                <div className="w-12 h-2 rounded bg-black/5" />
                <div className="w-14 h-2 rounded bg-black/5" />
                <div className="w-10 h-2 rounded bg-black/5" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-red-500/20" />
                  <div className="w-24 h-2.5 rounded bg-black/10" />
                </div>
                <div className="space-y-2 my-2">
                  <div className="w-full h-2 rounded bg-black/5" />
                  <div className="w-full h-2 rounded bg-black/5" />
                  <div className="w-5/6 h-2 rounded bg-black/5" />
                </div>
                <div className="flex justify-between items-center">
                  <div className="w-14 h-3.5 rounded bg-red-500/10" />
                  <div className="w-8 h-2 rounded bg-black/5" />
                </div>
              </div>
            </motion.div>

            {/* Float layer avatar card */}
            <motion.div
              style={{
                x: shouldReduceMotion ? 0 : depthX2,
                y: shouldReduceMotion ? 0 : depthY2,
                z: 35,
                rotate: 2
              }}
              className="absolute top-8 right-12 w-32 h-14 bg-white rounded-xl shadow-xl border border-black/5 p-3 flex items-center gap-2.5 z-20"
            >
              <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center text-[9px] font-bold text-rose-600 font-mono shrink-0">
                VV
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="w-14 h-2 bg-black/15 rounded" />
                <div className="w-16 h-1.5 bg-black/5 rounded" />
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 self-start mt-0.5" />
            </motion.div>

            {/* Float layer market item */}
            <motion.div
              style={{
                x: shouldReduceMotion ? 0 : depthX3,
                y: shouldReduceMotion ? 0 : depthY3,
                z: 25,
                rotate: -1
              }}
              className="absolute bottom-8 left-12 px-4 py-1.5 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg shadow-xl text-[10px] font-bold font-mono tracking-wider z-20"
            >
              MARKETPLACE
            </motion.div>
          </div>
        ) : (
          <div className="w-full h-full relative flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:16px_28px] opacity-20" />
            
            {/* Travel card base */}
            <motion.div
              style={{
                x: shouldReduceMotion ? 0 : depthX1,
                y: shouldReduceMotion ? 0 : depthY1,
                z: 15,
                rotate: 2
              }}
              className="w-64 h-40 bg-white rounded-xl shadow-lg border border-black/5 overflow-hidden flex flex-col z-10"
            >
              <div className="h-16 bg-gradient-to-br from-pink-200 to-rose-300 relative">
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-white/80 backdrop-blur-sm text-[8px] font-bold text-rose-700 font-mono">
                  TAJ MAHAL
                </div>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div className="w-24 h-2 bg-black/15 rounded" />
                <div className="flex justify-between items-center mt-2">
                  <div className="w-16 h-1.5 bg-black/5 rounded" />
                  <div className="w-10 h-3 bg-emerald-500/15 rounded" />
                </div>
              </div>
            </motion.div>

            {/* Map Pin floating */}
            <motion.div
              style={{
                x: shouldReduceMotion ? 0 : depthX2,
                y: shouldReduceMotion ? 0 : depthY2,
                z: 35
              }}
              className="absolute top-10 left-24 w-11 h-11 rounded-full bg-white shadow-xl border border-black/5 flex items-center justify-center text-rose-500 z-20"
            >
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-500"></span>
              </span>
            </motion.div>

            {/* Rating badge */}
            <motion.div
              style={{
                x: shouldReduceMotion ? 0 : depthX3,
                y: shouldReduceMotion ? 0 : depthY3,
                z: 25,
                rotate: -2
              }}
              className="absolute bottom-10 right-24 px-3 py-1 bg-white rounded-lg shadow-lg border border-black/5 text-[9px] font-bold text-gray-700 font-mono flex items-center gap-1 z-20"
            >
              <span>⭐</span>
              <span>4.9</span>
            </motion.div>
          </div>
        )}
      </motion.div>
    );
  };

  const handleLinkClick = (type: string, url: string) => {
    trackEvent("Case Study External Link Clicked", { project: project.title, type, url });
  };

  return (
    <>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />

      {/* Top scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-500 to-rose-500 origin-left z-[100] pointer-events-none"
        style={{ scaleX }}
      />

      {/* Case Study sticky header / secondary navbar */}
      <header className="sticky top-0 left-0 right-0 z-45 bg-white/72 backdrop-blur-xl border-b border-black/5 px-6 md:px-12 py-4 flex items-center justify-between shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
          {/* Back button */}
          <Magnetic>
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-black transition-colors group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300" />
              <span>Back to Portfolio</span>
            </button>
          </Magnetic>

          {/* Project Title */}
          <span className="font-extrabold text-sm sm:text-base text-black uppercase tracking-wider font-mono">
            {project.title}
          </span>

          {/* Direct CTA Action links */}
          <div className="flex gap-2 sm:gap-3">
            <Magnetic>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleLinkClick("demo", project.demoUrl)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-[10px] sm:text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                Live Demo <ExternalLink className="w-3 h-3" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleLinkClick("github", project.githubUrl)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-black/5 hover:bg-black/10 text-gray-700 hover:text-black text-[10px] sm:text-xs font-bold transition-all border border-black/5 cursor-pointer"
              >
                Code <Github className="w-3.5 h-3.5" />
              </a>
            </Magnetic>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 flex-1 w-full z-10 select-text">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Sticky Table of Contents */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 max-h-[calc(100vh-140px)] overflow-y-auto pr-4 py-2 border-r border-black/5">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono mb-6">Table of Contents</h4>
            <nav className="flex flex-col gap-3">
              {sections.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={(e) => handleScrollToSection(e, sec.id)}
                    className={`relative pl-3 text-xs font-semibold py-1 transition-all duration-300 border-l ${
                      isActive 
                        ? "text-red-500 border-red-500 font-bold" 
                        : "text-gray-400 border-black/5 hover:text-black hover:border-black/20"
                    }`}
                  >
                    {sec.label}
                  </a>
                );
              })}
            </nav>
          </aside>

          {/* Right: Rich Case Study Content */}
          <div className="lg:col-span-9 space-y-24 md:space-y-32">
            
            {/* Overview Section */}
            <section id="overview" className="scroll-mt-36">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <h2 className="text-2xl md:text-3xl font-extrabold text-black tracking-tight">Overview</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-8 font-normal">
                {study.overview}
              </p>

              {/* KPI Metrics cards */}
              {study.metrics && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {study.metrics.map((metric, idx) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="p-5 rounded-2xl border border-black/5 bg-gradient-to-br from-red-500/[0.01] via-rose-500/[0.01] to-transparent shadow-sm flex flex-col justify-between"
                    >
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">
                        {metric.label}
                      </span>
                      <div className="my-2.5">
                        <motion.h4 
                          initial={{ scale: 0.95 }}
                          whileInView={{ scale: 1 }}
                          className="text-base sm:text-lg font-extrabold text-black font-sans"
                        >
                          {metric.value}
                        </motion.h4>
                      </div>
                      <p className="text-[11px] text-gray-500 font-normal leading-normal">
                        {metric.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Project Meta Info Panel */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-3xl glass-panel border border-black/5 bg-white/50">
                <div>
                  <h5 className="text-[9px] font-bold text-gray-400 uppercase tracking-wider font-mono mb-1">Project Category</h5>
                  <span className="text-sm font-extrabold text-black uppercase tracking-wide">{project.category}</span>
                </div>
                <div>
                  <h5 className="text-[9px] font-bold text-gray-400 uppercase tracking-wider font-mono mb-1">My Role</h5>
                  <span className="text-sm font-extrabold text-black">Lead Developer</span>
                </div>
                <div>
                  <h5 className="text-[9px] font-bold text-gray-400 uppercase tracking-wider font-mono mb-1">Timeline</h5>
                  <span className="text-sm font-extrabold text-black">Academic Term</span>
                </div>
                <div>
                  <h5 className="text-[9px] font-bold text-gray-400 uppercase tracking-wider font-mono mb-1">Tech Stack</h5>
                  <span className="text-sm font-extrabold text-black flex flex-wrap gap-1 mt-0.5">
                    {project.tags.slice(0, 3).map(t => (
                      <span key={t} className="text-[9px] font-mono bg-black/5 px-1.5 py-0.5 rounded">{t}</span>
                    ))}
                  </span>
                </div>
              </div>
            </section>
            
            {/* Problem Statement Section */}
            <section id="problem-statement" className="scroll-mt-36">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <h2 className="text-2xl md:text-3xl font-extrabold text-black tracking-tight">Problem Statement</h2>
              </div>
              <div className="p-6 md:p-8 rounded-3xl bg-red-500/[0.02] border border-red-500/10 flex gap-4 md:gap-5 items-start">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0 text-red-600 mt-0.5">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base font-normal">
                    {study.problemStatement}
                  </p>
                </div>
              </div>
            </section>

            {/* Why I Built It Section */}
            <section id="why-built" className="scroll-mt-36">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <h2 className="text-2xl md:text-3xl font-extrabold text-black tracking-tight">Why I Built It</h2>
              </div>
              <div className="p-6 md:p-8 rounded-3xl bg-rose-500/[0.02] border border-rose-500/10 flex gap-4 md:gap-5 items-start">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center shrink-0 text-rose-600 mt-0.5">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base font-normal">
                    {study.whyIBuiltIt}
                  </p>
                </div>
              </div>
            </section>

            {/* System Architecture Section */}
            <section id="architecture" className="scroll-mt-36">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <h2 className="text-2xl md:text-3xl font-extrabold text-black tracking-tight">System Architecture</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-base mb-8 font-normal">
                {study.systemArchitecture.description}
              </p>

              {/* Dynamic Architecture Flow Visualization */}
              <div className="mb-12">
                <ArchitectureVisualizer projectId={projectId} />
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="scroll-mt-36">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <h2 className="text-2xl md:text-3xl font-extrabold text-black tracking-tight">Features</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {study.features.map((feat) => (
                  <div 
                    key={feat.title}
                    className="p-6 rounded-3xl bg-black/[0.01] border border-black/[0.04] flex flex-col justify-between hover:bg-white hover:border-red-500/10 hover:shadow-lg transition-all duration-300"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      </div>
                      <h4 className="font-extrabold text-black text-base mb-2">{feat.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Technical Challenges Section */}
            <section id="technical-challenges" className="scroll-mt-36">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <h2 className="text-2xl md:text-3xl font-extrabold text-black tracking-tight">Technical Challenges</h2>
              </div>

              <div className="space-y-6">
                {study.technicalChallenges.map((pair, idx) => (
                  <div key={idx} className="p-6 rounded-3xl bg-red-500/[0.01] border border-red-500/5 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-red-500 px-2 py-0.5 rounded bg-red-500/10 inline-block mb-3.5">
                        Challenge {idx + 1}
                      </span>
                      <h4 className="font-bold text-black text-base leading-relaxed">{pair.challenge}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Solutions Section */}
            <section id="solutions" className="scroll-mt-36">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <h2 className="text-2xl md:text-3xl font-extrabold text-black tracking-tight">Solutions</h2>
              </div>

              <div className="space-y-6">
                {study.technicalChallenges.map((pair, idx) => (
                  <div key={idx} className="p-6 rounded-3xl bg-emerald-500/[0.01] border border-emerald-500/5 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-600 px-2 py-0.5 rounded bg-emerald-500/10 inline-block mb-3.5">
                        Engineered Solution {idx + 1}
                      </span>
                      <h4 className="font-bold text-black text-sm mb-2 flex items-start gap-2">
                        <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{pair.solution}</span>
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Screenshots Section */}
            <section id="screenshots" className="scroll-mt-36">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <h2 className="text-2xl md:text-3xl font-extrabold text-black tracking-tight">Screenshots</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-base mb-8 font-normal">
                Browse the visual layout screens of the deployed platform below. Click any image to expand the interactive high-resolution lightbox gallery.
              </p>
              
              {/* Screenshots Gallery Grid */}
              {study.screenshots && study.screenshots.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                  {study.screenshots.map((shot, idx) => (
                    <motion.div
                      key={shot.src}
                      initial={{ opacity: 0, scale: 0.96 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => openLightbox(idx)}
                      className="group cursor-pointer rounded-2xl overflow-hidden border border-black/5 bg-black/[0.02] aspect-[16/10] flex flex-col justify-between shadow-sm hover:shadow-md hover:border-red-500/15"
                    >
                      {/* Thumbnail frame representing screenshot */}
                      <div className="w-full h-full bg-black/5 relative overflow-hidden flex-1 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-100/20 to-rose-200/20 opacity-40" />
                        <div className="text-[10px] font-mono font-bold text-red-500/60 flex flex-col items-center gap-1 select-none pointer-events-none">
                          <span>SCREENSHOT {idx + 1}</span>
                          <span className="text-[8px] text-gray-400 font-normal">Click to Expand</span>
                        </div>
                      </div>
                      <div className="p-3 bg-white border-t border-black/5 select-none pointer-events-none">
                        <p className="text-[10px] sm:text-xs text-gray-500 font-medium truncate">
                          {shot.caption}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center rounded-3xl border border-dashed border-black/10 bg-black/[0.01] text-gray-400 text-sm font-medium">
                  No screenshots uploaded yet.
                </div>
              )}
            </section>

            {/* Lessons Learned Section */}
            <section id="lessons" className="scroll-mt-36">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <h2 className="text-2xl md:text-3xl font-extrabold text-black tracking-tight">Lessons Learned</h2>
              </div>
              <ul className="space-y-4 max-w-xl">
                {study.lessonsLearned.map((lesson, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-gray-600 leading-relaxed">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Future Improvements Section */}
            <section id="future-improvements" className="scroll-mt-36">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <h2 className="text-2xl md:text-3xl font-extrabold text-black tracking-tight">Future Improvements</h2>
              </div>
              <ul className="space-y-4 max-w-xl">
                {study.futureImprovements.map((imp, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-gray-600 leading-relaxed">
                    <div className="w-6 h-6 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5 text-red-500 text-xs font-bold font-mono">
                      {idx + 1}
                    </div>
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </section>

          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && study.screenshots && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[999] flex flex-col justify-between p-6 select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close & Header */}
            <div className="flex items-center justify-between text-white/80 w-full max-w-7xl mx-auto py-2">
              <span className="text-xs font-mono font-bold tracking-widest uppercase">
                {project.title} — {lightboxIndex + 1} / {study.screenshots.length}
              </span>
              <button
                onClick={closeLightbox}
                className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Active Image Panel */}
            <div className="flex-1 flex items-center justify-center relative max-w-7xl mx-auto w-full">
              {/* Left arrow navigation */}
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 z-10 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors cursor-pointer hidden md:flex"
              >
                ←
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-4xl aspect-[16/10] bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center justify-center p-4 relative overflow-hidden"
                >
                  {/* Local placeholder graphic styled dynamically */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-rose-500/5 to-transparent flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3 text-center p-6 max-w-md">
                      <Bot className="w-12 h-12 text-red-400 animate-pulse animate-duration-1000" />
                      <h4 className="text-white font-extrabold text-sm sm:text-base tracking-tight leading-normal">
                        {study.screenshots[lightboxIndex].caption}
                      </h4>
                      <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed font-normal">
                        To add real screenshots, drop image files in `public/images/projects/` matching this target link path:
                        <code className="block mt-2 text-[9px] font-mono bg-white/10 text-rose-300 p-1.5 rounded select-all">
                          {study.screenshots[lightboxIndex].src}
                        </code>
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Right arrow navigation */}
              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 z-10 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors cursor-pointer hidden md:flex"
              >
                →
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="text-center text-white/70 w-full max-w-4xl mx-auto py-4 text-xs sm:text-sm font-medium">
              {study.screenshots[lightboxIndex].caption}
              <div className="text-[10px] text-gray-500 font-mono mt-1 md:hidden">
                Swipe left/right or tap edges to navigate
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Award, Briefcase, Sparkles, Cloud, AppWindow, Cpu, Link2, Activity } from "lucide-react";

interface RoadmapNode {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  type: "academic" | "hackathon" | "work" | "certification" | "product";
  desc: string;
  icon: React.ReactNode;
}

const roadmapNodes: RoadmapNode[] = [
  {
    id: "sih",
    year: "2024",
    title: "Smart India Hackathon",
    subtitle: "Govt. of India • Heritage Tourism",
    type: "hackathon",
    desc: "Represented university in designing and building a Heritage Tourism Platform. Built maps exploration engines and geo-artisan lookup tools.",
    icon: <Award className="w-4.5 h-4.5" />
  },
  {
    id: "excelerate",
    year: "2025",
    title: "Excelerate Associate",
    subtitle: "Excelerate • Postgres SQL Data Visualisation",
    type: "work",
    desc: "Authored PostgreSQL query pipelines, performed database aggregates, and designed interactive analytics metrics pages on Looker Studio.",
    icon: <Briefcase className="w-4.5 h-4.5" />
  },
  {
    id: "bcg",
    year: "2025",
    title: "BCG GenAI Experience",
    subtitle: "BCG • LLM Engineering & Prompts",
    type: "certification",
    desc: "Virtual program covering large language model applications, semantic layouts, structured business analytics, and prompt design methodologies.",
    icon: <Sparkles className="w-4.5 h-4.5" />
  },
  {
    id: "elevate",
    year: "2025",
    title: "Data Analyst Intern",
    subtitle: "Elevate Labs • Power BI Dashboards",
    type: "work",
    desc: "Built Power BI business intelligence dashboards, monitored core growth KPIs, and executed exploratory analytics on sales and user retention.",
    icon: <Briefcase className="w-4.5 h-4.5" />
  },
  {
    id: "aws",
    year: "2025",
    title: "AWS Cloud Foundations",
    subtitle: "AWS Academy • Cloud Deployment",
    type: "certification",
    desc: "Explored cloud architectures, serverless EC2 hosting, S3 bucket configurations, network routing, and server deployment protocols.",
    icon: <Cloud className="w-4.5 h-4.5" />
  },
  {
    id: "portfolio",
    year: "2026",
    title: "Campus Connect Portfolio",
    subtitle: "Fullstack Architecture & Products",
    type: "product",
    desc: "Developed a full-stack community portal (Campus Connect) utilizing Node.js, React, Express, MongoDB, and PostgreSQL aggregates.",
    icon: <AppWindow className="w-4.5 h-4.5" />
  }
];

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeNode, setActiveNode] = useState<RoadmapNode | null>(roadmapNodes[0]);
  const [isMobile, setIsMobile] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  useEffect(() => {
    const handleResize = () => {
      const w = containerRef.current?.clientWidth || 800;
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setDimensions({ width: w, height: mobile ? 600 : 400 });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const titleWords = "Career Node Network".split(" ");

  // Coordinates mapping for branching network nodes on desktop, vertical linear flow on mobile
  const getNodeCoords = (nodeId: string) => {
    if (isMobile) {
      const idx = roadmapNodes.findIndex(n => n.id === nodeId);
      const x = 40;
      const spacing = dimensions.height / (roadmapNodes.length + 0.5);
      const y = spacing * (idx + 0.7);
      return { x, y };
    } else {
      // 2D branch layout coordinates
      switch (nodeId) {
        case "sih": return { x: 120, y: 90 };
        case "bcg": return { x: 380, y: 90 };
        case "elevate": return { x: 120, y: 310 };
        case "excelerate": return { x: 380, y: 310 };
        case "aws": return { x: 120, y: 200 };
        case "portfolio": return { x: 680, y: 200 };
        default: return { x: 400, y: 200 };
      }
    }
  };

  const getConnections = () => {
    if (isMobile) {
      const paths = [];
      for (let i = 0; i < roadmapNodes.length - 1; i++) {
        paths.push({ from: roadmapNodes[i].id, to: roadmapNodes[i + 1].id });
      }
      return paths;
    } else {
      return [
        { from: "sih", to: "bcg" },
        { from: "bcg", to: "portfolio" },
        { from: "elevate", to: "excelerate" },
        { from: "excelerate", to: "portfolio" },
        { from: "aws", to: "portfolio" }
      ];
    }
  };

  return (
    <section 
      id="certifications" // keep target ID same for links consistency
      className="py-28 md:py-36 px-6 md:px-12 relative border-t border-black/[0.03] overflow-hidden select-none bg-gradient-to-b from-white via-rose-50/[0.005] to-white"
    >
      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Section Heading */}
        <div className="flex flex-col mb-16 md:mb-20">
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="w-6 h-[1px] bg-red-500 origin-left block" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 font-mono">05 / Experience Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight flex gap-x-3 flex-wrap">
            {titleWords.map((word, idx) => (
              <span key={idx} className="inline-block overflow-hidden">
                <motion.span
                  initial={{ y: "100%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 110, 
                    damping: 20,
                    delay: idx * 0.05 
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>
        </div>

        {/* Visual Roadmap container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* SVG Visual Wall Column */}
          <div className="lg:col-span-8 relative">
            <div 
              ref={containerRef}
              className="w-full relative rounded-3xl border border-black/[0.03] bg-gradient-to-b from-black/[0.01] to-transparent overflow-hidden"
              style={{ height: `${dimensions.height}px` }}
            >
              {/* Connection Vector Pathways */}
              <svg 
                className="absolute inset-0 pointer-events-none w-full h-full z-10"
                viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
              >
                <defs>
                  <linearGradient id="networkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {getConnections().map((conn, idx) => {
                  const fromCoords = getNodeCoords(conn.from);
                  const toCoords = getNodeCoords(conn.to);
                  const isActive = (activeNode?.id === conn.from) || (activeNode?.id === conn.to);

                  return (
                    <g key={`connection-${idx}`}>
                      {/* Base Path line */}
                      <motion.line
                        x1={fromCoords.x}
                        y1={fromCoords.y}
                        x2={toCoords.x}
                        y2={toCoords.y}
                        stroke={isActive ? "#ef4444" : "#e5e7eb"}
                        strokeWidth={isActive ? "2" : "1.2"}
                        strokeOpacity={isActive ? "0.6" : "0.5"}
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: idx * 0.1 }}
                        className="transition-all duration-300"
                      />

                      {/* Animated Data Packet Flow */}
                      {!shouldReduceMotion && (
                        <circle r="3" fill="#ef4444" opacity={isActive ? "0.8" : "0.2"}>
                          <animateMotion
                            dur={isActive ? "1.8s" : "3s"}
                            repeatCount="indefinite"
                            path={`M ${fromCoords.x},${fromCoords.y} L ${toCoords.x},${toCoords.y}`}
                          />
                        </circle>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Roadmap Interactive Node Markers */}
              {roadmapNodes.map((node) => {
                const coords = getNodeCoords(node.id);
                const isActive = activeNode?.id === node.id;
                
                return (
                  <div
                    key={node.id}
                    style={{
                      left: `${coords.x}px`,
                      top: `${coords.y}px`,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                    {/* Pulsing indicator on active node */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-full bg-red-500/10 filter blur-sm scale-150 animate-pulse" />
                    )}
                    
                    <button
                      onClick={() => setActiveNode(node)}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border flex items-center justify-center cursor-pointer shadow-md transition-all duration-300 hover:scale-105 active:scale-98 ${
                        isActive
                          ? "border-red-500 text-red-600 scale-110 ring-4 ring-red-500/10 shadow-lg shadow-red-500/10"
                          : "border-black/5 text-gray-400 hover:text-black hover:border-black/15"
                      }`}
                    >
                      {node.icon}
                    </button>
                    {/* Mini Year Tag */}
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-bold font-mono text-gray-400 select-none whitespace-nowrap">
                      {node.year}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Node Description Details Column */}
          <div className="lg:col-span-4 h-full flex items-center">
            <div className="w-full flex flex-col gap-6">
              <AnimatePresence mode="wait">
                {activeNode && (
                  <motion.div
                    key={activeNode.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="p-6 sm:p-8 rounded-3xl border border-black/5 bg-white shadow-md hover:border-red-500/15 hover:shadow-lg transition-all duration-300 w-full relative overflow-hidden glass-panel"
                  >
                    {/* Soft red accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-500/40" />

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] font-bold text-red-500 font-mono tracking-widest uppercase">
                        {activeNode.year} • {activeNode.type.toUpperCase()}
                      </span>
                      <div className="flex items-center gap-1 text-[8px] font-mono text-emerald-500 font-bold uppercase">
                        <Activity className="w-3 h-3 animate-pulse" /> Live Node
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-extrabold text-black mb-1">
                      {activeNode.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-bold font-mono tracking-wider uppercase mb-5">
                      {activeNode.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                      {activeNode.desc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* General Legend/Insight widget */}
              <div className="p-5 rounded-2xl bg-black/[0.01] border border-black/[0.03] flex flex-col gap-2.5">
                <span className="text-[9px] font-bold text-gray-400 font-mono tracking-widest uppercase flex items-center gap-1.5">
                  <Link2 className="w-3.5 h-3.5 text-gray-400" /> Career Topology
                </span>
                <p className="text-[10px] text-gray-500 leading-relaxed">
                  Nodes represent milestones branching across hackathons, work experience, certifications, and product development, culminating in full-stack architecture projects.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

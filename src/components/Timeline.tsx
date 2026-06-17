"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { GraduationCap, Briefcase, Calendar, Award, ShieldAlert, Sparkles, Cloud, AppWindow } from "lucide-react";

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
    title: "Campus Connect",
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
      setDimensions({ width: w, height: mobile ? 650 : 380 });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const titleWords = "Career Visualization Wall".split(" ");

  // Define desktop node layout coordinates (3 columns, 2 rows)
  // Col 0, 1, 2 for Row 0: Left to Right
  // Col 2, 1, 0 for Row 1: Right to Left (snake flow)
  const getNodeCoords = (idx: number) => {
    if (isMobile) {
      // Linear vertical path coordinate
      const x = 32;
      const spacing = dimensions.height / (roadmapNodes.length + 0.5);
      const y = spacing * (idx + 0.7);
      return { x, y };
    } else {
      // 3 cols, 2 rows grid coordinates inside viewBox
      const colSpacing = dimensions.width / 4;
      const rowSpacing = dimensions.height / 3;
      
      let col = idx;
      let row = 0;
      if (idx > 2) {
        col = 5 - idx; // Col index flips for Row 1 to make snake loop
        row = 1;
      }
      
      const x = colSpacing * (col + 1);
      const y = rowSpacing * (row + 1);
      return { x, y };
    }
  };

  // Generate SVG path 'd' string looping through nodes
  const getPathD = () => {
    if (roadmapNodes.length === 0) return "";
    let d = "";
    
    if (isMobile) {
      const start = getNodeCoords(0);
      d = `M ${start.x} ${start.y}`;
      for (let i = 1; i < roadmapNodes.length; i++) {
        const pt = getNodeCoords(i);
        d += ` L ${pt.x} ${pt.y}`;
      }
    } else {
      const p0 = getNodeCoords(0);
      const p1 = getNodeCoords(1);
      const p2 = getNodeCoords(2);
      const p3 = getNodeCoords(3);
      const p4 = getNodeCoords(4);
      const p5 = getNodeCoords(5);

      // Snake flow curved loops
      // Loop Col 0 -> Col 1 -> Col 2
      // Curve loop down from Col 2 Row 0 to Col 2 Row 1
      // Loop Col 2 -> Col 1 -> Col 0
      d = `M ${p0.x} ${p0.y} 
           L ${p1.x} ${p1.y} 
           L ${p2.x} ${p2.y} 
           C ${p2.x + 80} ${p2.y}, ${p3.x + 80} ${p3.y}, ${p3.x} ${p3.y}
           L ${p4.x} ${p4.y}
           L ${p5.x} ${p5.y}`;
    }
    return d;
  };

  return (
    <section 
      id="certifications" // keep target ID same for links consistency
      className="py-28 md:py-36 px-6 md:px-12 relative border-t border-black/[0.03] overflow-hidden select-none"
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
                {/* Base Grey Path */}
                <path 
                  d={getPathD()} 
                  fill="none" 
                  stroke="#e5e7eb" 
                  strokeWidth="2.5" 
                  opacity="0.6"
                />
                
                {/* Animated Data Packet Flow path */}
                {!shouldReduceMotion && (
                  <motion.path 
                    d={getPathD()} 
                    fill="none" 
                    stroke="#ef4444" 
                    strokeWidth="2.5"
                    strokeDasharray="8 24"
                    initial={{ strokeDashoffset: 100 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    opacity="0.8"
                  />
                )}
              </svg>

              {/* Roadmap Interactive Node Markers */}
              {roadmapNodes.map((node, idx) => {
                const coords = getNodeCoords(idx);
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
                    {/* Glowing outer dot wrapper */}
                    <button
                      onClick={() => setActiveNode(node)}
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border flex items-center justify-center cursor-pointer shadow-md transition-all duration-300 ${
                        isActive
                          ? "border-red-500 text-red-600 scale-110 ring-4 ring-red-500/10 shadow-lg shadow-red-500/10"
                          : "border-black/5 text-gray-400 hover:text-black hover:border-black/15"
                      }`}
                    >
                      {node.icon}
                    </button>
                    {/* Mini Year Tag */}
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-bold font-mono text-gray-400 select-none">
                      {node.year}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Node Description Details Column */}
          <div className="lg:col-span-4 h-full flex items-center">
            <div className="w-full">
              <AnimatePresence mode="wait">
                {activeNode && (
                  <motion.div
                    key={activeNode.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="p-6 sm:p-8 rounded-3xl border border-black/5 bg-gradient-to-br from-red-500/[0.01] via-rose-500/[0.01] to-white shadow-md shadow-red-500/[0.005] hover:border-red-500/10 transition-colors w-full"
                  >
                    <span className="text-[9px] font-bold text-red-500 font-mono tracking-widest uppercase block mb-1">
                      {activeNode.year} • {activeNode.type.toUpperCase()}
                    </span>
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
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

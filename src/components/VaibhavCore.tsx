"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sparkles, Terminal, Activity, Link2, Monitor, Cpu } from "lucide-react";

interface ProjectHighlight {
  title: string;
  desc: string;
}

interface CoreSkill {
  name: string;
  category: string;
  desc: string;
  glowColor: string;
  projects: ProjectHighlight[];
}

const coreSkills: CoreSkill[] = [
  {
    name: "Python",
    category: "Data Analytics & AI",
    desc: "Advanced scripting, automation pipelines, and statistical analysis using Pandas and NumPy.",
    glowColor: "#3b82f6", // Blue
    projects: [
      { title: "BCG GenAI Virtual Experience", desc: "Built automated financial evaluation models and analysis scripts." },
      { title: "ETL Aggregation Pipelines", desc: "Automated CSV parsing, cleaning, and database indexing." }
    ]
  },
  {
    name: "SQL",
    category: "Relational Databases",
    desc: "Database schema design, query optimization, indexing, and aggregates in PostgreSQL.",
    glowColor: "#ef4444", // Red
    projects: [
      { title: "Excelerate Relational Analytics", desc: "Wrote complex multi-join SQL aggregates for SLU performance metrics." },
      { title: "Elevate Labs DBMS Design", desc: "Optimized relational tables, indexing, and database normalization schemas." }
    ]
  },
  {
    name: "Power BI",
    category: "Business Intelligence",
    desc: "Data modeling, DAX queries, and dashboard reporting for executive stakeholders.",
    glowColor: "#f59e0b", // Amber
    projects: [
      { title: "Elevate Labs Revenue Dashboard", desc: "Designed user-retention dashboards to track growth KPIs." },
      { title: "Looker Studio BI Reports", desc: "Aggregated performance reporting audits for operations." }
    ]
  },
  {
    name: "React",
    category: "Frontend Architecture",
    desc: "Responsive UI development, Next.js framework, state managers, and custom tailwind interactions.",
    glowColor: "#38bdf8", // Sky
    projects: [
      { title: "Campus Connect Community", desc: "Designed full frontend student portal and user feeds." },
      { title: "SIH 2024 Travel Platform", desc: "Integrated Map engine APIs and responsive design grids." }
    ]
  },
  {
    name: "Node.js",
    category: "Backend Engineering",
    desc: "REST APIs, Express backend servers, routing, middleware controls, and session authentication.",
    glowColor: "#10b981", // Emerald
    projects: [
      { title: "Campus Connect REST API", desc: "Built custom routing controllers and authorization middleware." },
      { title: "API Microservices Gateway", desc: "Configured API gateways, rate limiters, and logs." }
    ]
  },
  {
    name: "MongoDB",
    category: "NoSQL Databases",
    desc: "Document-oriented database design, index optimization, and aggregation pipelines.",
    glowColor: "#4ade80", // Green
    projects: [
      { title: "Campus Connect Chat DB", desc: "Implemented scalable message logs using NoSQL schemas." },
      { title: "Document aggregation pipelines", desc: "Wrote high-speed search indexers for marketplace items." }
    ]
  },
  {
    name: "AWS",
    category: "Cloud Infrastructure",
    desc: "AWS Academy configurations, virtual instances hosting, and static CDNs.",
    glowColor: "#f97316", // Orange
    projects: [
      { title: "AWS Academy Deployments", desc: "Hosted application assets on secure EC2 clusters." },
      { title: "S3 CDN Storage Systems", desc: "Integrated AWS SDK to distribute static assets via CDN." }
    ]
  },
  {
    name: "AI",
    category: "Machine Learning & LLMs",
    desc: "Integrating Large Language Models, prompt crafting, and structuring unstructured text data.",
    glowColor: "#a855f7", // Purple
    projects: [
      { title: "BCG GenAI Financial Assistant", desc: "Built context-aware prompt assistants for corporate datasets." },
      { title: "Smart Chat Routing Bots", desc: "Created intent routing models using API agents." }
    ]
  },
  {
    name: "Cybersecurity",
    category: "Security & Operations",
    desc: "Secure backend practices, token-based authentication, validation sanitation, and encryption protocols.",
    glowColor: "#ec4899", // Pink
    projects: [
      { title: "Secure API Audits", desc: "Implemented CSRF guards, SQLi sanitisers, and rate limits." },
      { title: "Cryptographic Authentication", desc: "Wrote secure password hashing using bcrypt salts." }
    ]
  }
];

export default function VaibhavCore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [dimensions, setDimensions] = useState({ width: 600, height: 500 });
  const [radius, setRadius] = useState(180);
  const [activeSkill, setActiveSkill] = useState<CoreSkill | null>(coreSkills[0]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const w = containerRef.current?.clientWidth || 600;
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      let rad = 175;
      let h = 500;
      if (window.innerWidth < 480) {
        rad = 85;
        h = 320;
      } else if (window.innerWidth < 768) {
        rad = 120;
        h = 380;
      }

      setRadius(rad);
      setDimensions({ width: w, height: h });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleSelectSkill = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const matched = coreSkills.find(s => s.name === customEvent.detail);
      if (matched) {
        setActiveSkill(matched);
      }
    };
    window.addEventListener("select-skill", handleSelectSkill);
    return () => window.removeEventListener("select-skill", handleSelectSkill);
  }, []);

  const cx = dimensions.width / 2;
  const cy = dimensions.height / 2;
  const titleWords = "Vaibhav Core Network".split(" ");

  // Handle active index mapping
  const activeSkillIndex = activeSkill ? coreSkills.findIndex(s => s.name === activeSkill.name) : 0;

  return (
    <section id="vaibhav-core" className="py-28 md:py-36 px-6 md:px-12 relative overflow-hidden select-none border-t border-black/[0.03]">
      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Section Heading */}
        <div className="flex flex-col mb-12 md:mb-16">
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="w-6 h-[1px] bg-red-500 origin-left block" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 font-mono">02 / Core System</span>
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

        {/* Network Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* SVG Visualizer Column (Columns 1-7) */}
          <div className="lg:col-span-7 relative">
            <div 
              ref={containerRef} 
              className="w-full relative rounded-3xl border border-black/[0.03] bg-gradient-to-b from-black/[0.01] to-transparent overflow-hidden"
              style={{ height: `${dimensions.height}px` }}
            >
              {/* SVG Constellation Network */}
              <svg 
                className="absolute inset-0 pointer-events-none w-full h-full z-10"
                viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
              >
                <defs>
                  {coreSkills.map((skill) => (
                    <linearGradient key={skill.name} id={`grad-${skill.name}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.5" />
                      <stop offset="100%" stopColor={skill.glowColor} stopOpacity="0.1" />
                    </linearGradient>
                  ))}
                  
                  {/* Neon radial glow filter */}
                  <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* 1. Outer Constellation Ring Polygon Paths */}
                {coreSkills.map((skill, idx) => {
                  const nextIdx = (idx + 1) % coreSkills.length;
                  const angle1 = (idx * 2 * Math.PI) / coreSkills.length;
                  const angle2 = (nextIdx * 2 * Math.PI) / coreSkills.length;
                  const x1 = cx + radius * Math.cos(angle1);
                  const y1 = cy + radius * Math.sin(angle1);
                  const x2 = cx + radius * Math.cos(angle2);
                  const y2 = cy + radius * Math.sin(angle2);
                  const isConnectionActive = (hoveredIndex === idx) || (hoveredIndex === nextIdx) || 
                                             (activeSkillIndex === idx && hoveredIndex === null) ||
                                             (activeSkillIndex === nextIdx && hoveredIndex === null);

                  return (
                    <line
                      key={`ring-${idx}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={isConnectionActive ? "#ef4444" : "#000"}
                      strokeOpacity={isConnectionActive ? "0.3" : "0.04"}
                      strokeWidth={isConnectionActive ? "1.5" : "1"}
                      className="transition-all duration-300"
                    />
                  );
                })}
                
                {/* 2. Core to Skill connections */}
                {coreSkills.map((skill, idx) => {
                  const angle = (idx * 2 * Math.PI) / coreSkills.length;
                  const nx = cx + radius * Math.cos(angle);
                  const ny = cy + radius * Math.sin(angle);
                  const isHovered = hoveredIndex === idx;
                  const isActive = activeSkill?.name === skill.name && hoveredIndex === null;
                  const isGlowActive = isHovered || isActive;

                  return (
                    <g key={skill.name}>
                      <line 
                        x1={cx} 
                        y1={cy} 
                        x2={nx} 
                        y2={ny} 
                        stroke={`url(#grad-${skill.name})`}
                        strokeWidth={isGlowActive ? "2.5" : "1.2"} 
                        opacity={isGlowActive ? "0.9" : "0.25"}
                        className="transition-all duration-300"
                      />
                      
                      {/* Interactive Data Packets */}
                      {(!isMobile && !shouldReduceMotion) && (
                        <circle r="3" fill="#ef4444" opacity={isGlowActive ? "0.9" : "0.2"}>
                          <animateMotion 
                            dur={isGlowActive ? "1.8s" : "3.5s"} 
                            repeatCount="indefinite" 
                            path={`M ${cx},${cy} L ${nx},${ny}`} 
                          />
                        </circle>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Reactor Core Center Node */}
              <div
                style={{
                  left: `${cx}px`,
                  top: `${cy}px`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
              >
                <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-gradient-to-tr from-red-500 via-rose-500 to-rose-600 text-white font-extrabold text-[8px] sm:text-[9px] uppercase tracking-wider flex flex-col items-center justify-center border border-white/20 shadow-lg shadow-red-500/20 select-none relative">
                  {/* Rotating decorative CSS outer circle */}
                  <div className="absolute inset-0 rounded-full border border-white/10 border-t-white animate-[spin_8s_linear_infinite]" />
                  <Cpu className="w-3.5 h-3.5 mb-1 animate-pulse" />
                  <span className="text-[7px] font-mono opacity-80 leading-none">SYSTEM</span>
                  <span className="font-extrabold text-[10px] tracking-tight leading-none mt-0.5">CORE</span>
                </div>
                <div className="absolute inset-0 rounded-full bg-red-500/10 filter blur-md animate-pulse pointer-events-none scale-110" />
              </div>

              {/* Outer Primary Skill Nodes */}
              {coreSkills.map((skill, idx) => {
                const angle = (idx * 2 * Math.PI) / coreSkills.length;
                const nx = cx + radius * Math.cos(angle);
                const ny = cy + radius * Math.sin(angle);
                const isHovered = hoveredIndex === idx;
                const isActive = activeSkill?.name === skill.name && hoveredIndex === null;
                const isGlow = isHovered || isActive;

                return (
                  <motion.button
                    key={skill.name}
                    style={{
                      left: `${nx}px`,
                      top: `${ny}px`,
                    }}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setActiveSkill(skill)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-xl border text-[10px] sm:text-xs font-bold font-mono transition-all duration-300 z-20 cursor-pointer shadow-sm ${
                      isGlow
                        ? "bg-gradient-to-r from-red-500/10 to-rose-500/10 border-red-500/30 text-red-600 font-extrabold shadow-md scale-105"
                        : "bg-white/80 border-black/5 text-gray-500 hover:text-black hover:border-black/10 hover:bg-white"
                    }`}
                  >
                    {skill.name}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Details & Dynamic Related Projects Column (Columns 8-12) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <AnimatePresence mode="wait">
              {activeSkill && (
                <motion.div
                  key={activeSkill.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="p-6 sm:p-8 rounded-3xl border border-black/5 bg-white shadow-md flex flex-col gap-5 relative overflow-hidden glass-panel"
                >
                  {/* Glowing edge accents */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-40 transition-colors"
                    style={{ backgroundColor: activeSkill.glowColor }}
                  />
                  
                  {/* Title Area */}
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-bold text-gray-400 font-mono tracking-widest uppercase block mb-1">
                        {activeSkill.category}
                      </span>
                      <h3 className="text-xl font-extrabold text-black flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeSkill.glowColor }} />
                        {activeSkill.name}
                      </h3>
                    </div>
                    
                    {/* Status Badge */}
                    <div className="p-1.5 px-2.5 rounded-xl bg-gradient-to-r from-red-500/5 to-rose-500/5 border border-red-500/10 flex items-center gap-1.5 font-mono text-[9px] text-red-600 font-bold uppercase">
                      <Activity className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                      <span>Optimized</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                    {activeSkill.desc}
                  </p>

                  <div className="w-full h-[1px] bg-black/5" />

                  {/* Related Projects highlights */}
                  <div className="flex flex-col gap-3">
                    <span className="text-[9px] font-bold text-gray-400 font-mono tracking-widest uppercase flex items-center gap-1.5">
                      <Link2 className="w-3.5 h-3.5 text-gray-400" /> Integrated Projects
                    </span>
                    
                    <div className="flex flex-col gap-2.5">
                      {activeSkill.projects.map((proj) => (
                        <div 
                          key={proj.title}
                          className="p-3.5 rounded-2xl bg-black/[0.01] border border-black/[0.03] hover:border-black/10 hover:bg-black/[0.02] transition-all duration-300"
                        >
                          <h4 className="text-xs font-bold text-black flex items-center justify-between">
                            <span>{proj.title}</span>
                            <span className="text-[8px] font-mono text-gray-400 uppercase font-medium">Core Tech</span>
                          </h4>
                          <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
                            {proj.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* General System Indicators */}
            <div className="p-6 rounded-3xl border border-black/[0.03] bg-black/[0.01] flex flex-col gap-4">
              <div>
                <h4 className="text-xs font-bold text-black uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5 text-red-500" /> Core Telemetry Status
                </h4>
                <p className="text-[10px] text-gray-400 font-normal mt-1">
                  Active connection points monitoring system throughput. Hover nodes for detailed mappings.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-[9px] font-mono text-gray-500 font-medium">
                <div className="flex flex-col p-2 bg-white rounded-xl border border-black/[0.02] shadow-sm">
                  <span className="text-gray-400 font-bold uppercase">NODES CONNECTED</span>
                  <span className="text-black font-extrabold text-xs mt-0.5">9 / 9 Online</span>
                </div>
                <div className="flex flex-col p-2 bg-white rounded-xl border border-black/[0.02] shadow-sm">
                  <span className="text-gray-400 font-bold uppercase">LATENCY SPEED</span>
                  <span className="text-emerald-600 font-extrabold text-xs mt-0.5">14ms Stable</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

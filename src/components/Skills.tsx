"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sparkles, Terminal } from "lucide-react";
import { currentlyExploring } from "../data/skills";

interface GalaxyNode {
  name: string;
  category: string;
  desc: string;
  color: string;
}

const galaxySkills: GalaxyNode[] = [
  { name: "Python", category: "Analytics & Automation", desc: "Data processing with Pandas/NumPy, scripting, automation, and API development.", color: "from-blue-500 to-indigo-500" },
  { name: "SQL", category: "Databases", desc: "Relational database design, complex joins, indexing, and query optimization in PostgreSQL.", color: "from-emerald-500 to-teal-500" },
  { name: "Power BI", category: "Business Intelligence", desc: "Interactive BI dashboards, DAX queries, and analytics reports.", color: "from-yellow-500 to-amber-500" },
  { name: "React", category: "Frontend Web", desc: "Next.js development, responsive Tailwind CSS layouts, and interactive React states.", color: "from-sky-400 to-blue-600" },
  { name: "Node.js", category: "Backend APIs", desc: "Express server routing, API security, and database integration.", color: "from-green-500 to-emerald-600" },
  { name: "MongoDB", category: "NoSQL Database", desc: "Document-oriented schema designs, indexes, and aggregation pipelines.", color: "from-emerald-600 to-green-600" },
  { name: "AWS", category: "Cloud Services", desc: "AWS deployment basics, EC2 virtual instances, and S3 file storage.", color: "from-orange-500 to-amber-600" },
  { name: "AI", category: "Machine Learning", desc: "LLM api integrations, prompt design, and data pre-processing pipelines.", color: "from-purple-500 to-pink-500" },
  { name: "Cybersecurity", category: "Network Security", desc: "Information security fundamentals, packet inspection, and secure coding practices.", color: "from-red-500 to-rose-600" },
];

const subClusters: Record<string, string[]> = {
  "Python": ["Data Analytics", "AI Pipelines", "Automation"],
  "SQL": ["PostgreSQL", "Queries", "Schema Design"],
  "Power BI": ["DAX Modeling", "Looker Studio", "KPI Reports"],
  "React": ["Campus Connect", "UX Design", "Frontend Dev"],
  "Node.js": ["Express.js", "REST APIs", "Routing"],
  "MongoDB": ["Aggregations", "NoSQL Schema", "JSON Logs"],
  "AWS": ["EC2 Instances", "S3 Storage", "Deploy Ops"],
  "AI": ["LLMs Wrapper", "Prompts Engine", "Data Prep"],
  "Cybersecurity": ["Network Scans", "InfoSec Basics", "Secure APIs"]
};

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [dimensions, setDimensions] = useState({ width: 600, height: 460 });
  const [radius, setRadius] = useState(150);
  const [activeSkill, setActiveSkill] = useState<GalaxyNode | null>(galaxySkills[0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const w = containerRef.current?.clientWidth || 600;
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      let rad = 175;
      let h = 460;
      if (window.innerWidth < 480) {
        rad = 80;
        h = 290;
      } else if (window.innerWidth < 768) {
        rad = 110;
        h = 340;
      }
      
      setRadius(rad);
      setDimensions({ width: w, height: h });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cx = dimensions.width / 2;
  const cy = dimensions.height / 2;
  const titleWords = "Skill Constellation 2.0".split(" ");

  // Find index of active skill to calculate coordinates for sub-nodes
  const activeSkillIndex = activeSkill ? galaxySkills.findIndex(s => s.name === activeSkill.name) : -1;
  const activeNodeAngle = activeSkillIndex !== -1 ? (activeSkillIndex * 2 * Math.PI) / galaxySkills.length : 0;
  const anx = cx + radius * Math.cos(activeNodeAngle);
  const any = cy + radius * Math.sin(activeNodeAngle);
  const activeSubNodes = activeSkill ? subClusters[activeSkill.name] || [] : [];
  const subNodeDistance = isMobile ? 40 : 55;

  return (
    <section id="skills" className="py-28 md:py-36 px-6 md:px-12 relative overflow-hidden select-none border-t border-black/[0.03]">
      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Section Heading */}
        <div className="flex flex-col mb-12 md:mb-16">
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="w-6 h-[1px] bg-red-500 origin-left block" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 font-mono">02 / Expertise</span>
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

        {/* Skill Galaxy Node Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Galaxy Render Column */}
          <div className="lg:col-span-8 relative">
            <div 
              ref={containerRef} 
              className="w-full relative rounded-3xl border border-black/[0.03] bg-gradient-to-b from-black/[0.01] to-transparent overflow-hidden"
              style={{ height: `${dimensions.height}px` }}
            >
              {/* SVG Constellation Connections */}
              <svg 
                className="absolute inset-0 pointer-events-none w-full h-full z-10"
                viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
              >
                <defs>
                  <linearGradient id="line-grad-const" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#d1d5db" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                
                {/* 1. Main Hub to Skill connections */}
                {galaxySkills.map((skill, idx) => {
                  const angle = (idx * 2 * Math.PI) / galaxySkills.length;
                  const nx = cx + radius * Math.cos(angle);
                  const ny = cy + radius * Math.sin(angle);
                  const isActive = activeSkill?.name === skill.name;

                  return (
                    <g key={skill.name}>
                      <line 
                        x1={cx} 
                        y1={cy} 
                        x2={nx} 
                        y2={ny} 
                        stroke="url(#line-grad-const)" 
                        strokeWidth={isActive ? "2" : "1.2"} 
                        opacity={isActive ? "0.8" : "0.3"}
                        className="transition-all duration-300"
                      />
                      
                      {!isMobile && !shouldReduceMotion && (
                        <motion.line
                          x1={cx}
                          y1={cy}
                          x2={nx}
                          y2={ny}
                          stroke="#ef4444"
                          strokeWidth="1.5"
                          strokeDasharray="4 16"
                          initial={{ strokeDashoffset: 100 }}
                          animate={{ strokeDashoffset: 0 }}
                          transition={{
                            duration: 12 + idx * 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          opacity={isActive ? "0.9" : "0.3"}
                        />
                      )}
                    </g>
                  );
                })}

                {/* 2. Sub-constellation lines (sprouting from active skill node) */}
                {activeSkill && activeSubNodes.map((_, idx) => {
                  // Distribute sub-node angles radially outward from active node
                  const offsetAngles = [-0.4, 0, 0.4];
                  const subAngle = activeNodeAngle + offsetAngles[idx];
                  const snx = anx + subNodeDistance * Math.cos(subAngle);
                  const sny = any + subNodeDistance * Math.sin(subAngle);

                  return (
                    <motion.line
                      key={idx}
                      initial={{ x1: anx, y1: any, x2: anx, y2: any, opacity: 0 }}
                      animate={{ x1: anx, y1: any, x2: snx, y2: sny, opacity: 0.8 }}
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                      stroke="#f43f5e"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />
                  );
                })}
              </svg>

              {/* Hub Node (VAIBHAV) */}
              <motion.div
                style={{
                  left: `${cx}px`,
                  top: `${cy}px`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-red-500 to-rose-600 text-white font-extrabold text-[9px] sm:text-[10px] uppercase tracking-widest flex flex-col items-center justify-center border-2 border-white/25 shadow-lg shadow-red-500/20 select-none">
                  <Sparkles className="w-3.5 h-3.5 mb-1 animate-pulse text-white/90" />
                  <span>Vaibhav</span>
                </div>
                <div className="absolute inset-0 rounded-full border border-red-500/20 animate-ping opacity-25 pointer-events-none scale-110" />
              </motion.div>

              {/* Outer Primary Skill Nodes */}
              {galaxySkills.map((skill, idx) => {
                const angle = (idx * 2 * Math.PI) / galaxySkills.length;
                const nx = cx + radius * Math.cos(angle);
                const ny = cy + radius * Math.sin(angle);
                const isActive = activeSkill?.name === skill.name;

                return (
                  <motion.button
                    key={skill.name}
                    style={{
                      left: `${nx}px`,
                      top: `${ny}px`,
                    }}
                    onClick={() => setActiveSkill(skill)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-xl border text-[10px] sm:text-xs font-bold font-mono transition-all duration-300 z-20 cursor-pointer shadow-sm ${
                      isActive
                        ? "bg-gradient-to-r from-red-500/15 to-rose-500/15 border-red-500/30 text-red-600 font-extrabold shadow-md"
                        : "bg-white/80 border-black/5 text-gray-500 hover:text-black hover:border-black/10 hover:bg-white"
                    }`}
                  >
                    {skill.name}
                  </motion.button>
                );
              })}

              {/* Sub-Constellation Nodes (Sprouts from the active node) */}
              <AnimatePresence>
                {activeSkill && activeSubNodes.map((subName, idx) => {
                  const offsetAngles = [-0.4, 0, 0.4];
                  const subAngle = activeNodeAngle + offsetAngles[idx];
                  const snx = anx + subNodeDistance * Math.cos(subAngle);
                  const sny = any + subNodeDistance * Math.sin(subAngle);

                  return (
                    <motion.div
                      key={`${activeSkill.name}-${subName}`}
                      initial={{ left: anx, top: any, scale: 0, opacity: 0 }}
                      animate={{ left: snx, top: sny, scale: 1, opacity: 1 }}
                      exit={{ left: anx, top: any, scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 120, damping: 14, delay: idx * 0.04 }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded-md bg-red-50 border border-red-200 text-[8px] sm:text-[9px] font-bold font-mono text-red-600 shadow-sm z-30"
                    >
                      {subName}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Details & Description Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <AnimatePresence mode="wait">
              {activeSkill && (
                <motion.div
                  key={activeSkill.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 sm:p-8 rounded-3xl border border-black/5 bg-gradient-to-br from-red-500/[0.01] via-rose-500/[0.01] to-white shadow-md shadow-red-500/[0.005] hover:border-red-500/10 transition-colors"
                >
                  <span className="text-[9px] font-bold text-red-500 font-mono tracking-widest uppercase block mb-1">
                    {activeSkill.category}
                  </span>
                  <h3 className="text-xl font-extrabold text-black mb-3.5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    {activeSkill.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal mb-5">
                    {activeSkill.desc}
                  </p>
                  
                  {/* Skill Cluster highlights */}
                  <div className="flex flex-col gap-2 pt-4 border-t border-black/5 text-[11px]">
                    <span className="font-mono text-gray-400 font-bold uppercase tracking-wider">Sub-clusters:</span>
                    <div className="flex gap-1.5 flex-wrap">
                      {activeSubNodes.map((sub) => (
                        <span key={sub} className="px-2 py-0.5 rounded-md bg-black/3 text-gray-600 border border-black/5 font-mono">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Currently Exploring */}
            <div className="p-6 rounded-3xl border border-black/[0.03] bg-black/[0.01] flex flex-col gap-4">
              <div>
                <h4 className="text-xs font-bold text-black uppercase tracking-wider font-mono flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-red-500" /> System Focus
                </h4>
                <p className="text-[10px] text-gray-400 font-normal mt-1">
                  Concept models and tech stacks currently under active study.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {currentlyExploring.map((item) => (
                  <span
                    key={item}
                    className="text-[9px] sm:text-[10px] font-mono font-bold text-red-600 bg-red-500/5 border border-red-500/10 px-2.5 py-1 rounded-lg"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

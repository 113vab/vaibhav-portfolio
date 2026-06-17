"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sparkles, Code, Terminal, ChevronRight } from "lucide-react";
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

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [dimensions, setDimensions] = useState({ width: 600, height: 450 });
  const [radius, setRadius] = useState(180);
  const [activeSkill, setActiveSkill] = useState<GalaxyNode | null>(galaxySkills[0]);
  const [isMobile, setIsMobile] = useState(false);

  // Keep track of container sizes for perfect coordinates mapping
  useEffect(() => {
    const handleResize = () => {
      const w = containerRef.current?.clientWidth || 600;
      setIsMobile(window.innerWidth < 768);
      
      let rad = 190;
      let h = 480;
      if (window.innerWidth < 480) {
        rad = 95;
        h = 280;
      } else if (window.innerWidth < 768) {
        rad = 125;
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
  const titleWords = "Skills Galaxy".split(" ");

  return (
    <section id="skills" className="py-28 md:py-36 px-6 md:px-12 relative overflow-hidden select-none">
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
              className="w-full relative rounded-3xl border border-black/[0.03] bg-gradient-to-b from-black/[0.01] to-transparent"
              style={{ height: `${dimensions.height}px` }}
            >
              {/* SVG Dynamic Network Connections */}
              <svg 
                className="absolute inset-0 pointer-events-none w-full h-full"
                viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
              >
                <defs>
                  <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#d1d5db" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                
                {/* Connection lines from center to outer nodes */}
                {galaxySkills.map((skill, idx) => {
                  const angle = (idx * 2 * Math.PI) / galaxySkills.length;
                  const nx = cx + radius * Math.cos(angle);
                  const ny = cy + radius * Math.sin(angle);
                  const isHighlighted = activeSkill?.name === skill.name;

                  return (
                    <g key={skill.name}>
                      {/* Base Line */}
                      <line 
                        x1={cx} 
                        y1={cy} 
                        x2={nx} 
                        y2={ny} 
                        stroke="url(#line-grad)" 
                        strokeWidth={isHighlighted ? "2" : "1.2"} 
                        opacity={isHighlighted ? "0.8" : "0.3"}
                        className="transition-all duration-300"
                      />
                      
                      {/* Floating Light Pulse effect along connections (desktop only) */}
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
                            duration: 10 + idx * 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          opacity={isHighlighted ? "0.9" : "0.4"}
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Center Node (VAIBHAV) */}
              <motion.div
                style={{
                  left: `${cx}px`,
                  top: `${cy}px`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-red-500 to-rose-600 text-white font-extrabold text-[10px] sm:text-xs uppercase tracking-widest flex flex-col items-center justify-center border-2 border-white/25 shadow-lg shadow-red-500/20 select-none">
                  <Sparkles className="w-3.5 h-3.5 mb-1.5 animate-pulse text-white/90" />
                  <span>Vaibhav</span>
                </div>
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full border border-red-500/20 animate-ping opacity-20 pointer-events-none scale-110" />
              </motion.div>

              {/* Connected Skills Nodes */}
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
                    whileHover={{ scale: 1.05, y: ny - 2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-2xl border text-[10px] sm:text-xs font-bold font-mono transition-all duration-300 z-20 flex flex-col items-center gap-0.5 cursor-pointer shadow-sm ${
                      isActive
                        ? "bg-gradient-to-r from-red-500/15 to-rose-500/15 border-red-500/30 text-red-600 shadow-md shadow-red-500/5 font-extrabold"
                        : "bg-white/70 border-black/5 text-gray-500 hover:text-black hover:border-black/10 hover:bg-white"
                    }`}
                  >
                    <span>{skill.name}</span>
                  </motion.button>
                );
              })}
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
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-normal">
                    {activeSkill.desc}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Currently Exploring */}
            <div className="p-6 rounded-3xl border border-black/[0.03] bg-black/[0.01] flex flex-col gap-4">
              <div>
                <h4 className="text-xs font-bold text-black uppercase tracking-wider font-mono flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-red-500" /> Currently Exploring
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

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BarChart3, PieChart, Route, Sparkles, Terminal } from "lucide-react";

export default function DashboardVisualizations() {
  const shouldReduceMotion = useReducedMotion();

  // 1. Skill Distribution Segment Data
  const skillDistribution = [
    { area: "Business Intelligence & BI Dashboarding", percent: 90, color: "bg-amber-500", rawVal: "90%" },
    { area: "Database Design & SQL Aggregations", percent: 92, color: "bg-red-500", rawVal: "92%" },
    { area: "Python & Pandas Data Science Pipelines", percent: 85, color: "bg-blue-500", rawVal: "85%" },
    { area: "Next.js & Frontend User Interfaces", percent: 85, color: "bg-sky-400", rawVal: "85%" },
    { area: "Express Backend & API Engineering", percent: 80, color: "bg-emerald-500", rawVal: "80%" },
  ];

  // 2. Tech Usage data (SVG Ring metrics)
  const techUsage = [
    { name: "SQL (Postgres/MySQL)", val: 32, offset: 0, stroke: "#ef4444" },
    { name: "Python (Pandas/Scripts)", val: 28, offset: 32, stroke: "#3b82f6" },
    { name: "TypeScript/JavaScript (React)", val: 25, offset: 60, stroke: "#38bdf8" },
    { name: "Power BI / Looker metrics", val: 15, offset: 85, stroke: "#f59e0b" },
  ];

  const titleWords = "System Performance Insights".split(" ");

  return (
    <section id="insights" className="py-28 md:py-36 px-6 md:px-12 relative overflow-hidden select-none border-t border-black/[0.03]">
      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Section Heading */}
        <div className="flex flex-col mb-16 md:mb-20">
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="w-6 h-[1px] bg-red-500 origin-left block" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 font-mono">04 / Performance Analytics</span>
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

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Card 1: Core Skill Competency Bar Charts (5 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 rounded-3xl border border-black/5 bg-white/40 p-6 md:p-8 shadow-sm glass-panel flex flex-col gap-6"
          >
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-1">
                <BarChart3 className="w-4 h-4 text-red-500" /> Focus Allocation
              </h3>
              <p className="text-[10px] text-gray-400 font-normal">Calculated concentration of project commits & analysis audits.</p>
            </div>

            <div className="flex flex-col gap-4">
              {skillDistribution.map((item, idx) => (
                <div key={item.area} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold text-black">
                    <span>{item.area}</span>
                    <span className="font-mono text-gray-500">{item.rawVal}</span>
                  </div>
                  {/* Outer rail */}
                  <div className="h-2.5 w-full bg-black/5 rounded-full overflow-hidden border border-black/5">
                    {/* Inner Progress */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.1 }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 2: Tech Usage Distribution SVG Segment Pie (4 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4 rounded-3xl border border-black/5 bg-white/40 p-6 md:p-8 shadow-sm glass-panel flex flex-col justify-between h-full min-h-[360px]"
          >
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-1">
                <PieChart className="w-4 h-4 text-red-500" /> Technology Partition
              </h3>
              <p className="text-[10px] text-gray-400 font-normal">Volume partition of custom functions across folders.</p>
            </div>

            {/* Circular representation */}
            <div className="flex items-center justify-center my-6 relative">
              <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 36 36">
                {techUsage.map((tech, idx) => {
                  const strokeDash = `${tech.val} ${100 - tech.val}`;
                  return (
                    <circle
                      key={tech.name}
                      cx="18"
                      cy="18"
                      r="15.91549430918954"
                      fill="transparent"
                      stroke={tech.stroke}
                      strokeWidth="2.8"
                      strokeDasharray={strokeDash}
                      strokeDashoffset={100 - tech.offset}
                      className="transition-all duration-1000"
                    />
                  );
                })}
              </svg>
              {/* Internal glowing label */}
              <div className="absolute text-center flex flex-col items-center">
                <span className="text-[9px] font-bold text-gray-400 uppercase font-mono tracking-widest">TOTAL</span>
                <span className="text-lg font-extrabold text-black">100%</span>
              </div>
            </div>

            {/* Legend block */}
            <div className="flex flex-col gap-2">
              {techUsage.map((tech) => (
                <div key={tech.name} className="flex items-center gap-2.5 text-[10px] font-bold text-gray-600 font-mono">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: tech.stroke }} />
                  <span className="truncate flex-1">{tech.name}</span>
                  <span>{tech.val}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 3: Learning Roadmap Pipeline (3 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 rounded-3xl border border-black/5 bg-white/40 p-6 md:p-8 shadow-sm glass-panel flex flex-col justify-between h-full min-h-[360px]"
          >
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-1">
                <Route className="w-4 h-4 text-red-500" /> Roadmap Pipeline
              </h3>
              <p className="text-[10px] text-gray-400 font-normal">Active trajectories of learning & updates.</p>
            </div>

            <div className="flex flex-col gap-4.5 my-6 relative pl-5 border-l border-black/5">
              {/* Vertical path line indicator */}
              <div className="absolute top-1.5 bottom-1.5 left-0 w-[1.5px] bg-red-500 pointer-events-none" />

              {[
                { title: "Theoretical Base", status: "COMPLETE", phase: "2023-2024", bulletColor: "bg-red-500" },
                { title: "SQL & Analytics Pipeline", status: "COMPLETE", phase: "2025", bulletColor: "bg-red-500" },
                { title: "Full-Stack Dev Ops", status: "ACTIVE", phase: "2025-2026", bulletColor: "bg-rose-500 animate-pulse" },
                { title: "Data Pipelines & AI Agents", status: "PLANNING", phase: "2026+", bulletColor: "bg-gray-300" }
              ].map((step, idx) => (
                <div key={step.title} className="relative flex flex-col gap-0.5">
                  {/* Dot marker */}
                  <span className={`absolute -left-[24.5px] top-1 w-2.5 h-2.5 rounded-full border border-white ${step.bulletColor}`} />
                  
                  <div className="flex justify-between items-center text-[10px] font-bold font-mono">
                    <span className="text-gray-400">{step.phase}</span>
                    <span className={step.status === "ACTIVE" ? "text-red-600" : step.status === "COMPLETE" ? "text-gray-400" : "text-gray-400"}>
                      {step.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-black">{step.title}</h4>
                </div>
              ))}
            </div>

            {/* Glowing footer badge */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-red-500/5 to-rose-500/5 border border-red-500/10 text-center flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span className="text-[9px] font-bold font-mono text-red-600 uppercase tracking-widest">
                SYSTEM HEALTHY • 60 FPS
              </span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

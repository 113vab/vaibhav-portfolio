"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, useReducedMotion, AnimatePresence } from "framer-motion";
import { Cpu, Terminal, Shield, FolderGit2, Briefcase, Trophy, BarChart3, Activity, ArrowUpRight, Zap, RefreshCw } from "lucide-react";

interface CounterProps {
  value: number;
  duration?: number;
  suffix?: string;
}

function AnimatedCounter({ value, duration = 1.5, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = value;
          if (start === end) {
            setCount(end);
            return;
          }
          const totalMiliseconds = duration * 1000;
          const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
          const step = Math.ceil(end / (totalMiliseconds / incrementTime));
          
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, incrementTime);
          
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [value, duration, hasAnimated]);

  return (
    <span ref={elementRef} className="font-mono tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

// Custom 3D Tilt Card wrapper
interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
}

function DashboardCard({ children, className = "" }: DashboardCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [0, 1], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-3, 3]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || shouldReduceMotion || !cardRef.current) return;
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
      whileHover={{ scale: isMobile ? 1 : 1.015 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`group rounded-3xl border border-black/5 bg-white/40 p-6 md:p-8 shadow-md hover:shadow-xl hover:border-red-500/25 transition-all duration-300 relative overflow-hidden backdrop-blur-md ${className}`}
    >
      {/* Gloss Sheen Glare */}
      {!shouldReduceMotion && (
        <motion.div
          initial={{ x: "-150%" }}
          whileHover={{ x: ["-150%", "150%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 2.2,
            ease: [0.16, 1, 0.3, 1],
            repeatDelay: 1.5
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-20 pointer-events-none z-20"
        />
      )}

      {/* Spotlight Shadow/Light Reflection */}
      {!isMobile && !shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
          style={{
            background: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(239, 68, 68, 0.05), transparent 85%)`,
          }}
        />
      )}

      {/* Depth Inner Container */}
      <div 
        style={{ transform: isMobile ? "none" : "translateZ(12px)", transformStyle: isMobile ? "flat" : "preserve-3d" }}
        className="w-full h-full relative z-10 flex flex-col"
      >
        {children}
      </div>
    </motion.div>
  );
}

export default function DashboardVisualizations() {
  const titleWords = "Engineering Telemetry Dashboard".split(" ");
  const [logs, setLogs] = useState<string[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Simulate telemetry log output
  useEffect(() => {
    const messages = [
      "sys: established postgres pool connection.",
      "git: push origin main -m 'perf: query optimized'",
      "api: campus-connect payload delivered [200 OK]",
      "bi: refresh dataset retention_matrix.dax",
      "aws: ec2 route health status check [green]",
      "sys: initialized search map indexers.",
      "git: pull request merge branch: data-pipelines",
      "sih: map routing api resolved coordinates.",
      "api: search request matching python scripts.",
      "sys: 60 FPS viewport stability guaranteed."
    ];

    setLogs([messages[0], messages[1], messages[2]]);

    const interval = setInterval(() => {
      setLogs((prev) => {
        const nextMsg = messages[Math.floor(Math.random() * messages.length)];
        const updated = [...prev.slice(-4), nextMsg];
        return updated;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll log feed
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <section id="insights" className="py-28 md:py-36 px-6 md:px-12 relative overflow-hidden select-none border-t border-black/[0.03] bg-gradient-to-b from-white via-red-50/[0.01] to-white">
      {/* Abstract structural grid line */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-50" />
      
      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Section Heading */}
        <div className="flex flex-col mb-16 md:mb-20">
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="w-6 h-[1px] bg-red-500 origin-left block" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 font-mono">04 / Operational Telemetry</span>
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

        {/* 5-Panel Interactive KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: Projects Built (Span 5) */}
          <DashboardCard className="lg:col-span-5 flex flex-col justify-between min-h-[300px]">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[8px] font-bold text-gray-400 font-mono tracking-widest uppercase block mb-1">MODULE // PLATFORMS</span>
                <h3 className="text-sm font-bold text-black flex items-center gap-1.5 font-mono uppercase">
                  <FolderGit2 className="w-4 h-4 text-red-500 animate-pulse" /> Projects Deployed
                </h3>
              </div>
              <span className="text-[8px] font-mono text-emerald-500 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10 uppercase">Production</span>
            </div>

            <div className="my-6 flex items-baseline gap-2">
              <span className="text-5xl md:text-6xl font-black text-black leading-none font-mono">
                <AnimatedCounter value={4} suffix="+" />
              </span>
              <span className="text-xs font-mono text-gray-400">active instances</span>
            </div>

            <div className="border-t border-black/5 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono text-gray-400 uppercase">REST API Endpoints</span>
                  <span className="text-sm font-bold text-black font-mono">18 Verified</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono text-gray-400 uppercase">Schema Normalization</span>
                  <span className="text-sm font-bold text-black font-mono">3NF Postgres</span>
                </div>
              </div>
              {/* Mini architectural wireframe representation */}
              <div className="mt-4 h-8 w-full flex items-center gap-1 opacity-25">
                <span className="h-full w-1/4 rounded bg-red-500" />
                <span className="h-full w-2 bg-black/10" />
                <span className="h-full w-1/3 rounded bg-black/10" />
                <span className="h-full w-1 bg-black/10" />
                <span className="h-full w-1/5 rounded bg-red-500" />
              </div>
            </div>
          </DashboardCard>

          {/* Card 2: Internships Built (Span 7) */}
          <DashboardCard className="lg:col-span-7 flex flex-col justify-between min-h-[300px]">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[8px] font-bold text-gray-400 font-mono tracking-widest uppercase block mb-1">MODULE // CAREER STATIONS</span>
                <h3 className="text-sm font-bold text-black flex items-center gap-1.5 font-mono uppercase">
                  <Briefcase className="w-4 h-4 text-red-500" /> Corporate Internships
                </h3>
              </div>
              <span className="text-[8px] font-mono text-red-500 bg-red-500/5 px-2 py-0.5 rounded border border-red-500/10 uppercase">Data & Analytics</span>
            </div>

            <div className="my-6 flex items-baseline gap-2">
              <span className="text-5xl md:text-6xl font-black text-black leading-none font-mono">
                <AnimatedCounter value={2} />
              </span>
              <span className="text-xs font-mono text-gray-400">full analyst roles</span>
            </div>

            <div className="border-t border-black/5 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-2xl bg-black/[0.01] border border-black/5">
                  <h4 className="text-xs font-bold text-black flex items-center justify-between">
                    <span>Excelerate</span>
                    <span className="text-[8px] font-mono text-gray-400">Postgres SQL</span>
                  </h4>
                  <p className="text-[10px] text-gray-500 mt-1">Looker dashboards & SLU metric aggregates.</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-black/[0.01] border border-black/5">
                  <h4 className="text-xs font-bold text-black flex items-center justify-between">
                    <span>Elevate Labs</span>
                    <span className="text-[8px] font-mono text-gray-400">Power BI / DAX</span>
                  </h4>
                  <p className="text-[10px] text-gray-500 mt-1">User retention pipelines & revenue dashboards.</p>
                </div>
              </div>
            </div>
          </DashboardCard>

          {/* Card 3: Technologies (Span 4) */}
          <DashboardCard className="lg:col-span-4 flex flex-col justify-between min-h-[340px]">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-[8px] font-bold text-gray-400 font-mono tracking-widest uppercase block mb-1">MODULE // CORE SYSTEM</span>
                  <h3 className="text-sm font-bold text-black flex items-center gap-1.5 font-mono uppercase">
                    <Cpu className="w-4 h-4 text-red-500" /> System Nodes
                  </h3>
                </div>
                <span className="text-[8px] font-mono text-gray-400 font-bold uppercase">12 Total</span>
              </div>

              {/* Competency gauge nodes */}
              <div className="flex flex-col gap-3 mt-4">
                {[
                  { name: "SQL (Database Design)", percent: 92 },
                  { name: "Python (Data Science)", percent: 85 },
                  { name: "React (UI Frontend)", percent: 85 },
                  { name: "Node.js (API Backend)", percent: 80 }
                ].map((item, idx) => (
                  <div key={item.name} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-[10px] font-bold font-mono text-gray-600">
                      <span>{item.name}</span>
                      <span className="text-black font-extrabold">{item.percent}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden border border-black/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.1 }}
                        className="h-full rounded-full bg-red-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-black/5 pt-4 mt-4 text-[9px] font-mono text-gray-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-red-500" /> Compiled & normal compiler indexes verified.
            </div>
          </DashboardCard>

          {/* Card 4: Certifications (Span 4) */}
          <DashboardCard className="lg:col-span-4 flex flex-col justify-between min-h-[340px]">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[8px] font-bold text-gray-400 font-mono tracking-widest uppercase block mb-1">MODULE // VERIFICATION</span>
                <h3 className="text-sm font-bold text-black flex items-center gap-1.5 font-mono uppercase">
                  <Trophy className="w-4 h-4 text-red-500" /> Credentials
                </h3>
              </div>
              <span className="text-[8px] font-mono text-gray-400 font-bold uppercase">Badges</span>
            </div>

            <div className="my-4 flex items-baseline gap-2">
              <span className="text-5xl md:text-6xl font-black text-black leading-none font-mono">
                <AnimatedCounter value={5} suffix="+" />
              </span>
              <span className="text-xs font-mono text-gray-400">verified badges</span>
            </div>

            <div className="border-t border-black/5 pt-4 space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-mono border-b border-black/5 pb-2">
                <span className="text-gray-500 font-semibold uppercase">AWS Cloud Foundation</span>
                <span className="text-red-500 font-bold">AWS Academy</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono border-b border-black/5 pb-2">
                <span className="text-gray-500 font-semibold uppercase">BCG Generative AI</span>
                <span className="text-red-500 font-bold">BCG</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono pb-1">
                <span className="text-gray-500 font-semibold uppercase">Advanced SQL / DB</span>
                <span className="text-red-500 font-bold">Looker/Postgres</span>
              </div>
            </div>
          </DashboardCard>

          {/* Card 5: GitHub Activity (Span 4) */}
          <DashboardCard className="lg:col-span-4 flex flex-col justify-between min-h-[340px]">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[8px] font-bold text-gray-400 font-mono tracking-widest uppercase block mb-1">MODULE // METRICS COCKPIT</span>
                <h3 className="text-sm font-bold text-black flex items-center gap-1.5 font-mono uppercase">
                  <Activity className="w-4 h-4 text-red-500 animate-pulse" /> GitHub Commits
                </h3>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
            </div>

            <div className="my-2 flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-black text-black leading-none font-mono">
                <AnimatedCounter value={450} suffix="+" />
              </span>
              <span className="text-xs font-mono text-gray-400">contributions</span>
            </div>

            {/* Live streaming console log telemetry stream */}
            <div className="border-t border-black/5 pt-4">
              <span className="text-[8px] font-bold text-gray-400 font-mono tracking-widest uppercase block mb-2">LIVE ENVIRONMENT TELEMETRY</span>
              <div 
                ref={logContainerRef}
                className="h-24 rounded-xl border border-black/5 bg-black/[0.03] p-2.5 font-mono text-[9px] text-red-600 overflow-y-hidden flex flex-col gap-1"
              >
                <div className="text-gray-400 font-semibold">sys://vaibhav-os/logging: initialized.</div>
                <AnimatePresence>
                  {logs.map((log, idx) => (
                    <motion.div
                      key={log + idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 0.9, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="truncate"
                    >
                      <span className="text-gray-500 font-bold mr-1">&gt;</span> {log}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </DashboardCard>

        </div>

      </div>
    </section>
  );
}

"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { Briefcase, CheckCircle2, Trophy, Sparkles } from "lucide-react";
import { experiences, achievements } from "../data/experience";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  whileHover?: any;
  variants?: any;
}

// Reusable Spotlight Card with reactive mouse illumination
function SpotlightCard({ children, className = "", whileHover = {}, variants }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0
      );
    };
    checkTouch();
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      variants={variants}
      whileHover={whileHover}
      className={`relative overflow-hidden group ${className}`}
    >
      {/* Subtle cursor spotlight overlay */}
      {!isTouchDevice && !shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
          style={{
            background: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(255, 59, 48, 0.05), transparent 80%)`,
          }}
        />
      )}
      <div className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-none">
        <div className="pointer-events-auto h-full flex flex-col justify-between">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll choreography for section transitions
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const sectionTranslateY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [shouldReduceMotion ? 0 : 40, 0, 0, shouldReduceMotion ? 0 : -40]
  );

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
    hidden: { y: shouldReduceMotion ? 0 : 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const hoverEffect = shouldReduceMotion ? {} : {
    y: -4,
    scale: 1.01,
    boxShadow: "0 20px 40px -15px rgba(255, 59, 48, 0.08), 0 4px 12px rgba(0, 0, 0, 0.02)",
    backgroundColor: "rgba(255, 255, 255, 0.82)",
    borderColor: "rgba(255, 59, 48, 0.12)"
  };

  const titleWords = "Experience & Achievements".split(" ");

  return (
    <section 
      id="certifications" 
      ref={sectionRef}
      className="py-28 md:py-36 px-6 md:px-12 relative"
    >
      <motion.div
        style={{
          opacity: sectionOpacity,
          y: sectionTranslateY
        }}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto z-10 relative"
      >
        
        {/* Section Heading with word reveal */}
        <motion.div variants={cardVariants} className="flex flex-col mb-16 md:mb-20">
          <div className="flex items-center gap-2.5 mb-2.5">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
              className="w-6 h-[1px] bg-red-500 origin-left block"
            />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 font-mono">04 / Path</span>
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
        </motion.div>

        {/* Dual Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Experience Timeline */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <motion.div variants={cardVariants} className="flex items-center gap-2 mb-2">
              <Briefcase className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-bold text-black uppercase tracking-wider font-mono">Professional Internships</h3>
            </motion.div>
            
            <div className="space-y-6">
              {experiences.map((exp) => (
                <SpotlightCard
                  key={exp.id}
                  variants={cardVariants}
                  whileHover={hoverEffect}
                  className="rounded-3xl glass-panel p-6 md:p-8 transition-all duration-300 border border-black/5"
                >
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Left Column: Role & Date */}
                    <div className="md:w-1/3 shrink-0 flex flex-col justify-between h-full">
                      <div>
                        <span className="text-xs font-mono font-bold text-red-600 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 inline-block mb-3">
                          {exp.date}
                        </span>
                        <h4 className="text-lg font-extrabold text-black leading-snug">
                          {exp.role}
                        </h4>
                        <p className="text-sm font-semibold text-gray-500 mt-1">
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    {/* Right Column: Highlights */}
                    <div className="flex-1 border-t md:border-t-0 md:border-l border-black/5 pt-4 md:pt-0 md:pl-6">
                      <ul className="space-y-2">
                        {exp.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed font-normal">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>

          {/* Right Side: Achievements & Milestones */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <motion.div variants={cardVariants} className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-rose-500" />
              <h3 className="text-lg font-bold text-black uppercase tracking-wider font-mono">Achievements</h3>
            </motion.div>

            <div className="space-y-6">
              {achievements.map((ach) => (
                <SpotlightCard
                  key={ach.id}
                  variants={cardVariants}
                  whileHover={hoverEffect}
                  className="rounded-3xl glass-panel p-6 md:p-8 transition-all duration-300 border border-black/5 overflow-hidden"
                >
                  {/* Decorative glowing gradient */}
                  <div className="absolute -right-10 -top-10 w-24 h-24 rounded-full bg-red-500/5 filter blur-xl group-hover:scale-150 transition-all duration-500 pointer-events-none" />
                  
                  <div className="flex justify-between items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5 text-rose-600" />
                    </div>
                    <span className="text-xs font-mono font-bold text-gray-500 mt-2">
                      {ach.date}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-extrabold text-black mb-1 group-hover:text-red-500 transition-colors duration-300">
                      {ach.title}
                    </h4>
                    <p className="text-xs font-semibold text-gray-500 mb-3">
                      {ach.issuer}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed font-normal">
                      {ach.desc}
                    </p>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>

        </div>

      </motion.div>
    </section>
  );
}

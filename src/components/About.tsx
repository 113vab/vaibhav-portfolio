"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { User, Cpu, Globe, Rocket, Compass, Heart, GraduationCap, BookOpen } from "lucide-react";
import { profile } from "../data/profile";

// Helper function to dynamically map strings in JSON data to Lucide React components
const getFocusIcon = (iconName: string) => {
  switch (iconName) {
    case "Cpu":
      return <Cpu className="w-5 h-5 text-red-500" />;
    case "Globe":
      return <Globe className="w-5 h-5 text-rose-500" />;
    case "Rocket":
      return <Rocket className="w-5 h-5 text-rose-600" />;
    case "Compass":
      return <Compass className="w-5 h-5 text-rose-500" />;
    case "Heart":
      return <Heart className="w-5 h-5 text-red-500" />;
    default:
      return <Cpu className="w-5 h-5 text-red-500" />;
  }
};

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
        {/* Enable interactions inside cards (links, buttons, copy text) */}
        <div className="pointer-events-auto h-full flex flex-col justify-between">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll choreography for section overlap and gentle exits
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
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { y: shouldReduceMotion ? 0 : 25, opacity: 0 },
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

  const titleWords = "About Me".split(" ");

  return (
    <section 
      id="about" 
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
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 font-mono">01 / Profile</span>
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

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Narrative Narrative (Wrapped in SpotlightCard) */}
          <SpotlightCard
            variants={cardVariants}
            whileHover={hoverEffect}
            className="lg:col-span-7 rounded-3xl glass-panel p-8 md:p-10 transition-all duration-350 border border-black/5"
          >
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
                  <User className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4">
                  {profile.role}
                </h3>
                
                {/* Bio Paragraphs */}
                {profile.bioParagraphs.map((para, idx) => (
                  <p key={idx} className="text-gray-600 leading-relaxed mb-6 font-normal last:mb-8">
                    {para}
                  </p>
                ))}

                {/* Education block */}
                <div className="border-t border-black/10 pt-6 mt-6">
                  <h4 className="flex items-center gap-2 text-sm font-extrabold text-black uppercase tracking-wider font-mono mb-4">
                    <GraduationCap className="w-4 h-4 text-red-500" /> Education
                  </h4>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <h5 className="font-bold text-black text-base">{profile.education.institution}</h5>
                      <p className="text-sm text-gray-600">{profile.education.degree}</p>
                      <p className="text-xs text-gray-500 mt-1 font-medium">{profile.education.location}</p>
                    </div>
                    <span className="shrink-0 text-xs font-mono font-bold text-red-600 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 self-start">
                      Graduation: {profile.education.graduationYear}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Hobbies/Interests Footer */}
              <div className="mt-8 pt-8 border-t border-black/10 flex flex-wrap gap-4 items-center text-xs text-gray-500 font-mono">
                <span className="flex items-center gap-1.5"><Compass className="w-3.5 h-3.5" /> Data Analytics</span>
                <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5" /> Full-Stack Dev</span>
                <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> Problem Solving</span>
              </div>
            </div>
          </SpotlightCard>

          {/* Right Column - Focus areas & Coursework badges */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Focus areas */}
            {profile.focusAreas.map((value, idx) => (
              <SpotlightCard
                key={idx}
                variants={cardVariants}
                whileHover={hoverEffect}
                className="rounded-3xl glass-panel p-6 transition-all duration-350 border border-black/5"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-black/5 border border-black/5 flex items-center justify-center shrink-0">
                    {getFocusIcon(value.iconName)}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-black mb-1">{value.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed font-normal">{value.desc}</p>
                  </div>
                </div>
              </SpotlightCard>
            ))}

            {/* Academic Coursework Badge Container */}
            <SpotlightCard
              variants={cardVariants}
              whileHover={hoverEffect}
              className="rounded-3xl glass-panel p-6 transition-all duration-350 border border-black/5"
            >
              <h4 className="flex items-center gap-2 text-sm font-extrabold text-black uppercase tracking-wider font-mono mb-4">
                <BookOpen className="w-4 h-4 text-red-500" /> Academic Coursework
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.coursework.map((course) => (
                  <span
                    key={course}
                    className="text-[11px] sm:text-xs text-gray-700 bg-black/[0.03] border border-black/5 font-semibold px-3 py-1.5 rounded-xl transition-all duration-300 hover:bg-red-500/5 hover:border-red-500/20 hover:text-red-600"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </div>
        </div>

      </motion.div>
    </section>
  );
}

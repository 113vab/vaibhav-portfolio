"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { Settings, Code, BarChart2, Globe, Terminal } from "lucide-react";
import { skillCategories, currentlyExploring } from "../data/skills";

// Helper function to dynamically map icon name strings to Lucide icon components
const getSkillIcon = (iconName: string, isActive: boolean) => {
  const baseClasses = `w-5 h-5 transition-all duration-300`;
  const iconProps = {
    className: isActive
      ? `${baseClasses} text-red-600`
      : `${baseClasses} text-gray-500 group-hover:text-black`,
  };

  switch (iconName) {
    case "Code":
      return <Code {...iconProps} />;
    case "BarChart2":
      return <BarChart2 {...iconProps} />;
    case "Globe":
      return <Globe {...iconProps} />;
    case "Terminal":
      return <Terminal {...iconProps} />;
    case "Settings":
      return <Settings {...iconProps} />;
    default:
      return <Code {...iconProps} />;
  }
};

interface SkillCategoryButtonProps {
  category: any;
  isActive: boolean;
  onClick: () => void;
  cardVariants: any;
  shouldReduceMotion: boolean;
}

function SkillCategoryButton({ category, isActive, onClick, cardVariants, shouldReduceMotion }: SkillCategoryButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
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

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTouchDevice || shouldReduceMotion || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const hoverEffect = shouldReduceMotion ? {} : {
    y: -2,
    scale: 1.01,
    borderColor: "rgba(255, 59, 48, 0.12)",
    boxShadow: "0 10px 20px -10px rgba(255, 59, 48, 0.1), 0 2px 6px rgba(0, 0, 0, 0.02)"
  };

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      variants={cardVariants}
      whileHover={hoverEffect}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
      className={`w-full text-left px-5 py-4 rounded-2xl border transition-all duration-305 flex items-center justify-between group relative overflow-hidden ${
        isActive
          ? "bg-gradient-to-r from-red-500/10 to-rose-500/10 border-red-500/20 text-red-600 shadow-md shadow-red-500/5"
          : "bg-black/2 border-black/5 text-gray-500 hover:text-black hover:border-black/10"
      }`}
    >
      {/* Category button illumination spotlight */}
      {!isTouchDevice && !shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
          style={{
            background: useMotionTemplate`radial-gradient(120px circle at ${mouseX}px ${mouseY}px, rgba(255, 59, 48, 0.05), transparent 80%)`,
          }}
        />
      )}

      <div className="flex items-center gap-3.5 relative z-10 pointer-events-none">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${
            isActive
              ? "bg-red-500/15 border-red-500/35 text-red-600"
              : "bg-black/5 border-black/10 text-gray-500 group-hover:text-black group-hover:bg-black/8"
          }`}
        >
          {getSkillIcon(category.iconName, isActive)}
        </div>
        <span className="font-bold text-sm sm:text-base">{category.title}</span>
      </div>
      <Code className={`w-4 h-4 transition-all duration-305 relative z-10 pointer-events-none ${
        isActive ? "opacity-100 text-red-500 translate-x-0" : "opacity-0 -translate-x-2"
      }`} />
    </motion.button>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Set default active tab to the first category defined in database
  const [activeCategory, setActiveCategory] = useState(
    skillCategories[0]?.id || "programming"
  );

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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  const categoryContainerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const skillItemVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 18
      },
    },
  };

  const currentCategoryData = skillCategories.find((cat) => cat.id === activeCategory);
  const titleWords = "Skills & Technologies".split(" ");

  return (
    <section 
      id="skills" 
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
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 font-mono">02 / Expertise</span>
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

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Category Selectors */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {skillCategories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <SkillCategoryButton
                  key={category.id}
                  category={category}
                  isActive={isActive}
                  onClick={() => setActiveCategory(category.id)}
                  cardVariants={cardVariants}
                  shouldReduceMotion={!!shouldReduceMotion}
                />
              );
            })}
          </div>

          {/* Right Side: Skill Progress Grid */}
          <div className="lg:col-span-8">
            <motion.div
              key={activeCategory}
              variants={categoryContainerVariants}
              initial="hidden"
              animate="visible"
              className="rounded-3xl glass-panel p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
            >
              {currentCategoryData?.skills.map((skill) => (
                <motion.div key={skill.name} variants={skillItemVariants} className="flex flex-col">
                  {/* Skill text info */}
                  <div className="flex justify-between items-center mb-2 text-sm">
                    <span className="font-semibold text-black">{skill.name}</span>
                    <span className="text-gray-600 font-mono font-medium">{skill.level}%</span>
                  </div>
                  
                  {/* Progress bar background */}
                  <div className="h-2 w-full bg-black/5 border border-black/5 rounded-full overflow-hidden">
                    {/* Animated Progress bar fill */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                      className="h-full bg-gradient-to-r from-red-500 to-rose-500 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>

        {/* Currently Exploring Sub-Section */}
        <motion.div
          variants={cardVariants}
          className="mt-12 p-6 rounded-3xl glass-panel border border-black/5 bg-gradient-to-r from-red-500/[0.01] to-rose-500/[0.01] flex flex-col sm:flex-row sm:items-center justify-between gap-6"
        >
          <div>
            <h4 className="text-sm font-extrabold text-black uppercase tracking-wider font-mono mb-1">Currently Exploring</h4>
            <p className="text-xs text-gray-500 font-normal">Active areas of ongoing learning, technology patterns, and conceptual updates.</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:max-w-xl justify-start sm:justify-end">
            {currentlyExploring.map((item) => (
              <span
                key={item}
                className="text-[10px] sm:text-xs font-mono font-bold text-red-600 bg-red-500/5 border border-red-500/10 px-3 py-1.5 rounded-xl transition-all duration-300 hover:bg-red-500/10"
              >
                ⚡ {item}
              </span>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}

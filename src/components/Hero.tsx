"use client";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowDown, Sparkles, FolderGit2, FileDown, Mail } from "lucide-react";
import { profile } from "../data/profile";
import { siteConfig } from "../data/siteConfig";
import Magnetic from "./motion/Magnetic";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  // Layered depth translations
  const badgeY = useTransform(scrollY, [0, 500], [0, 20]);
  const headlineY = useTransform(scrollY, [0, 500], [0, 45]);
  const descY = useTransform(scrollY, [0, 500], [0, 35]);
  const ctaY = useTransform(scrollY, [0, 500], [0, 25]);
  const skillsY = useTransform(scrollY, [0, 500], [0, 15]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Mobile bypass for performance
  const finalBadgeY = isMobile || shouldReduceMotion ? 0 : badgeY;
  const finalHeadlineY = isMobile || shouldReduceMotion ? 0 : headlineY;
  const finalDescY = isMobile || shouldReduceMotion ? 0 : descY;
  const finalCtaY = isMobile || shouldReduceMotion ? 0 : ctaY;
  const finalSkillsY = isMobile || shouldReduceMotion ? 0 : skillsY;
  const finalOpacity = isMobile ? 1 : opacity;

  // Entrance animations sequence
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: shouldReduceMotion ? 0 : 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 90,
        damping: 18,
        mass: 0.8,
      },
    },
  };

  const lineVariants = {
    hidden: { y: shouldReduceMotion ? 0 : "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 85,
        damping: 16,
        mass: 0.7,
      },
    },
  };

  const ctaContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const ctaItemVariants = {
    hidden: { y: shouldReduceMotion ? 0 : 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 16,
      },
    },
  };

  const skillsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.06,
      },
    },
  };

  const skillBadgeVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const headlineWords = profile.headline.split(" ");
  const subHeadlineWords = profile.subHeadline.split(" ");

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 md:px-12 overflow-hidden bg-gradient-to-b from-red-50/40 via-rose-50/20 to-white"
    >
      {/* Layer 1: Background Atmosphere is BackgroundGlow and section gradients */}

      {/* Layer 2: Floating Glass Cards (Hidden on mobile to ensure performance) */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Analytics Chart Mockup Card */}
          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [-1, 1, -1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-[20%] left-[8%] w-44 p-4 rounded-2xl glass-panel border border-white/20 shadow-xl backdrop-blur-lg flex flex-col gap-2 bg-white/40"
            style={{
              boxShadow: "0 20px 40px -15px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
          >
            <div className="flex justify-between items-center">
              <div className="w-10 h-2 bg-black/10 rounded" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <div className="flex gap-1.5 items-end h-10 mt-1">
              <div className="w-full h-[60%] bg-red-500/20 rounded-sm" />
              <div className="w-full h-[80%] bg-red-500/30 rounded-sm" />
              <div className="w-full h-[40%] bg-red-500/20 rounded-sm" />
              <div className="w-full h-[95%] bg-gradient-to-t from-red-500 to-rose-500 rounded-sm" />
            </div>
          </motion.div>

          {/* Database Query Mockup Card */}
          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [1, -1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-[25%] right-[8%] w-48 p-4 rounded-2xl glass-panel border border-white/20 shadow-xl backdrop-blur-lg flex flex-col gap-1.5 font-mono text-[9px] text-gray-400 bg-white/40"
            style={{
              boxShadow: "0 20px 40px -15px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
          >
            <div className="flex gap-1 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            </div>
            <div><span className="text-red-500">const</span>{" query = () => {"}</div>
            <div className="pl-3">return db.select()</div>
            <div className="pl-6 text-rose-500">.from(<span className="text-gray-500">"users"</span>)</div>
            <div>{"}"}</div>
          </motion.div>
        </div>
      )}

      {/* Main Centered Content Grid */}
      <motion.div
        style={{ opacity: finalOpacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto w-full flex flex-col items-center justify-center text-center z-10 relative"
      >
        {/* Layer 3: Status Badge */}
        <motion.div
          variants={itemVariants}
          style={{ y: finalBadgeY }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs font-bold uppercase tracking-widest text-red-600 border border-red-500/15 mb-8 shadow-sm bg-white/50 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-red-500 animate-pulse" />
          <span>{profile.name}</span>
        </motion.div>

        {/* Layer 4: Headline */}
        <motion.h1 
          style={{ y: finalHeadlineY }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tighter leading-[1.1] mb-6 text-black select-none flex flex-col items-center"
        >
          <span className="block overflow-hidden py-1 flex flex-wrap justify-center gap-x-3 sm:gap-x-4">
            {headlineWords.map((word, idx) => (
              <span key={idx} className="inline-block overflow-hidden">
                <motion.span
                  variants={lineVariants}
                  className="inline-block"
                  transition={{
                    type: "spring" as const,
                    stiffness: 85,
                    damping: 16,
                    mass: 0.7,
                    delay: 0.1 + idx * 0.04
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
          <span className="block overflow-hidden py-1 flex flex-wrap justify-center gap-x-3 sm:gap-x-4">
            {subHeadlineWords.map((word, idx) => (
              <span key={idx} className="inline-block overflow-hidden">
                <motion.span
                  variants={lineVariants}
                  className="inline-block bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 bg-clip-text text-transparent"
                  transition={{
                    type: "spring" as const,
                    stiffness: 85,
                    damping: 16,
                    mass: 0.7,
                    delay: 0.4 + idx * 0.04
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
        </motion.h1>

        {/* Description Description */}
        <motion.p
          variants={itemVariants}
          style={{ y: finalDescY }}
          className="text-base sm:text-lg md:text-xl text-gray-500 max-w-2xl mb-12 leading-relaxed font-normal px-4"
        >
          {profile.role} specializing in Data Analytics, Business Intelligence, and Full-Stack Development.
        </motion.p>

        {/* Layer 5: CTA Buttons Row */}
        <motion.div
          variants={ctaContainerVariants}
          style={{ y: finalCtaY }}
          className="flex flex-wrap justify-center items-center gap-4 px-4 w-full"
        >
          {/* View Work Button */}
          <motion.div variants={ctaItemVariants}>
            <Magnetic>
              <motion.a
                href="#projects"
                onClick={(e) => handleScrollTo(e, "projects")}
                whileHover="hover"
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className="relative overflow-hidden flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white shadow-md shadow-red-500/10 hover:shadow-red-500/25 transition-all duration-300 group"
              >
                {!shouldReduceMotion && (
                  <motion.span
                    initial={{ x: "-150%" }}
                    variants={{
                      hover: { x: ["-150%", "150%"] }
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 2.5,
                      ease: [0.16, 1, 0.3, 1],
                      repeatDelay: 0.8
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-20 pointer-events-none"
                  />
                )}
                <FolderGit2 className="w-4 h-4 z-10 group-hover:translate-x-0.5 transition-transform duration-300" />
                <span className="relative z-10">View Projects</span>
              </motion.a>
            </Magnetic>
          </motion.div>

          {/* Download Resume Button */}
          <motion.div variants={ctaItemVariants}>
            <Magnetic>
              <motion.a
                href={siteConfig.resumePath}
                download={`${profile.name.replace(/\s+/g, "_")}_Resume.pdf`}
                whileHover="hover"
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className="relative overflow-hidden flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm bg-white/70 border border-black/10 hover:border-black/20 text-gray-800 hover:text-black hover:bg-white shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-md group"
              >
                {!shouldReduceMotion && (
                  <motion.span
                    initial={{ x: "-150%" }}
                    variants={{
                      hover: { x: ["-150%", "150%"] }
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 2.5,
                      ease: [0.16, 1, 0.3, 1],
                      repeatDelay: 0.8
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent skew-x-20 pointer-events-none"
                  />
                )}
                <FileDown className="w-4 h-4 text-red-500 z-10 group-hover:translate-y-0.5 transition-transform duration-300" />
                <span className="relative z-10">Download Resume</span>
              </motion.a>
            </Magnetic>
          </motion.div>

          {/* Contact Button */}
          <motion.div variants={ctaItemVariants}>
            <Magnetic>
              <motion.a
                href="#contact"
                onClick={(e) => handleScrollTo(e, "contact")}
                whileHover="hover"
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className="relative overflow-hidden flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm bg-black/[0.03] border border-black/5 hover:border-black/15 text-gray-700 hover:text-black hover:bg-black/[0.06] transition-all duration-300 backdrop-blur-sm group"
              >
                {!shouldReduceMotion && (
                  <motion.span
                    initial={{ x: "-150%" }}
                    variants={{
                      hover: { x: ["-150%", "150%"] }
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 2.5,
                      ease: [0.16, 1, 0.3, 1],
                      repeatDelay: 0.8
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent skew-x-20 pointer-events-none"
                  />
                )}
                <Mail className="w-4 h-4 z-10 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                <span className="relative z-10">Contact Me</span>
              </motion.a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Floating Skill Badges */}
        <motion.div
          variants={skillsContainerVariants}
          style={{ y: finalSkillsY }}
          className="flex flex-wrap justify-center items-center gap-3 mt-16 max-w-xl px-4"
        >
          {["Python", "SQL", "React", "Power BI"].map((skill, index) => (
            <motion.div
              key={skill}
              variants={skillBadgeVariants}
              className="text-[11px] sm:text-xs font-semibold text-gray-500 font-mono px-3.5 py-1.5 rounded-full border border-black/5 bg-white/40 shadow-sm backdrop-blur-md"
            >
              <motion.div
                animate={shouldReduceMotion || isMobile ? {} : {
                  y: [0, index % 2 === 0 ? -6 : -4, 0],
                  x: [0, index % 2 === 0 ? 4 : -4, 0],
                  transition: {
                    duration: index % 2 === 0 ? 6 : 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2
                  }
                }}
              >
                {skill}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <a
          href="#about"
          onClick={(e) => handleScrollTo(e, "about")}
          className="p-3 rounded-full border border-black/10 bg-white/60 text-gray-500 hover:text-black hover:bg-white transition-all duration-300 cursor-pointer animate-bounce shadow-sm backdrop-blur-md"
          aria-label="Scroll Down"
        >
          <ArrowDown className="w-4.5 h-4.5" />
        </a>
      </div>
    </section>
  );
}

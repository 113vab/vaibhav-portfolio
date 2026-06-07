"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { GitBranch, Star, ExternalLink, Code } from "lucide-react";
import { GithubIcon as Github } from "./icons/BrandIcons";
import { repositories } from "../data/github";
import { trackEvent } from "../utils/analytics";
import Magnetic from "./motion/Magnetic";

interface RepoCardProps {
  repo: typeof repositories[0];
  cardVariants: any;
  shouldReduceMotion: boolean;
}

function RepoCard({ repo, cardVariants, shouldReduceMotion }: RepoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
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

  const handleCardClick = () => {
    trackEvent("GitHub Repository Clicked", { repository: repo.name, url: repo.url });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      variants={cardVariants}
      whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.01 }}
      onClick={handleCardClick}
      className="rounded-3xl glass-panel p-6 border border-black/5 bg-white/70 hover:bg-white hover:border-red-500/20 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full relative group"
    >
      {/* Spotlight effect */}
      {!isTouchDevice && !shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
          style={{
            background: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(255, 59, 48, 0.04), transparent 80%)`,
          }}
        />
      )}

      <div className="relative z-10">
        {/* Header: Folder name and GitHub icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-red-500">
            <Code className="w-5 h-5" />
            <span className="font-mono font-bold text-xs tracking-wide text-gray-400">repo</span>
          </div>
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Title */}
        <h4 className="text-base font-extrabold text-black mb-2 group-hover:text-red-500 transition-colors">
          <a href={repo.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {repo.name}
          </a>
        </h4>

        {/* Description */}
        <p className="text-xs text-gray-500 leading-relaxed font-normal mb-5">
          {repo.description}
        </p>
      </div>

      {/* Footer statistics and tags */}
      <div className="relative z-10 border-t border-black/5 pt-4 mt-auto">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {repo.tags.map(tag => (
            <span key={tag} className="text-[9px] font-mono bg-black/5 px-1.5 py-0.5 rounded text-gray-600">
              {tag}
            </span>
          ))}
        </div>

        {/* Metrics */}
        <div className="flex items-center gap-4 text-[10px] font-mono text-gray-400 font-bold uppercase">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-400" /> {repo.language}
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5" /> {repo.stars}
          </span>
          <span className="flex items-center gap-1">
            <GitBranch className="w-3.5 h-3.5" /> {repo.forks}
          </span>
          <span className="ml-auto text-[9px] text-gray-400 font-normal">
            Updated {repo.updatedAt}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function GithubSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

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
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const titleWords = "GitHub Showcase".split(" ");

  return (
    <section
      id="github"
      ref={sectionRef}
      className="py-28 md:py-36 px-6 md:px-12 relative border-t border-black/[0.03]"
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
        {/* Section Header */}
        <motion.div variants={cardVariants} className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5 mb-2.5">
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                className="w-6 h-[1px] bg-red-500 origin-left block"
              />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 font-mono">04 / Repositories</span>
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
          </div>

          {/* GitHub profile link */}
          <Magnetic>
            <a
              href="https://github.com/113vab"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("GitHub Profile Clicked", { url: "https://github.com/113vab" })}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-black text-white hover:bg-black/90 font-bold text-xs shadow-md transition-all z-20 cursor-pointer"
            >
              Follow on GitHub <Github className="w-4 h-4 text-white" />
            </a>
          </Magnetic>
        </motion.div>

        {/* Repositories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto justify-center">
          {repositories.map(repo => (
            <RepoCard
              key={repo.name}
              repo={repo}
              cardVariants={cardVariants}
              shouldReduceMotion={!!shouldReduceMotion}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

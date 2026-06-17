"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { profile } from "../data/profile";
import Magnetic from "./motion/Magnetic";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#certifications" },
  { name: "Contact", href: "#contact" },
];

interface NavbarProps {
  recruiterMode?: boolean;
  setRecruiterMode?: (val: boolean) => void;
}

export default function Navbar({ recruiterMode = false, setRecruiterMode }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  // Dynamic values that shift over a scroll distance of 0 to 80px
  const navbarPadding = useTransform(scrollY, [0, 80], ["20px", "10px"]);
  const navbarBg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(251, 251, 253, 0)", "rgba(251, 251, 253, 0.72)"]
  );
  const navbarBorder = useTransform(
    scrollY,
    [0, 80],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.05)"]
  );
  const navbarShadow = useTransform(
    scrollY,
    [0, 80],
    ["none", "0 4px 20px rgba(0, 0, 0, 0.01)"]
  );

  // Scroll listener for glass effect (backup for mobile menus/observers)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer to track active section
  useEffect(() => {
    if (recruiterMode) return; // Disable intersection observer when in recruiter mode

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px",
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Track all sections
    const sections = ["hero", "about", "skills", "projects", "certifications", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [recruiterMode]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (recruiterMode) {
      // If recruiter mode is active, clicking name/logo exits recruiter mode and scrolls to top
      if (href === "#hero" && setRecruiterMode) {
        setRecruiterMode(false);
        if (typeof window !== "undefined") {
          const url = new URL(window.location.href);
          url.searchParams.delete("recruiter");
          window.history.pushState({}, "", url.toString());
        }
      }
      return;
    }
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      setIsMobileMenuOpen(false);
      const offset = 80; // height of navbar
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

  const handleRecruiterToggle = () => {
    const newMode = !recruiterMode;
    if (setRecruiterMode) {
      setRecruiterMode(newMode);
    }
    setIsMobileMenuOpen(false);
    
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (newMode) {
        url.searchParams.set("recruiter", "true");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        url.searchParams.delete("recruiter");
      }
      window.history.pushState({}, "", url.toString());
    }
  };

  return (
    <>
      {/* Scroll Progress Bar (Hidden in Recruiter Mode) */}
      {!recruiterMode && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-500 to-rose-500 origin-left z-[100] pointer-events-none"
          style={{ scaleX }}
        />
      )}

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          paddingTop: shouldReduceMotion ? "10px" : navbarPadding,
          paddingBottom: shouldReduceMotion ? "10px" : navbarPadding,
          backgroundColor: navbarBg,
          borderColor: navbarBorder,
          boxShadow: navbarShadow,
        }}
        className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl px-6 md:px-12 flex items-center justify-between"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
          {/* Logo */}
          <a 
            href="#hero" 
            onClick={(e) => handleNavClick(e, "#hero")}
            className="text-lg font-extrabold tracking-wider bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent uppercase flex items-center gap-1.5 cursor-pointer"
          >
            {profile.name}
          </a>

          {/* Desktop Center Menu */}
          {recruiterMode ? (
            <div className="hidden md:flex items-center">
              <span className="text-[10px] font-bold text-red-500 font-mono tracking-widest uppercase bg-red-500/5 border border-red-500/15 px-4.5 py-1.5 rounded-full shadow-sm animate-pulse flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-red-500" /> Recruiter Dashboard
              </span>
            </div>
          ) : (
            <nav className="hidden md:flex items-center gap-1.5 bg-black/[0.03] border border-black/[0.05] rounded-full p-1.5 backdrop-blur-sm">
              {navItems.map((item) => {
                const id = item.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                      isActive 
                        ? "text-red-600 font-semibold" 
                        : "text-gray-500 hover:text-black hover:bg-black/[0.04]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/10 rounded-full"
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </a>
                );
              })}
            </nav>
          )}

          {/* Desktop Right CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Magnetic>
              <button
                onClick={handleRecruiterToggle}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 border cursor-pointer ${
                  recruiterMode
                    ? "bg-red-500/15 border-red-500/30 text-red-600 shadow-sm"
                    : "bg-white/60 border border-black/5 hover:border-black/15 text-gray-700 hover:text-black hover:bg-white shadow-sm"
                }`}
              >
                {recruiterMode ? "Exit Dashboard" : "👔 Recruiter Mode"}
              </button>
            </Magnetic>

            {!recruiterMode && (
              <Magnetic>
                <motion.a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  whileHover="hover"
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  className="relative overflow-hidden inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 transition-all duration-300 shadow-md shadow-red-500/10 hover:shadow-red-500/25 group"
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
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-20 pointer-events-none"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    Let&apos;s Talk
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </span>
                </motion.a>
              </Magnetic>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="md:hidden p-2 rounded-full bg-black/5 border border-black/10 text-gray-600 hover:text-black hover:bg-black/10 transition-all cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[70px] z-40 md:hidden bg-light-bg/95 backdrop-blur-xl px-6 py-8 flex flex-col gap-6 border-b border-card-border"
          >
            <nav className="flex flex-col gap-4">
              {recruiterMode ? (
                <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/10 text-center flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-red-500 animate-pulse" />
                  <span className="text-xs font-bold text-red-600 font-mono uppercase tracking-widest">
                    Recruiter Dashboard Active
                  </span>
                </div>
              ) : (
                navItems.map((item, idx) => {
                  const id = item.href.replace("#", "");
                  const isActive = activeSection === id;
                  return (
                    <motion.a
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`text-lg font-medium px-4 py-3 rounded-xl flex items-center justify-between ${
                        isActive 
                          ? "bg-black/5 text-red-600 border-l-2 border-red-500" 
                          : "text-gray-500 hover:text-black"
                      }`}
                    >
                      <span>{item.name}</span>
                      <ArrowUpRight className={`w-4 h-4 opacity-50 ${isActive ? "opacity-100 text-red-500" : ""}`} />
                    </motion.a>
                  );
                })
              )}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-auto flex flex-col gap-3"
            >
              <button
                onClick={handleRecruiterToggle}
                className="w-full justify-center inline-flex items-center gap-2 px-6 py-4 text-sm font-bold rounded-xl border border-red-500/15 text-red-600 bg-red-500/5 cursor-pointer hover:bg-red-500/10"
              >
                {recruiterMode ? "Exit Recruiter Mode" : "👔 Recruiter Mode"}
              </button>

              {!recruiterMode && (
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="w-full justify-center inline-flex items-center gap-2 px-6 py-4 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-red-500 to-rose-500"
                >
                  Hire Me
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { ArrowUp, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "../data/profile";

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
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

  return (
    <footer className="relative border-t border-black/5 bg-light-bg/75 backdrop-blur-md px-6 md:px-12 py-12 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Logo & Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "hero")}
            className="text-lg font-bold bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent mb-2"
          >
            {profile.name}
          </a>
          <p className="text-xs text-gray-500 max-w-xs leading-relaxed font-normal">
            {profile.role} focusing on data analytics, full-stack web development, and problem solving.
          </p>
        </div>

        {/* Center: Links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-gray-500">
          <a href="#hero" onClick={(e) => handleNavClick(e, "hero")} className="relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1.5px] after:w-full after:origin-right after:scale-x-0 after:bg-red-500 after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100 hover:text-black transition-colors">Home</a>
          <a href="#about" onClick={(e) => handleNavClick(e, "about")} className="relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1.5px] after:w-full after:origin-right after:scale-x-0 after:bg-red-500 after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100 hover:text-black transition-colors">About</a>
          <a href="#skills" onClick={(e) => handleNavClick(e, "skills")} className="relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1.5px] after:w-full after:origin-right after:scale-x-0 after:bg-red-500 after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100 hover:text-black transition-colors">Skills</a>
          <a href="#projects" onClick={(e) => handleNavClick(e, "projects")} className="relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1.5px] after:w-full after:origin-right after:scale-x-0 after:bg-red-500 after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100 hover:text-black transition-colors">Projects</a>
          <a href="#certifications" onClick={(e) => handleNavClick(e, "certifications")} className="relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1.5px] after:w-full after:origin-right after:scale-x-0 after:bg-red-500 after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100 hover:text-black transition-colors">Experience</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, "contact")} className="relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1.5px] after:w-full after:origin-right after:scale-x-0 after:bg-red-500 after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100 hover:text-black transition-colors">Contact</a>
        </nav>

        {/* Right Side: Copyrights */}
        <div className="flex flex-col items-center md:items-end text-xs text-gray-500 font-mono gap-1">
          <span className="flex items-center gap-1.5 justify-center">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" /> using Next.js 15
          </span>
          <span>&copy; {new Date().getFullYear()} Vaibhav Vishal. All rights reserved.</span>
        </div>

      </div>

      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            key="backToTop"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBackToTop}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-gradient-to-r from-red-500 to-rose-500 border border-red-500/10 text-white shadow-md hover:shadow-red-500/25 transition-all duration-300 cursor-pointer"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, Code, Mail, Sparkles, X, CornerDownLeft } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "./icons/BrandIcons";
import { siteConfig } from "../data/siteConfig";
import { trackEvent } from "../utils/analytics";

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string[];
}

interface CommandPaletteProps {
  recruiterMode: boolean;
  setRecruiterMode: (val: boolean) => void;
}

export default function CommandPalette({ recruiterMode, setRecruiterMode }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Toggle Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setActiveIndex(0);
      setSearch("");
      trackEvent("Command Palette Opened");
    }
  }, [isOpen]);

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
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

  const handleRecruiterToggle = () => {
    setIsOpen(false);
    const newMode = !recruiterMode;
    setRecruiterMode(newMode);
    
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

  const commands: CommandItem[] = [
    {
      id: "recruiter",
      title: recruiterMode ? "Exit Recruiter Mode" : "Enter Recruiter Mode",
      subtitle: recruiterMode ? "Exit clean summary dashboard" : "Open 30s summary metrics dashboard",
      icon: <Sparkles className="w-4 h-4 text-red-500" />,
      action: handleRecruiterToggle,
    },
    {
      id: "resume",
      title: "Download Resume",
      subtitle: "Get Vaibhav's B.Tech CSE PDF resume",
      icon: <FileText className="w-4 h-4 text-gray-500" />,
      action: () => {
        setIsOpen(false);
        trackEvent("Resume Downloaded from Command Palette");
        const link = document.createElement("a");
        link.href = siteConfig.resumePath;
        link.download = "Vaibhav_Vishal_Resume.pdf";
        link.click();
      },
    },
    {
      id: "projects",
      title: "Explore Projects",
      subtitle: "Jump to portfolio case studies & codebases",
      icon: <Code className="w-4 h-4 text-gray-500" />,
      action: () => handleScrollTo("projects"),
    },
    {
      id: "github",
      title: "Go to GitHub",
      subtitle: "Open github.com/113vab",
      icon: <Github className="w-4 h-4 text-gray-500" />,
      action: () => {
        setIsOpen(false);
        trackEvent("GitHub Link Opened from Command Palette");
        window.open("https://github.com/113vab", "_blank");
      },
    },
    {
      id: "linkedin",
      title: "Go to LinkedIn",
      subtitle: "Connect with Vaibhav on LinkedIn",
      icon: <Linkedin className="w-4 h-4 text-gray-500" />,
      action: () => {
        setIsOpen(false);
        trackEvent("LinkedIn Link Opened from Command Palette");
        window.open("https://www.linkedin.com/in/113vab/", "_blank");
      },
    },
    {
      id: "contact",
      title: "Contact Me",
      subtitle: "Send email, trigger phone callback, or fill out form",
      icon: <Mail className="w-4 h-4 text-gray-500" />,
      action: () => handleScrollTo("contact"),
    },
  ];

  // Filter commands by search
  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(search.toLowerCase()) ||
      cmd.subtitle.toLowerCase().includes(search.toLowerCase())
  );

  // Handle Keyboard Navigation inside Modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[activeIndex]) {
        filteredCommands[activeIndex].action();
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    const activeEl = listRef.current?.children[activeIndex] as HTMLElement;
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  return (
    <>
      {/* Floating command prompt indicator inside bottom-right */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl glass-panel border border-black/5 bg-white/60 hover:bg-white text-xs font-semibold text-gray-400 hover:text-black cursor-pointer shadow-md hover:shadow-lg transition-all"
        >
          <span>Command Prompt</span>
          <kbd className="px-1.5 py-0.5 rounded bg-black/5 border border-black/10 text-[9px] font-mono text-gray-500">
            Ctrl K
          </kbd>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[150] flex items-start justify-center pt-[15vh]">
            {/* Dark/Blurred Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onKeyDown={handleKeyDown}
              className="w-full max-w-xl mx-6 rounded-2xl border border-black/10 bg-white shadow-2xl overflow-hidden relative z-10 flex flex-col"
              style={{
                boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.2), 0 0 1px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Search Bar */}
              <div className="flex items-center px-4 py-3.5 border-b border-black/5 gap-3 bg-black/[0.01]">
                <Search className="w-5 h-5 text-gray-400 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or search..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setActiveIndex(0);
                  }}
                  className="w-full bg-transparent border-none outline-none text-sm text-black placeholder-gray-400"
                />
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-1 rounded-md hover:bg-black/5 text-gray-400 hover:text-black transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Commands List */}
              <div 
                ref={listRef}
                className="max-h-[320px] overflow-y-auto p-2 flex flex-col gap-0.5"
              >
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <button
                        key={cmd.id}
                        onClick={cmd.action}
                        onMouseEnter={() => setActiveIndex(idx)}
                        className={`w-full text-left px-3.5 py-3 rounded-xl flex items-center justify-between transition-colors ${
                          isActive 
                            ? "bg-red-500/10 text-red-700" 
                            : "bg-transparent text-gray-700"
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div className={`p-1.5 rounded-lg border ${
                            isActive ? "bg-red-500/10 border-red-500/20 text-red-600" : "bg-black/5 border-transparent text-gray-400"
                          }`}>
                            {cmd.icon}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold">{cmd.title}</span>
                            <span className="text-[10px] text-gray-400 font-normal">{cmd.subtitle}</span>
                          </div>
                        </div>

                        {isActive && (
                          <span className="flex items-center gap-0.5 text-[10px] font-medium text-red-500 bg-red-500/10 border border-red-500/15 px-1.5 py-0.5 rounded font-mono">
                            <span>Select</span>
                            <CornerDownLeft className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-xs text-gray-400 font-medium font-mono">
                    No matching actions found.
                  </div>
                )}
              </div>

              {/* Help Footer */}
              <div className="px-4.5 py-2.5 border-t border-black/5 bg-black/[0.01] flex items-center justify-between text-[9px] font-mono text-gray-400">
                <div className="flex gap-4">
                  <span>↑↓ Nav</span>
                  <span>↵ Enter</span>
                  <span>Esc Close</span>
                </div>
                <div>Linear OS v1.0</div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

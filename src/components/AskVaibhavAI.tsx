"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MessageSquare, X, Send, Bot, Sparkles, HelpCircle } from "lucide-react";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { experiences } from "../data/experience";
import { siteConfig } from "../data/siteConfig";
import { trackEvent } from "../utils/analytics";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

const quickQuestions = [
  { text: "Tell me about Campus Connect", category: "campus-connect" },
  { text: "Show internship experience", category: "experience" },
  { text: "What technologies does Vaibhav know?", category: "skills" },
  { text: "Show projects", category: "projects" },
  { text: "How can I contact Vaibhav?", category: "contact" }
];

export default function AskVaibhavAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: `Hello! I'm Vaibhav's local assistant. Ask me anything about his B.Tech, internships, skills, or projects. I run completely locally!`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
    }
  }, [messages, isOpen, shouldReduceMotion]);

  // Generate automated replies locally
  const generateResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    if (q.includes("campus connect") || q.includes("campusconnect")) {
      const proj = projects.find(p => p.id === 1);
      return `**Campus Connect** is a full-stack student collaboration hub designed by Vaibhav. \n\n• **Core Stack**: React, Node.js, Express, MongoDB, PostgreSQL, Socket.io.\n• **Key Features**: Dedicated course/hobby sub-forums, real-time peer chat with active indicators, and a secure student-only marketplace for books and campus essentials.\n• **Goal**: Bridges communication gaps in university environments by consolidating forums and chat systems securely.`;
    }
    
    if (q.includes("experience") || q.includes("internship") || q.includes("job") || q.includes("work")) {
      const expDetails = experiences.map(e => `• **${e.role}** at **${e.company}** (${e.date}):\n  ${e.highlights.slice(0, 3).join("\n  ")}`).join("\n\n");
      return `Vaibhav has professional internship experience in data analytics:\n\n${expDetails}`;
    }

    if (q.includes("technologies") || q.includes("technology") || q.includes("know") || q.includes("skills") || q.includes("stack")) {
      return `Vaibhav is skilled across Full-Stack development and Data Analytics:\n\n• **Web Development**: React, Node.js, Express, MongoDB, REST APIs, HTML/CSS.\n• **Data Analytics & BI**: PostgreSQL/SQL, Python (Pandas/EDA), Power BI, Looker Studio, Microsoft Excel.\n• **Developer Tools**: Git/GitHub, Jupyter Notebooks, Google Colab.`;
    }

    if (q.includes("projects") || q.includes("works") || q.includes("built")) {
      const projList = projects.map(p => `• **${p.title}** (${p.category}): ${p.desc}`).join("\n\n");
      return `Here are Vaibhav's major projects:\n\n${projList}`;
    }

    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach") || q.includes("linkedin")) {
      return `You can reach out to Vaibhav through the following channels:\n\n• **Email**: ${siteConfig.email}\n• **GitHub**: [github.com/113vab](https://github.com/113vab)\n• **LinkedIn**: Connected via his portfolio page.\n\nHe is currently ${siteConfig.availability.isAvailable ? "actively looking for internships/roles!" : "focusing on projects."}`;
    }

    // Default Fallback
    return `I'm a localized profile assistant. I can help you with:\n\n• Details about **Campus Connect** or other projects.\n• Vaibhav's **internships** at Elevate Labs and Excelerate.\n• Technical **skills** and languages he uses.\n• **Contact information** and resume details.\n\nTry clicking one of the quick questions above!`;
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      sender: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    trackEvent("Ask Vaibhav AI Query", { query: textToSend });

    // Stagger bot response to make it feel natural
    setTimeout(() => {
      const botResponse: Message = {
        id: Math.random().toString(36).substr(2, 9),
        sender: "bot",
        text: generateResponse(textToSend),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 600);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) trackEvent("Ask Vaibhav AI Opened");
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-red-500 to-rose-500 text-white flex items-center justify-center shadow-xl hover:shadow-red-500/25 transition-all duration-300 relative cursor-pointer group"
          aria-label="Ask Vaibhav AI"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
              {/* Tooltip prompt */}
              <span className="absolute right-16 scale-0 group-hover:scale-100 origin-right transition-transform duration-200 bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap">
                Ask Vaibhav AI
              </span>
            </>
          )}
        </motion.button>
      </div>

      {/* Chat window panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.92 }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="fixed bottom-24 right-6 w-[340px] sm:w-[380px] h-[520px] rounded-3xl glass-panel bg-white/95 border border-black/5 shadow-2xl flex flex-col overflow-hidden z-50"
          >
            {/* Chat Header */}
            <div className="p-4 bg-gradient-to-r from-red-500/5 to-rose-500/5 border-b border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-black text-sm flex items-center gap-1.5">
                    Ask Vaibhav AI <Sparkles className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                  </h4>
                  <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 block" /> Local Search Engine
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat messages list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 select-text">
              {messages.map((msg) => {
                const isBot = msg.sender === "bot";
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isBot ? "justify-start" : "justify-end"}`}
                  >
                    {isBot && (
                      <div className="w-7 h-7 rounded-lg bg-black/5 border border-black/5 flex items-center justify-center shrink-0 text-gray-500 mt-0.5">
                        <Bot className="w-4.5 h-4.5" />
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed font-normal ${
                        isBot
                          ? "bg-black/[0.02] border border-black/5 text-gray-700 rounded-tl-none whitespace-pre-line"
                          : "bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-tr-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggestions scroll wrapper */}
            <div className="px-4 py-2 border-t border-black/5 bg-black/[0.01]">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest font-mono flex items-center gap-1 mb-2">
                <HelpCircle className="w-3.5 h-3.5" /> Quick Inquiries
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1.5 no-scrollbar scroll-smooth">
                {quickQuestions.map((qq) => (
                  <button
                    key={qq.category}
                    onClick={() => handleSendMessage(qq.text)}
                    className="shrink-0 px-3 py-1.5 rounded-full bg-white border border-black/5 hover:border-red-500/20 hover:bg-red-500/5 text-[10px] font-bold text-gray-600 hover:text-red-600 transition-all cursor-pointer shadow-sm"
                  >
                    {qq.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 bg-white border-t border-black/5 flex gap-2 items-center"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about skills, projects, contact..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-black/5 focus:outline-none focus:border-red-500/30 text-xs bg-black/[0.01]"
              />
              <motion.button
                type="submit"
                disabled={!inputValue.trim()}
                whileHover={inputValue.trim() ? { scale: 1.05 } : {}}
                whileTap={inputValue.trim() ? { scale: 0.95 } : {}}
                className={`w-9.5 h-9.5 rounded-xl flex items-center justify-center transition-all ${
                  inputValue.trim()
                    ? "bg-gradient-to-r from-red-500 to-rose-500 text-white cursor-pointer shadow-md shadow-red-500/10"
                    : "bg-gray-100 text-gray-300"
                }`}
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

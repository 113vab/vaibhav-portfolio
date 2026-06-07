"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { Mail, Phone, Send, CheckCircle, AlertCircle } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "./icons/BrandIcons";
import { siteConfig } from "../data/siteConfig";
import { socials } from "../data/socials";
import Magnetic from "./motion/Magnetic";

const getSocialIcon = (iconName: string) => {
  switch (iconName) {
    case "Github":
      return <Github className="w-5 h-5" />;
    case "LinkedIn":
    case "Linkedin":
      return <Linkedin className="w-5 h-5" />;
    default:
      return null;
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
        <div className="pointer-events-auto h-full flex flex-col justify-between">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

export default function Contact() {
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) errors.subject = "Subject is required";
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }
    return errors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setStatus("submitting");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

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

  const titleWords = "Get In Touch".split(" ");

  return (
    <section 
      id="contact" 
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
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 font-mono">05 / Connect</span>
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct info & social links (Wrapped in SpotlightCard) */}
          <SpotlightCard
            variants={cardVariants}
            whileHover={hoverEffect}
            className="lg:col-span-5 rounded-3xl glass-panel p-8 md:p-10 transition-all duration-300 border border-black/5"
          >
            <div>
              <h3 className="text-2xl font-bold text-black mb-4">Let&apos;s discuss your next project</h3>
              <p className="text-gray-600 leading-relaxed mb-8 font-normal">
                Whether you have an exciting project idea, a position to fill, or just want to chat about tech—feel free to drop a message. I&apos;ll do my best to get back to you within 24 hours.
              </p>

              <div className="flex flex-col gap-5">
                {/* Email Item */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-black/5 border border-black/5 flex items-center justify-center text-red-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email Me</p>
                    <Magnetic>
                      <a href={`mailto:${siteConfig.email}`} className="relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1.5px] after:w-full after:origin-right after:scale-x-0 after:bg-red-500 after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100 text-sm sm:text-base font-semibold text-black hover:text-red-600 transition-colors inline-block">
                        {siteConfig.email}
                      </a>
                    </Magnetic>
                  </div>
                </div>

                {/* Phone Item */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-black/5 border border-black/5 flex items-center justify-center text-red-500">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Call / WhatsApp</p>
                    <Magnetic>
                      <a href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`} className="relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1.5px] after:w-full after:origin-right after:scale-x-0 after:bg-red-500 after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100 text-sm sm:text-base font-semibold text-black hover:text-red-600 transition-colors inline-block">
                        {siteConfig.phone}
                      </a>
                    </Magnetic>
                  </div>
                </div>

                {/* Current Status Block */}
                {siteConfig.availability.isAvailable && (
                  <div className="mt-4 p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider font-mono mb-2">Current Status</h4>
                      <p className="text-sm font-semibold text-black mb-1">{siteConfig.availability.statusText}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {siteConfig.availability.categories.map((cat) => (
                          <span key={cat} className="text-[10px] font-mono text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Social Accounts */}
            <div className="mt-12 lg:mt-0 pt-8 border-t border-black/10">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider font-mono mb-4">Find me on</p>
              <div className="flex gap-4">
                {socials.map((link) => (
                  <Magnetic key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-black/5 border border-black/10 flex items-center justify-center text-gray-600 hover:text-red-600 hover:border-black/20 transition-all duration-300"
                      aria-label={link.name}
                    >
                      {getSocialIcon(link.iconName)}
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>
          </SpotlightCard>

          {/* Right Column: Contact Form (Wrapped in SpotlightCard) */}
          <motion.div variants={cardVariants} className="lg:col-span-7">
            <SpotlightCard
              whileHover={hoverEffect}
              className="rounded-3xl glass-panel p-8 md:p-10 transition-all duration-300 border border-black/5"
            >
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.15 }}
                      className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 mb-6"
                    >
                      <CheckCircle className="w-8 h-8" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-black mb-2">Message Sent!</h3>
                    <p className="text-gray-600 max-w-sm mb-8 font-normal leading-relaxed">
                      Thank you for reaching out. Your message has been successfully transmitted and I will review it shortly.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="px-6 py-2.5 rounded-xl text-xs font-bold text-gray-800 bg-black/5 border border-black/10 hover:bg-black/10 transition-all duration-350"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6 w-full"
                  >
                    {/* Name and Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <label htmlFor="name" className="text-xs font-semibold text-gray-600 mb-2 font-mono">
                          NAME
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl bg-black/2 border text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-300 focus:shadow-[0_0_15px_rgba(255,59,48,0.15)] ${
                            formErrors.name ? "border-red-500/50" : "border-black/10"
                          }`}
                          placeholder="Your Name"
                          disabled={status === "submitting"}
                        />
                        {formErrors.name && (
                          <span className="text-xs text-red-500 mt-1 flex items-center gap-1 font-mono">
                            <AlertCircle className="w-3.5 h-3.5" /> {formErrors.name}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="email" className="text-xs font-semibold text-gray-600 mb-2 font-mono">
                          EMAIL
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl bg-black/2 border text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-300 focus:shadow-[0_0_15px_rgba(255,59,48,0.15)] ${
                            formErrors.email ? "border-red-500/50" : "border-black/10"
                          }`}
                          placeholder="your.email@example.com"
                          disabled={status === "submitting"}
                        />
                        {formErrors.email && (
                          <span className="text-xs text-red-500 mt-1 flex items-center gap-1 font-mono">
                            <AlertCircle className="w-3.5 h-3.5" /> {formErrors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col">
                      <label htmlFor="subject" className="text-xs font-semibold text-gray-600 mb-2 font-mono">
                        SUBJECT
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl bg-black/2 border text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-300 focus:shadow-[0_0_15px_rgba(255,59,48,0.15)] ${
                          formErrors.subject ? "border-red-500/50" : "border-black/10"
                        }`}
                        placeholder="Project Inquiry / Job Opportunity"
                        disabled={status === "submitting"}
                      />
                      {formErrors.subject && (
                        <span className="text-xs text-red-500 mt-1 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3.5 h-3.5" /> {formErrors.subject}
                        </span>
                      )}
                    </div>

                    {/* Message */}
                    <div className="flex flex-col">
                      <label htmlFor="message" className="text-xs font-semibold text-gray-600 mb-2 font-mono">
                        MESSAGE
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl bg-black/2 border text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-300 resize-none focus:shadow-[0_0_15px_rgba(255,59,48,0.15)] ${
                          formErrors.message ? "border-red-500/50" : "border-black/10"
                        }`}
                        placeholder="Tell me about your project..."
                        disabled={status === "submitting"}
                      />
                      {formErrors.message && (
                        <span className="text-xs text-red-500 mt-1 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3.5 h-3.5" /> {formErrors.message}
                        </span>
                      )}
                    </div>

                    {/* Submit Button with reflective sheen */}
                    <motion.button
                      type="submit"
                      disabled={status === "submitting"}
                      whileHover="hover"
                      whileTap={shouldReduceMotion ? {} : { scale: 0.985 }}
                      className="relative overflow-hidden w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group shadow-md shadow-red-500/10 hover:shadow-red-500/25"
                    >
                      {!shouldReduceMotion && (
                        <motion.span
                          initial={{ x: "-150%" }}
                          variants={{
                            hover: { x: ["-150%", "150%"] }
                          }}
                          transition={{
                            repeat: Infinity,
                            repeatType: "loop" as const,
                            duration: 2.5,
                            ease: [0.16, 1, 0.3, 1],
                            repeatDelay: 0.8
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-20 pointer-events-none"
                        />
                      )}
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {status === "submitting" ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                            Send Message
                          </>
                        )}
                      </span>
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </SpotlightCard>
          </motion.div>

        </div>

      </motion.div>
    </section>
  );
}

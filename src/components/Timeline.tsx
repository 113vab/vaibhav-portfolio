"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap, Code, Briefcase, Calendar, Award } from "lucide-react";

interface TimelineEvent {
  year: string;
  title: string;
  subtitle: string;
  type: "academic" | "hackathon" | "work" | "future";
  desc: string;
  details: string[];
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2023",
    title: "Started B.Tech CSE",
    subtitle: "Sanskriti University",
    type: "academic",
    desc: "Commenced undergraduate studies in Bachelor of Technology (B.Tech) in Computer Science Engineering, building core skills in Algorithms, OS, and OOP.",
    details: ["Focus on core computing principles", "Maintained strong academic index", "Active coding club volunteer"]
  },
  {
    year: "2024",
    title: "Smart India Hackathon Participant",
    subtitle: "Ministry of Education, Govt. of India",
    type: "hackathon",
    desc: "Represented university in designing and building a Heritage Tourism Platform. Facilitated regional artisan discoverability and geolocation landmarks lookup.",
    details: ["Built maps exploration engine", "Optimized mobile performance load", "Earned national-level team showcase credentials"]
  },
  {
    year: "2025",
    title: "Data Visualisation Associate",
    subtitle: "Excelerate (SLU Partnered)",
    type: "work",
    desc: "Authored PostgreSQL query pipelines, performed database aggregates, and designed interactive analytics metrics pages on Looker Studio.",
    details: ["Engineered Looker Studio dashboards", "Wrote relational database aggregates", "Coordinated resource reporting workflows"]
  },
  {
    year: "2025",
    title: "Data Analyst Intern",
    subtitle: "Elevate Labs",
    type: "work",
    desc: "Built Power BI business intelligence dashboards, monitored core growth KPIs, and executed exploratory analytics on sales and user retention.",
    details: ["Constructed Power BI KPI dashboards", "Performed data cleaning and consolidation", "Authored executive summary logs for business leads"]
  },
  {
    year: "2026+",
    title: "Full Stack & Analytics Engineering",
    subtitle: "Advanced Portfolios",
    type: "future",
    desc: "Focusing on deploying robust Full-Stack applications (like Campus Connect) and building interactive analytics dashboards. Actively exploring internships and entry roles.",
    details: ["Engineering full-stack architectures", "Integrating deep metrics systems", "Exploring modern web performance setups"]
  }
];

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
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

  const getEventIcon = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "academic":
        return <GraduationCap className="w-5 h-5 text-red-500" />;
      case "hackathon":
        return <Award className="w-5 h-5 text-rose-500" />;
      case "work":
        return <Briefcase className="w-5 h-5 text-rose-600" />;
      default:
        return <Code className="w-5 h-5 text-red-500" />;
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const titleWords = "Professional Journey".split(" ");

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="py-28 md:py-36 px-6 md:px-12 relative border-t border-black/[0.03] overflow-hidden"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1] as const,
              staggerChildren: 0.15
            }
          }
        }}
        className="max-w-7xl mx-auto z-10 relative"
      >
        {/* Section Heading */}
        <motion.div variants={itemVariants} className="flex flex-col mb-16 md:mb-20">
          <div className="flex items-center gap-2.5 mb-2.5">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
              className="w-6 h-[1px] bg-red-500 origin-left block"
            />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 font-mono">05 / Experience Timeline</span>
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

        {/* Timeline Visualization structure */}
        <div className="relative max-w-4xl mx-auto pl-8 sm:pl-12 border-l border-black/5 space-y-12">
          {/* Flow vertical line overlay */}
          <div className="absolute top-0 bottom-0 left-[31px] sm:left-[47px] w-[2px] bg-gradient-to-b from-red-500 via-rose-500 to-transparent pointer-events-none" />

          {timelineEvents.map((evt, idx) => (
            <motion.div
              key={evt.year}
              variants={itemVariants}
              className="relative flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-8 items-start group"
            >
              {/* Floating year dot milestone */}
              <div className="absolute -left-[45px] sm:-left-[61px] top-1.5 w-9 h-9 rounded-full bg-white border-2 border-red-500/20 shadow-md flex items-center justify-center z-10 group-hover:border-red-500 group-hover:shadow-lg transition-all duration-300">
                {getEventIcon(evt.type)}
              </div>

              {/* Year Label */}
              <div className="md:col-span-3">
                <span className="inline-block text-xl font-extrabold font-mono text-red-500 leading-none mb-1">
                  {evt.year}
                </span>
                <h4 className="text-base font-extrabold text-black tracking-tight">
                  {evt.title}
                </h4>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider font-mono flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" /> {evt.subtitle}
                </p>
              </div>

              {/* Event Details Card (Floats slightly with realistic shadow transition) */}
              <motion.div 
                whileHover={isMobile || shouldReduceMotion ? {} : { y: -4, scale: 1.01 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="md:col-span-9 p-6 rounded-3xl glass-panel border border-black/5 bg-white/60 hover:bg-white hover:border-red-500/15 shadow-sm hover:shadow-xl hover:shadow-red-500/[0.005] transition-all duration-300 w-full"
              >
                <p className="text-sm text-gray-600 leading-relaxed font-normal mb-4">
                  {evt.desc}
                </p>
                <div className="flex flex-wrap gap-2 pt-2 border-t border-black/5">
                  {evt.details.map(det => (
                    <span key={det} className="text-[10px] sm:text-xs font-semibold bg-black/3 border border-black/5 px-2.5 py-1 rounded-xl text-gray-600 transition-colors hover:text-red-500 hover:bg-red-500/[0.02] hover:border-red-500/10">
                      {det}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

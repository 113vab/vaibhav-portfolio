"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function BackgroundGlow() {
  const [mounted, setMounted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Motion values to track normalized mouse coordinates [-0.5, 0.5]
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Soft springs for smooth cursor-reactive translations
  const springX = useSpring(mouseX, { damping: 40, stiffness: 80 });
  const springY = useSpring(mouseY, { damping: 40, stiffness: 80 });

  // Map mouse coordinate ratios to extremely subtle blob offsets (max 25px offset)
  const translateBlob1X = useTransform(springX, [-0.5, 0.5], [-25, 25]);
  const translateBlob1Y = useTransform(springY, [-0.5, 0.5], [-25, 25]);

  const translateBlob2X = useTransform(springX, [-0.5, 0.5], [30, -30]);
  const translateBlob2Y = useTransform(springY, [-0.5, 0.5], [-30, 30]);

  const translateBlob3X = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const translateBlob3Y = useTransform(springY, [-0.5, 0.5], [20, -20]);

  useEffect(() => {
    setMounted(true);

    const checkDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0
      );
      setIsMobile(window.innerWidth < 768);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);

    const handleMouseMove = (e: MouseEvent) => {
      // Coordinates normalized relative to viewport center
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    if (!isTouchDevice) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isTouchDevice, mouseX, mouseY]);

  if (!mounted) return null;

  const disableAnimations = isMobile;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[#fbfbfd]" />

      {/* Top Left Glow (Reacts to mouse) */}
      <motion.div
        style={{
          x: isTouchDevice || disableAnimations ? 0 : translateBlob1X,
          y: isTouchDevice || disableAnimations ? 0 : translateBlob1Y,
        }}
        animate={disableAnimations ? {} : {
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.45, 0.3],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-15%] left-[-15%] w-[65vw] h-[65vw] rounded-full bg-glow-purple"
      />

      {/* Center Right Glow (Reacts to mouse) */}
      <motion.div
        style={{
          x: isTouchDevice || disableAnimations ? 0 : translateBlob2X,
          y: isTouchDevice || disableAnimations ? 0 : translateBlob2Y,
        }}
        animate={disableAnimations ? {} : {
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[20%] right-[-15%] w-[70vw] h-[70vw] rounded-full bg-glow-blue"
      />

      {/* Bottom Left Glow (Reacts to mouse) */}
      <motion.div
        style={{
          x: isTouchDevice || disableAnimations ? 0 : translateBlob3X,
          y: isTouchDevice || disableAnimations ? 0 : translateBlob3Y,
        }}
        animate={disableAnimations ? {} : {
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-15%] left-[5%] w-[55vw] h-[55vw] rounded-full bg-glow-teal"
      />

      {/* Large Subtle Ambient Shape 1 */}
      <motion.div
        animate={disableAnimations ? {} : {
          rotate: [0, 360],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[15%] left-[10%] w-[35vw] h-[35vw] rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] bg-gradient-to-tr from-rose-500/1 to-red-500/1 border border-black/[0.01]"
      />

      {/* Large Subtle Ambient Shape 2 */}
      <motion.div
        animate={disableAnimations ? {} : {
          rotate: [360, 0],
          y: [0, 45, 0],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] rounded-[60%_40%_30%_70%_/_50%_60%_40%_50%] bg-gradient-to-tr from-rose-500/1 to-red-500/1 border border-black/[0.01]"
      />

      {/* Ambient Data Environment (SQL / API / Git logs at 2-3% opacity) */}
      {mounted && [
        "SELECT COUNT(*), status FROM telemetry WHERE latency > 150 GROUP BY status;",
        "GET /api/v1/system/nodes?core=vaibhav_core HTTP/1.1 (200 OK)",
        "commit 86c38dd (HEAD -> main) feat: core network experience mapping",
        "def optimize_query(sql_str): return sql_str.replace('SELECT *', 'SELECT keys')",
        "INSERT INTO metrics (timestamp, core_id, rate) VALUES (NOW(), 'reactor_01', 99.8);",
        "df = pd.read_sql_query(query, conn).dropna().groupby('category').mean()",
        "POST /api/v1/campus-connect/message sender_id=113vab text='Hello World'",
        "ssh vaibhav@core-telemetry-cluster -p 22 -i ~/.ssh/identity"
      ].map((snippet, idx) => {
        const x = [5, 55, 12, 68, 8, 65, 42, 78][idx];
        const y = [10, 18, 42, 58, 82, 88, 30, 72][idx];
        const duration = [55, 65, 60, 75, 70, 62, 68, 72][idx];
        return (
          <motion.div
            key={idx}
            style={{ left: `${x}%`, top: `${y}%` }}
            animate={disableAnimations ? {} : {
              y: [0, -30, 0],
              x: [0, 20, 0]
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute font-mono text-[9px] sm:text-[10px] text-black select-none pointer-events-none opacity-[0.02] whitespace-nowrap"
          >
            {snippet}
          </motion.div>
        );
      })}

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-normal"
        style={{
          backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.1) 1.5px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  );
}

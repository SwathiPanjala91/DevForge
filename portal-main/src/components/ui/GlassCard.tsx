"use client";

import React from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "purple" | "rose" | "emerald" | "amber";
  hoverEffect?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  glowColor = "cyan",
  hoverEffect = true,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -2 } : {}}
      transition={{ duration: 0.15, ease: "easeOut" }}
      onClick={onClick}
      className={`glass-card rounded-2xl p-6 relative overflow-hidden ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {children}
    </motion.div>
  );
};

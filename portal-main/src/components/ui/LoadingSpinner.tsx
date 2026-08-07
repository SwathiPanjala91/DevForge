"use client";

import React from "react";
import { motion } from "framer-motion";

export const LoadingSpinner: React.FC<{ size?: "sm" | "md" | "lg"; label?: string }> = ({
  size = "md",
  label,
}) => {
  const sizeMap = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-6">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className={`rounded-full border-t-cyan-400 border-r-purple-500 border-b-transparent border-l-cyan-400/20 ${sizeMap[size]}`}
        />
        <div className="absolute inset-0 rounded-full blur-md bg-primary/20 animate-pulse" />
      </div>
      {label && <p className="text-xs font-mono text-cyan-300/80 tracking-widest uppercase animate-pulse">{label}</p>}
    </div>
  );
};

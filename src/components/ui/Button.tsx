"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "glow" | "magnetic" | "outline" | "danger" | "glass" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = "",
  disabled,
  onClick,
  ...props
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs rounded-xl gap-1.5",
    md: "px-4 py-2 text-xs font-semibold rounded-xl gap-2",
    lg: "px-5 py-2.5 text-sm rounded-xl gap-2 font-semibold",
    xl: "px-7 py-3 text-base rounded-2xl gap-2.5 font-bold",
  };

  const variantClasses = {
    primary:
      "bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-md border border-primary/30",
    glow:
      "bg-blue-500 hover:bg-blue-400 text-white font-bold border border-blue-300 shadow-md shadow-blue-500/20",
    magnetic:
      "bg-card hover:bg-slate-800 text-white/90 border border-border hover:border-border/50 shadow-lg",
    outline:
      "bg-transparent border border-border/80 text-white/70 hover:text-white hover:bg-white/5",
    danger:
      "bg-rose-600 hover:bg-rose-500 text-white border border-rose-400/30 shadow-md shadow-rose-600/20",
    glass:
      "bg-card/80 hover:bg-slate-800 text-white border border-border shadow-lg",
    ghost: "bg-transparent text-white/50 hover:text-white hover:bg-white/5",
  };

  return (
    <motion.button
      ref={btnRef}
      whileHover={{ y: disabled || isLoading ? 0 : -1 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`inline-flex items-center justify-center transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...(props as any)}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </motion.button>
  );
};

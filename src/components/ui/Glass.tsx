"use client";

import React from "react";

interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  blur?: "sm" | "md" | "lg" | "xl";
  className?: string;
  hoverEffect?: boolean;
}

export const Glass: React.FC<GlassProps> = ({
  children,
  blur = "lg",
  className = "",
  hoverEffect,
  ...props
}) => {
  const blurClasses = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl",
  };

  return (
    <div
      className={`bg-card/60 border border-border ${blurClasses[blur]} shadow-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

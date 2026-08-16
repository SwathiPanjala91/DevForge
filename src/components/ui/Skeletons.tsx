"use client";

import React from "react";

export const Skeleton: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse bg-white/10 rounded-xl border border-white/5 ${className}`}
    />
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <div className="flex gap-3 mt-2">
        <Skeleton className="h-8 w-20 rounded-lg" />
        <Skeleton className="h-8 w-20 rounded-lg" />
      </div>
    </div>
  );
};

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="glass-card rounded-2xl p-4 flex flex-col gap-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 py-2 border-b border-white/5 last:border-0">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-5 flex-1 rounded-md" />
          <Skeleton className="h-5 w-24 rounded-md" />
          <Skeleton className="h-5 w-16 rounded-md" />
        </div>
      ))}
    </div>
  );
};

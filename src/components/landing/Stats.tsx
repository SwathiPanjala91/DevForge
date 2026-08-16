"use client";

import React from "react";
import { motion, useSpring, useTransform } from "framer-motion";

const StatItem = ({ label, value }: { label: string; value: number }) => {
  const count = useSpring(0, { duration: 2000 });
  const display = useTransform(count, (latest) => Math.floor(latest));

  React.useEffect(() => {
    count.set(value);
  }, [value, count]);

  return (
    <div className="text-center p-6 glass-card">
      <motion.div className="text-4xl font-extrabold text-primary mb-2">
        <motion.span>{display}</motion.span>+
      </motion.div>
      <div className="text-text-secondary">{label}</div>
    </div>
  );
};

export const Stats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto px-6 py-12">
      <StatItem label="Students" value={2500} />
      <StatItem label="Problems" value={500} />
      <StatItem label="Modules" value={150} />
      <StatItem label="Submissions" value={10000} />
    </div>
  );
};

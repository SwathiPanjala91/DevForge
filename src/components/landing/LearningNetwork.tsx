"use client";

import React from "react";
import { motion } from "framer-motion";

const nodes = [
  { name: "Learn", delay: 0 },
  { name: "Practice", delay: 0.2 },
  { name: "Solve", delay: 0.4 },
  { name: "Compete", delay: 0.6 },
  { name: "Achieve", delay: 0.8 },
  { name: "Grow", delay: 1 },
];

export const LearningNetwork = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-24">
      {nodes.map((node, i) => (
        <React.Fragment key={node.name}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: node.delay, duration: 0.5 }}
            className="w-48 h-16 flex items-center justify-center glass-card font-bold text-lg"
          >
            {node.name}
          </motion.div>
          {i < nodes.length - 1 && (
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: 48 }}
              viewport={{ once: true }}
              transition={{ delay: node.delay + 0.2, duration: 0.5 }}
              className="w-0.5 bg-border"
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

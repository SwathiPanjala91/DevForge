"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const router = useRouter();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md py-4 border-b border-border" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter text-primary">
          JNTUH UCEJ
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
            Login
          </Link>
          <Button variant="primary" size="sm" onClick={() => router.push("/signup")}>Join Now</Button>
        </div>
      </div>
    </motion.nav>
  );
};

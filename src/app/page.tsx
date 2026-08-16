"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ThreeBackground } from "@/components/landing/ThreeBackground";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/ui/Footer";
import { 
  Code2, 
  Sparkles, 
  Terminal, 
  Trophy, 
  Zap, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen,
  Cpu,
  Flame,
  Star,
  Award,
  Layers,
  ShieldCheck,
  Calendar,
  Globe,
  FileCode2,
  Check
} from "lucide-react";

export default function LandingPage() {
  // Signature Hero Animated Storytelling State (Type -> Run -> Pass -> +XP -> Rank Up)
  const [step, setStep] = useState<"typing" | "running" | "passed" | "ranked">("typing");
  const [typedCode, setTypedCode] = useState("");
  const targetCode = `function solveLRUCache(capacity, queries) {\n  const cache = new LRUCache(capacity);\n  return queries.map(q => cache.execute(q));\n}`;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (step === "typing") {
      let index = 0;
      const interval = setInterval(() => {
        setTypedCode(targetCode.slice(0, index));
        index++;
        if (index > targetCode.length) {
          clearInterval(interval);
          timeoutId = setTimeout(() => setStep("running"), 600);
        }
      }, 45);
      return () => clearInterval(interval);
    } else if (step === "running") {
      timeoutId = setTimeout(() => setStep("passed"), 1000);
    } else if (step === "passed") {
      timeoutId = setTimeout(() => setStep("ranked"), 1400);
    } else if (step === "ranked") {
      timeoutId = setTimeout(() => {
        setStep("typing");
        setTypedCode("");
      }, 4500); // Controlled rest period
    }

    return () => clearTimeout(timeoutId);
  }, [step]);

  // Interactive Knowledge Graph Node Selection
  const [activeKnowledgeNode, setActiveKnowledgeNode] = useState("dsa");

  const knowledgeNodes: Record<string, { title: string; desc: string; topics: string[]; icon: any }> = {
    dsa: {
      title: "Data Structures & Algorithms",
      desc: "Master Big-O analysis, Hash Maps, Trees, Graph Traversals (BFS/DFS), and Dynamic Programming.",
      topics: ["Two Pointers", "Sliding Window", "Binary Search", "Dijkstra", "Memoization"],
      icon: Code2,
    },
    web: {
      title: "Full Stack Web Architectures",
      desc: "Build modern Next.js 15 App Router applications with Server Actions, Streaming, and Firebase Auth.",
      topics: ["React 19 Hooks", "TypeScript", "Tailwind CSS", "Server Actions", "PostgreSQL/Firestore"],
      icon: Layers,
    },
    ai: {
      title: "Artificial Intelligence & Agents",
      desc: "Architect LLM agentic workflows, PyTorch neural networks, vector embeddings, and RAG systems.",
      topics: ["Vector Databases", "Embeddings", "PyTorch", "Prompt Engineering", "Multi-Agent Systems"],
      icon: Cpu,
    },
    sec: {
      title: "Cyber Security & Cryptography",
      desc: "Understand application vulnerability assessment, JWT verification, and security rule enforcement.",
      topics: ["Firestore Security Rules", "OAuth 2.0", "Penetration Testing", "Encryption"],
      icon: ShieldCheck,
    },
  };

  const ActiveIcon = knowledgeNodes[activeKnowledgeNode].icon;

  const stats = [
    { label: "Active Developers", value: "48,000+", icon: Users },
    { label: "Evaluated Submissions", value: "2.4M+", icon: Terminal },
    { label: "Live Clashes & Contests", value: "150+", icon: Trophy },
    { label: "Execution Latency", value: "< 45ms", icon: Zap },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-background text-white">
      <ThreeBackground />

      {/* Hero Section */}
      <section className="relative z-10 min-h-[92vh] flex items-center justify-center px-4 sm:px-8 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Platform Editorial Headline & CTAs */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-max text-xs font-mono text-primary">
              <Sparkles className="w-3.5 h-3.5" /> JNTUH UCEJ CODING CLUB
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
              The Digital Campus for <span className="text-gradient">Ambitious Developers</span>.
            </h1>

            <p className="text-base sm:text-lg text-white/70 font-normal leading-relaxed max-w-2xl">
              Elevate algorithmic problem solving, master full-stack software engineering, and build your technical identity on a unified developer intelligence platform.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/signup">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Get Started Free
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" leftIcon={<Code2 className="w-4 h-4 text-primary" />}>
                  Student Login
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Signature Interactive Developer Command Center */}
          <div className="lg:col-span-5 relative">
            <GlassCard className="p-6 border border-border rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-border text-xs font-mono">
                <span className="text-white/50 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" /> LRU_Cache_Solver.ts
                </span>
                <span className="text-primary font-semibold uppercase">Step: {step}</span>
              </div>

              {/* Code Snippet Box */}
              <div className="bg-card/90 rounded-2xl p-4 font-mono text-xs min-h-[160px] text-white/90 border border-border shadow-inner flex flex-col justify-between">
                <pre className="text-primary/80">
                  {typedCode}
                  {step === "typing" && <span className="animate-pulse inline-block w-2 h-4 bg-blue-400 ml-1" />}
                </pre>

                {step === "running" && (
                  <div className="pt-3 border-t border-border text-amber-400 flex items-center gap-2 text-[11px] animate-pulse">
                    <Cpu className="w-3.5 h-3.5 animate-spin" /> Executing 3 Test Cases on Judge0 Engine...
                  </div>
                )}
              </div>

              {/* Interactive Pass / XP / Rank Story Result Box */}
              <div className="mt-4 pt-3 border-t border-border flex flex-col gap-2 font-mono text-xs">
                {(step === "passed" || step === "ranked") && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between p-2.5 rounded-xl bg-secondary/10 border border-secondary/30 text-secondary">
                    <span className="flex items-center gap-1.5 font-bold"><Check className="w-4 h-4" /> 3/3 Test Cases Passed</span>
                    <span className="text-white font-bold">+100 XP</span>
                  </motion.div>
                )}

                {step === "ranked" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
                    <span className="flex items-center gap-1.5 font-bold"><Trophy className="w-4 h-4 text-amber-400" /> Rank Up: #42 Global</span>
                    <span className="text-xs bg-amber-400/20 px-2 py-0.5 rounded text-amber-300">Level 12</span>
                  </motion.div>
                )}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Credibility Statistics Counter Bar */}
      <section className="relative z-10 py-10 border-y border-border bg-card/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">{s.value}</h3>
                  <p className="text-xs text-white/50 font-mono uppercase tracking-wider">{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Signature 2: Interactive Developer Knowledge Graph */}
      <section className="relative z-10 py-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              KNOWLEDGE GRAPH & ROADMAPS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-3">
              Architect Your <span className="text-gradient">Engineering Mastery</span>
            </h2>
            <p className="text-sm text-white/50 mt-2">Explore interconnected pathways from foundational algorithms to advanced multi-agent AI systems.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column (5 cols): Node Selectors */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {Object.keys(knowledgeNodes).map((key) => {
                const node = knowledgeNodes[key];
                const Icon = node.icon;
                const isSelected = activeKnowledgeNode === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveKnowledgeNode(key)}
                    className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? "bg-primary/20 border-primary text-white shadow-lg"
                        : "bg-card/60 border-border text-white/50 hover:text-white hover:border-border/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isSelected ? "text-primary" : "text-white/50"}`} />
                      <span className="font-bold text-sm">{node.title}</span>
                    </div>
                    {isSelected && <ArrowRight className="w-4 h-4 text-primary" />}
                  </button>
                );
              })}
            </div>

            {/* Right Column (7 cols): Selected Node Detail Showcase */}
            <div className="lg:col-span-7">
              <GlassCard className="p-8 border border-border/80 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary">
                    <ActiveIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{knowledgeNodes[activeKnowledgeNode].title}</h3>
                    <span className="text-xs font-mono text-primary">Curated Curriculum Pathway</span>
                  </div>
                </div>

                <p className="text-sm text-white/70 leading-relaxed">
                  {knowledgeNodes[activeKnowledgeNode].desc}
                </p>

                <div className="pt-2 border-t border-border">
                  <h4 className="text-xs font-mono uppercase text-white/50 mb-3">Core Modules & Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {knowledgeNodes[activeKnowledgeNode].topics.map((t, idx) => (
                      <span key={idx} className="text-xs font-mono bg-white/5 border border-border px-3 py-1.5 rounded-xl text-white/90">
                        ✓ {t}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Signature 6: Live Leaderboard Hall of Fame Podium */}
      <section className="relative z-10 py-24 px-4 sm:px-8 border-t border-border bg-card/40">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Global Coder <span className="text-gradient">Hall of Fame</span>
            </h2>
            <p className="text-sm text-white/50 mt-2">Compete with top student engineers across all university departments.</p>
          </div>

          <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <GlassCard className="order-2 md:order-1 text-center py-8 border-border/80">
              <div className="w-16 h-16 rounded-full bg-card border border-border/50 mx-auto mb-3 flex items-center justify-center font-bold text-xl text-purple-300">
                #2
              </div>
              <h4 className="font-bold text-lg text-white">Sarah Chen</h4>
              <p className="text-xs text-white/50 font-mono">15,450 XP</p>
            </GlassCard>

            <GlassCard className="order-1 md:order-2 text-center py-10 border-amber-400/50 bg-amber-500/5">
              <Trophy className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <div className="w-20 h-20 rounded-full bg-amber-500/20 mx-auto mb-3 flex items-center justify-center font-extrabold text-2xl text-amber-300 border-2 border-amber-400">
                #1
              </div>
              <h4 className="font-extrabold text-xl text-white">Alex Rivera</h4>
              <p className="text-sm text-amber-300 font-mono font-bold">18,920 XP</p>
            </GlassCard>

            <GlassCard className="order-3 text-center py-8 border-border/80">
              <div className="w-16 h-16 rounded-full bg-card border border-border/50 mx-auto mb-3 flex items-center justify-center font-bold text-xl text-primary/80">
                #3
              </div>
              <h4 className="font-bold text-lg text-white">Devin Vance</h4>
              <p className="text-xs text-white/50 font-mono">12,800 XP</p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Editorial Faculty & Leadership Statement */}
      <section className="relative z-10 py-24 px-4 sm:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-10 border border-border/80 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0">
              <BookOpen className="w-10 h-10" />
            </div>
            <div className="space-y-3">
              <p className="text-base text-white/90 italic leading-relaxed">
                "Our mission is to foster continuous problem-solving, structured algorithmic thinking, and modern software engineering craftsmanship. The JNTUH UCEJ Coding Club empowers students to build verifiable technical identities."
              </p>
              <div>
                <h4 className="font-bold text-white text-base">Dr. Alex Rivera</h4>
                <p className="text-xs font-mono text-primary">Head of Computer Science & AI Innovation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grand Call to Action */}
      <section className="relative z-10 py-24 px-4 sm:px-8 text-center">
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-12 border border-border/50 shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Ready to Begin Your <span className="text-gradient">Engineering Journey</span>?
          </h2>
          <p className="text-white/70 text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Create your free student developer profile, practice Judge0 problems, and earn verifiable credentials.
          </p>
          <Link href="/signup">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Create Free Student Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Refined Architectural Footer */}
      <Footer />
    </div>
  );
}

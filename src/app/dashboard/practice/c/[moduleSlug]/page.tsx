"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, BookOpen, Terminal, Flag, Clock, CheckCircle, Play, Code } from "lucide-react";
import { useParams } from "next/navigation";

// Mock data
const moduleData = {
  title: "Introduction & Basics",
  description: "Variables, Data Types, and Basic I/O",
  progress: 25,
  concepts: [
    { id: "c-history", title: "History & Structure of C", time: "10 min", status: "Completed" },
    { id: "variables", title: "Variables & Data Types", time: "15 min", status: "In Progress" },
    { id: "io", title: "Input & Output (printf, scanf)", time: "20 min", status: "Not Started" },
    { id: "operators", title: "Basic Operators", time: "15 min", status: "Not Started" },
  ],
  labs: [
    { id: "hello-world", title: "Hello, World!", difficulty: "Easy", tags: ["Basics"], status: "Completed" },
    { id: "calculator", title: "Simple Calculator", difficulty: "Medium", tags: ["Variables", "Operators"], status: "Not Started" },
    { id: "temperature", title: "Temperature Converter", difficulty: "Easy", tags: ["I/O", "Math"], status: "Not Started" },
  ],
  checkpoint: {
    id: "basics-mastery",
    title: "Module 1 Mastery: The Registration System",
    description: "Build a complete student registration console app using basic types, variables, and I/O.",
    time: "45 min",
    status: "Locked"
  }
};

export default function ModulePage() {
  const params = useParams();
  const slug = params.moduleSlug as string;

  const statusColors = {
    "Completed": "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    "In Progress": "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    "Not Started": "text-zinc-500 bg-zinc-800/50 border-zinc-700/50",
    "Locked": "text-zinc-600 bg-zinc-900/50 border-zinc-800"
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6 md:p-12 font-sans selection:bg-cyan-500/30 pb-24">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Breadcrumbs & Header */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 text-sm text-zinc-500">
            <Link href="/dashboard/practice" className="hover:text-white transition-colors">Practice</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/dashboard/practice/c" className="hover:text-white transition-colors">C Programming</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-zinc-300">{moduleData.title}</span>
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
              {moduleData.title}
            </h1>
            <p className="text-lg text-zinc-400">
              {moduleData.description}
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-zinc-400">Module Progress</span>
              <span className="text-sm font-bold text-cyan-400">{moduleData.progress}%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-cyan-500 h-2.5 rounded-full" 
                style={{ width: `${moduleData.progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Section 1: LEARN */}
        <section id="learn" className="space-y-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
              <BookOpen className="w-5 h-5 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold">Learn</h2>
          </div>
          
          <div className="space-y-3">
            {moduleData.concepts.map((concept, idx) => (
              <div key={concept.id} className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 flex items-center justify-between hover:border-zinc-700 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="text-zinc-600 font-medium w-6 text-center">{idx + 1}</div>
                  <div>
                    <h3 className="font-medium text-white mb-1">{concept.title}</h3>
                    <div className="flex items-center space-x-3 text-xs">
                      <span className="flex items-center text-zinc-500"><Clock className="w-3.5 h-3.5 mr-1" /> {concept.time}</span>
                      <span className={`px-2 py-0.5 rounded-full border ${statusColors[concept.status as keyof typeof statusColors]}`}>
                        {concept.status}
                      </span>
                    </div>
                  </div>
                </div>
                <Link href={`/dashboard/practice/c/${slug}/${concept.id}`}>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-sm font-medium rounded-lg transition-colors">
                    {concept.status === "Completed" ? (
                      <><span className="text-zinc-300">Review</span> <CheckCircle className="w-4 h-4 text-emerald-400" /></>
                    ) : (
                      <><span className="text-white">Continue</span> <Play className="w-4 h-4 text-zinc-400" /></>
                    )}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: PRACTICE LABS */}
        <section id="labs" className="space-y-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <Terminal className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold">Practice Labs</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {moduleData.labs.map((lab) => (
              <div key={lab.id} className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 hover:border-purple-500/30 transition-all group flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800/80 flex items-center justify-center border border-zinc-700/50">
                    <Code className="w-5 h-5 text-zinc-400 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[lab.status as keyof typeof statusColors]}`}>
                    {lab.status}
                  </span>
                </div>
                
                <h3 className="font-bold text-white mb-2">{lab.title}</h3>
                
                <div className="flex flex-wrap gap-2 mb-6 mt-auto pt-4">
                  <span className={`text-xs px-2 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/50 ${
                    lab.difficulty === 'Easy' ? 'text-emerald-400' : lab.difficulty === 'Medium' ? 'text-amber-400' : 'text-red-400'
                  }`}>
                    {lab.difficulty}
                  </span>
                  {lab.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-md bg-zinc-800/50 text-zinc-400 border border-zinc-800">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link href={`/dashboard/practice/c/${slug}/lab/${lab.id}`} className="w-full">
                  <button className="w-full py-2.5 bg-zinc-800 group-hover:bg-purple-600/20 group-hover:text-purple-300 text-zinc-300 text-sm font-medium rounded-lg transition-colors border border-transparent group-hover:border-purple-500/30 flex items-center justify-center space-x-2">
                    <span>{lab.status === 'Completed' ? 'Retry Lab' : 'Solve Lab'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: MODULE CHECKPOINT */}
        <section id="checkpoint" className="space-y-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
              <Flag className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold">Module Checkpoint</h2>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-amber-500/20 p-8 md:p-10">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />
            
            <div className="relative z-10 md:w-2/3">
              <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs px-3 py-1 rounded-full mb-6 font-medium">
                <Flag className="w-3.5 h-3.5" />
                <span>MASTERY ASSIGNMENT</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {moduleData.checkpoint.title}
              </h3>
              
              <p className="text-zinc-400 mb-8 max-w-lg leading-relaxed">
                {moduleData.checkpoint.description}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link href={`/dashboard/practice/c/${slug}/assignment`} className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 py-3 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold rounded-xl transition-colors flex items-center justify-center space-x-2">
                    <span>Start Checkpoint</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </Link>
                <div className="flex items-center text-sm text-zinc-500 font-medium">
                  <Clock className="w-4 h-4 mr-1.5" /> {moduleData.checkpoint.time} estimated
                </div>
              </div>
            </div>
            
            {/* Visual element on the right (hidden on mobile) */}
            <div className="hidden md:flex absolute right-12 top-1/2 -translate-y-1/2 w-48 h-48 border-[16px] border-amber-500/10 rounded-full items-center justify-center">
              <div className="w-32 h-32 border-8 border-amber-500/20 rounded-full flex items-center justify-center">
                <Flag className="w-12 h-12 text-amber-500/40" />
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

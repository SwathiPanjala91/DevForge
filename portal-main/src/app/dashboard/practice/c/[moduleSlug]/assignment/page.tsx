"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function AssignmentShellPage({ params }: { params: { moduleSlug: string } }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0d14] text-gray-200 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href={`/dashboard/practice/c/${params.moduleSlug}`} className="text-sm text-blue-400 hover:text-blue-300 transition-colors mb-4 inline-block">
            ← Back to Module
          </Link>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4 flex items-center gap-3">
             <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">Mastery Assignment</span>
          </h1>
          <p className="text-xl text-gray-400">Validate your knowledge of {params.moduleSlug} in C.</p>
        </div>

        {!isSubmitted ? (
          /* Assignment Overview */
          <div className="bg-[#121520] rounded-2xl border border-gray-800 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            
            <div className="p-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div className="bg-[#1a1e2c] p-6 rounded-xl border border-gray-700/50 flex flex-col items-center justify-center text-center">
                  <div className="text-4xl mb-2">📝</div>
                  <div className="text-2xl font-bold text-white mb-1">12</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Questions</div>
                </div>
                <div className="bg-[#1a1e2c] p-6 rounded-xl border border-gray-700/50 flex flex-col items-center justify-center text-center">
                  <div className="text-4xl mb-2">💻</div>
                  <div className="text-2xl font-bold text-white mb-1">2</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Coding Tasks</div>
                </div>
                <div className="bg-[#1a1e2c] p-6 rounded-xl border border-gray-700/50 flex flex-col items-center justify-center text-center">
                  <div className="text-4xl mb-2">⏱️</div>
                  <div className="text-2xl font-bold text-white mb-1">20</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Minutes</div>
                </div>
              </div>

              <div className="space-y-6 text-gray-300 mb-10">
                <h3 className="text-xl font-semibold text-white">Instructions</h3>
                <ul className="list-disc list-inside space-y-3 ml-2">
                  <li>This assignment covers all concepts learned in this module.</li>
                  <li>You must score at least 80% to earn the Mastery Badge.</li>
                  <li>Coding tasks are evaluated based on correctness and edge cases.</li>
                  <li>Ensure you have a stable connection before starting.</li>
                </ul>
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={() => setIsSubmitted(true)}
                  className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-lg shadow-lg shadow-blue-900/30 transition-all transform hover:scale-105"
                >
                  Start Assessment
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Mock Results State */
          <div className="bg-[#121520] rounded-2xl border border-gray-800 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-500 relative">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
            <div className="p-12 flex flex-col items-center text-center">
              
              <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>

              <h2 className="text-5xl font-black text-white mb-2 tracking-tight">PASSED</h2>
              <div className="text-2xl text-green-400 font-bold mb-8">Score: 87%</div>

              <div className="w-full max-w-2xl bg-[#0b0d14] rounded-xl p-6 mb-10 border border-gray-800 grid grid-cols-3 gap-4">
                 <div className="text-center">
                   <div className="text-gray-400 text-sm mb-1 uppercase tracking-wider font-semibold">Concepts</div>
                   <div className="text-2xl font-bold text-white">92%</div>
                 </div>
                 <div className="text-center border-l border-r border-gray-800">
                   <div className="text-gray-400 text-sm mb-1 uppercase tracking-wider font-semibold">Labs</div>
                   <div className="text-2xl font-bold text-white">100%</div>
                 </div>
                 <div className="text-center">
                   <div className="text-gray-400 text-sm mb-1 uppercase tracking-wider font-semibold">Assignment</div>
                   <div className="text-2xl font-bold text-white">87%</div>
                 </div>
              </div>

              <div className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/30 rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden group mt-4">
                 <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🛡️</div>
                 <div className="text-amber-400 font-bold tracking-widest uppercase text-sm mb-1">Skill Forged</div>
                 <div className="text-2xl font-extrabold text-white">C • {params.moduleSlug}</div>
              </div>

              <div className="mt-12 flex gap-4">
                <button onClick={() => setIsSubmitted(false)} className="px-6 py-2 bg-[#1a1e2c] hover:bg-[#23293b] text-white rounded transition-colors border border-gray-700">
                  Retake
                </button>
                <Link href="/dashboard" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded transition-colors shadow-lg shadow-blue-900/20">
                  Continue Journey
                </Link>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

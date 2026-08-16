"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function LabShellPage({ params }: { params: Promise<{ moduleSlug: string, labId: string }> | { moduleSlug: string, labId: string } }) {
  const resolvedParams = React.use(params as any) as { moduleSlug: string, labId: string };
  const moduleSlug = resolvedParams?.moduleSlug || "";
  const labId = resolvedParams?.labId || "";
  const [labState, setLabState] = useState<'idle' | 'running' | 'submitted'>('idle');

  return (
    <div className="min-h-screen bg-[#090a0f] text-gray-300 flex flex-col font-sans h-screen">
      {/* Top Navigation Bar */}
      <header className="h-14 bg-[#11131c] border-b border-gray-800 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4 text-sm">
          <Link href={`/dashboard/practice/c/${moduleSlug}`} className="text-gray-400 hover:text-white transition-colors">
            ← Back to Module
          </Link>
          <span className="text-gray-600">|</span>
          <span className="font-semibold text-white">Lab: {labId}</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-1.5 bg-[#1e2330] hover:bg-[#2a3142] text-white rounded text-sm transition-colors border border-gray-700">
            Reset
          </button>
          {labState === 'idle' && (
            <button 
              onClick={() => setLabState('running')}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-sm font-medium transition-colors shadow-lg shadow-blue-900/20"
            >
              Start Lab
            </button>
          )}
          {labState === 'running' && (
            <button 
              onClick={() => setLabState('submitted')}
              className="px-4 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded text-sm font-medium transition-colors shadow-lg shadow-green-900/20"
            >
              Submit Code
            </button>
          )}
           {labState === 'submitted' && (
            <button 
              className="px-4 py-1.5 bg-gray-700 text-gray-300 cursor-not-allowed rounded text-sm font-medium transition-colors"
              disabled
            >
              Submitted
            </button>
          )}
        </div>
      </header>

      {/* Main Split Layout */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Pane - Instructions */}
        <div className="w-1/3 min-w-[350px] bg-[#0d0f17] border-r border-gray-800 flex flex-col overflow-y-auto custom-scrollbar">
          <div className="p-6 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-orange-900/30 text-orange-400 border border-orange-800">Medium</span>
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-900/30 text-blue-400 border border-blue-800">Arrays</span>
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-purple-900/30 text-purple-400 border border-purple-800">Pointers</span>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Array Manipulation</h1>
            </div>

            <section className="space-y-2">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Objective</h2>
              <p className="text-gray-300 leading-relaxed">
                Implement a function that reverses an array in-place using pointers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Instructions</h2>
              <ul className="list-decimal list-inside space-y-2 text-gray-300">
                <li>Initialize two pointers, one at the start and one at the end of the array.</li>
                <li>Swap the elements they point to.</li>
                <li>Move the pointers towards the center.</li>
                <li>Stop when the pointers cross.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Example</h2>
              <div className="bg-[#141722] p-3 rounded border border-gray-800 font-mono text-sm">
                <div className="text-gray-400">Input:</div>
                <div className="text-green-400 mb-2">[1, 2, 3, 4, 5]</div>
                <div className="text-gray-400">Output:</div>
                <div className="text-green-400">[5, 4, 3, 2, 1]</div>
              </div>
            </section>
          </div>
        </div>

        {/* Right Pane - Editor & Output */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#161923]">
          {/* Editor Area */}
          <div className="flex-1 flex flex-col min-h-[50%]">
            <div className="h-10 bg-[#1a1e2a] flex items-center px-4 border-b border-gray-800 gap-2 shrink-0">
               <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
               <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
               <span className="ml-2 text-xs font-mono text-gray-500">main.c</span>
            </div>
            <div className="flex-1 relative">
              {/* Pseudo Editor */}
              <textarea 
                className="absolute inset-0 w-full h-full bg-[#0f111a] text-gray-300 font-mono p-4 resize-none outline-none focus:ring-1 focus:ring-blue-500/50"
                spellCheck={false}
                defaultValue={`#include <stdio.h>\n\nvoid reverseArray(int *arr, int size) {\n    // TODO: Implement this function\n    \n}\n\nint main() {\n    int arr[] = {1, 2, 3, 4, 5};\n    int size = sizeof(arr) / sizeof(arr[0]);\n    \n    reverseArray(arr, size);\n    \n    return 0;\n}`}
              />
            </div>
          </div>

          {/* Resize Handle (Visual Only) */}
          <div className="h-1 bg-gray-800 cursor-row-resize hover:bg-blue-500/50 transition-colors"></div>

          {/* Output / Trace Area */}
          <div className="h-64 bg-[#0a0c13] flex flex-col shrink-0">
            <div className="h-10 bg-[#11131c] flex items-center px-4 border-b border-gray-800 gap-4 text-xs font-medium text-gray-400 shrink-0">
              <button className="text-white border-b-2 border-blue-500 py-2.5">Terminal</button>
              <button className="hover:text-gray-200 py-2.5 transition-colors">Execution Trace</button>
            </div>
            <div className="flex-1 p-4 font-mono text-sm overflow-y-auto">
              {labState === 'idle' && <div className="text-gray-600 italic">Click "Start Lab" to begin...</div>}
              {labState === 'running' && (
                <div>
                   <span className="text-green-500">$</span> gcc main.c -o main<br/>
                   <span className="text-green-500">$</span> ./main<br/>
                   <span className="text-gray-400">Waiting for changes...</span>
                </div>
              )}
              {labState === 'submitted' && (
                 <div>
                   <span className="text-green-500">$</span> Running tests...<br/>
                   <span className="text-blue-400">Test 1: Passed</span><br/>
                   <span className="text-blue-400">Test 2: Passed</span><br/>
                   <span className="text-green-400 font-bold mt-2 inline-block">All tests passed successfully!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

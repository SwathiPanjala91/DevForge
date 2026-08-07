import React from 'react';
import Link from 'next/link';

export default function ConceptViewerPage({ params }: { params: { moduleSlug: string, conceptId: string } }) {
  return (
    <div className="min-h-screen bg-[#0f111a] text-gray-300 p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-4 flex items-center space-x-2">
          <Link href="/dashboard" className="hover:text-blue-400 transition-colors">Dashboard</Link>
          <span>/</span>
          <Link href="/dashboard/practice" className="hover:text-blue-400 transition-colors">Practice</Link>
          <span>/</span>
          <Link href={`/dashboard/practice/c/${params.moduleSlug}`} className="hover:text-blue-400 transition-colors">C</Link>
          <span>/</span>
          <span className="text-gray-300">{params.conceptId}</span>
        </nav>

        {/* Title */}
        <header className="border-b border-gray-800 pb-6">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Understanding {params.conceptId} in C</h1>
          <p className="text-lg text-gray-400">Master the fundamentals and build a strong foundation.</p>
        </header>

        {/* Introduction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Introduction</h2>
          <p className="leading-relaxed">
            This module introduces the core concepts of {params.conceptId}. Understanding this is crucial for writing efficient and robust C programs.
            Here we will explore the theory, syntax, and practical applications.
          </p>
        </section>

        {/* Syntax block */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Syntax</h2>
          <div className="bg-[#1a1d27] rounded-lg p-4 border border-gray-800 shadow-inner overflow-x-auto">
            <pre className="text-sm font-mono text-green-400">
              <code>
{`// Basic syntax structure
type name = value;`}
              </code>
            </pre>
          </div>
        </section>

        {/* Visual Flow */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Visual Flow</h2>
          <div className="bg-[#161923] p-6 rounded-lg border border-gray-800 flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <div className="inline-block bg-blue-900/30 text-blue-400 border border-blue-800 px-4 py-2 rounded mb-2">Start</div>
              <div className="text-gray-600 mb-2">↓</div>
              <div className="inline-block bg-purple-900/30 text-purple-400 border border-purple-800 px-4 py-2 rounded mb-2">Process</div>
              <div className="text-gray-600 mb-2">↓</div>
              <div className="inline-block bg-green-900/30 text-green-400 border border-green-800 px-4 py-2 rounded">End</div>
            </div>
          </div>
        </section>

        {/* Examples */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Examples</h2>
          <div className="bg-[#1a1d27] rounded-lg p-4 border border-gray-800 shadow-inner overflow-x-auto">
            <pre className="text-sm font-mono text-blue-300">
              <code>
{`#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`}
              </code>
            </pre>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="space-y-4 bg-red-900/10 border border-red-900/30 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-400 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Common Mistakes
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300 ml-2">
            <li>Forgetting to include necessary headers.</li>
            <li>Off-by-one errors in loops.</li>
            <li>Memory leaks from un-freed allocations.</li>
          </ul>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-800">
          <button className="px-6 py-2 bg-[#1a1d27] hover:bg-[#252a38] text-white rounded-md border border-gray-700 transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Previous
          </button>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-lg shadow-blue-900/20 transition-colors flex items-center gap-2">
            Next
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

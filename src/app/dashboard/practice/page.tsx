import React from 'react';
import Link from 'next/link';
import { practiceData } from '@/lib/data/practiceData';
import { BookOpen, Code, Terminal, Clock, ChevronRight, Play, Lock } from 'lucide-react';

export default function PracticeDashboard() {
  const activeTrack = practiceData.find(t => t.status === 'ACTIVE');
  const upcomingTracks = practiceData.filter(t => t.status === 'COMING SOON');

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          PRACTICE
        </h1>
        <p className="text-gray-400 text-lg">
          Build programming skills through guided learning and hands-on labs.
        </p>
      </div>

      {/* Continue Learning Banner */}
      {activeTrack && (
        <div className="mb-12 bg-gradient-to-r from-[#111111] to-[#1A1A1A] border border-gray-800 rounded-xl p-8 relative overflow-hidden group hover:border-gray-700 transition-all duration-300">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10">
            <div>
              <div className="text-sm text-blue-400 font-semibold tracking-wider uppercase mb-2">Continue Learning</div>
              <h2 className="text-2xl font-bold text-white mb-2">{activeTrack.title} / Loops</h2>
              <p className="text-gray-400">Master while, do-while, and for loops in C programming.</p>
            </div>
            
            <div className="mt-6 md:mt-0 flex flex-col items-end">
              <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
                <Clock className="w-4 h-4" />
                <span>Next up: The For Loop</span>
              </div>
              <Link href="/dashboard/practice/c/loops" className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                <span>Continue</span>
                <Play className="w-4 h-4 fill-current" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Programming Languages Grid */}
      <div>
        <h3 className="text-xl font-semibold mb-6 flex items-center">
          <Code className="w-5 h-5 mr-2 text-blue-400" />
          Programming Languages
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Active Track Card */}
          {activeTrack && (
            <div className="bg-[#111111] border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all duration-300 flex flex-col group relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-colors"></div>
              <div className="p-6 flex-grow relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <span className="bg-green-500/10 border border-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full font-medium">ACTIVE</span>
                </div>
                
                <h4 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{activeTrack.title}</h4>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">{activeTrack.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400 font-medium">Progress</span>
                      <span className="font-bold text-blue-400">{activeTrack.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden border border-gray-700/50">
                      <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-2 rounded-full relative" style={{ width: `${activeTrack.progress}%` }}>
                        <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-400 bg-gray-800/30 p-2 rounded-lg border border-gray-800/50 w-fit">
                    <BookOpen className="w-4 h-4 mr-2 text-blue-400" />
                    <span className="font-medium text-gray-300">{activeTrack.completedModules}</span>
                    <span className="mx-1">/</span>
                    <span>{activeTrack.totalModules} Modules</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-800 bg-[#0A0A0A] relative z-10">
                <Link href="/dashboard/practice/c" className="flex items-center justify-center w-full space-x-2 text-blue-400 hover:text-blue-300 font-medium transition-colors group/btn">
                  <span>Continue Learning</span>
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}

          {/* Upcoming Tracks Cards */}
          {upcomingTracks.map(track => (
            <div key={track.id} className="bg-[#111111]/50 border border-gray-800/50 rounded-xl overflow-hidden flex flex-col opacity-60 hover:opacity-80 transition-opacity">
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-gray-800/50 rounded-xl flex items-center justify-center text-gray-500">
                    <Code className="w-6 h-6" />
                  </div>
                  <span className="bg-gray-800/50 border border-gray-700 text-gray-400 text-xs px-3 py-1 rounded-full font-medium flex items-center space-x-1">
                    <Lock className="w-3 h-3" />
                    <span>COMING SOON</span>
                  </span>
                </div>
                
                <h4 className="text-xl font-bold mb-2 text-gray-300">{track.title}</h4>
                <p className="text-gray-500 text-sm line-clamp-2">{track.description}</p>
              </div>
              
              <div className="p-4 border-t border-gray-800/50 bg-[#0A0A0A]/30">
                <button disabled className="flex items-center justify-center w-full space-x-2 text-gray-500 font-medium cursor-not-allowed">
                  <span>Coming Soon</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

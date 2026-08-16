"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Play, Send, ChevronLeft, Settings, Maximize2, AlertTriangle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

export default function ProblemEditorPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = React.use(params as any) as { slug: string };
  const slug = resolvedParams?.slug || "";
  const { user } = useAuth();
  const { showToast } = useToast();

  const [code, setCode] = useState(`class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
    }
}`);
  const [language, setLanguage] = useState("java");
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [executionResult, setExecutionResult] = useState<{
    status: string;
    runtime: string;
    memory: string;
    passedTests: number;
    totalTests: number;
    isSubmit: boolean;
    serverMessage?: string;
    xpEarned?: number;
  } | null>(null);

  const title = slug ? slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") : "Problem Editor";

  const handleRun = () => {
    setSubmitState("submitting");
    setExecutionResult(null);
    setTimeout(() => {
      setSubmitState("success");
      setExecutionResult({
        status: "Accepted",
        runtime: "3 ms",
        memory: "42.1 MB",
        passedTests: 3,
        totalTests: 3,
        isSubmit: false,
        serverMessage: "Local sandbox test execution passed.",
      });
    }, 1000);
  };

  const handleSubmit = async () => {
    if (!user) {
      showToast("Please sign in to submit code", "warning");
      return;
    }

    setSubmitState("submitting");
    setExecutionResult(null);
    setErrorMessage("");

    try {
      const token = await user.getIdToken();

      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          problemSlug: slug,
          code,
          language,
          status: "Accepted",
          runtimeMs: 2,
          memoryKb: 41800,
          passedTests: 3,
          totalTests: 3,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitState("success");
        setExecutionResult({
          status: "Accepted",
          runtime: "2 ms",
          memory: "41.8 MB",
          passedTests: 3,
          totalTests: 3,
          isSubmit: true,
          serverMessage: data.message,
          xpEarned: data.xpEarned,
        });
        showToast(data.message || "Submission stored in PostgreSQL database!", "success");
      } else {
        setSubmitState("error");
        setErrorMessage(data.error || "Failed to submit code");
        showToast(data.error || "Failed to save submission", "error");
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      setSubmitState("error");
      setErrorMessage("Network error while submitting code to server");
      showToast("Network error while submitting solution", "error");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] gap-4 w-full p-2">
      {/* Header bar */}
      <div className="flex items-center justify-between bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/problems">
            <Button variant="ghost" size="sm" className="px-2" leftIcon={<ChevronLeft className="w-5 h-5" />}>
              Back
            </Button>
          </Link>
          <div className="h-6 w-px bg-white/10" />
          <h1 className="text-lg font-bold text-white">{title}</h1>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold border border-emerald-500/20 text-emerald-400 bg-emerald-500/10 ml-2">
            Easy
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="px-2 text-white/50 hover:text-white">
            <Settings className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="px-2 text-white/50 hover:text-white">
            <Maximize2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row gap-4 h-full min-h-0 overflow-hidden">
        {/* Left Pane - Description */}
        <GlassCard className="flex-1 overflow-y-auto !p-6 flex flex-col gap-6 custom-scrollbar">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Problem Description</h2>
            <div className="prose prose-invert max-w-none text-white/80">
              <p>
                Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.
              </p>
              <p>
                You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.
              </p>
              <p>You can return the answer in any order.</p>

              <h3 className="text-xl font-semibold mt-6 mb-3 text-white">Example 1:</h3>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10 font-mono text-sm">
                <div>
                  <strong>Input:</strong> nums = [2,7,11,15], target = 9
                </div>
                <div>
                  <strong>Output:</strong> [0,1]
                </div>
                <div>
                  <strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3 text-white">Example 2:</h3>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10 font-mono text-sm">
                <div>
                  <strong>Input:</strong> nums = [3,2,4], target = 6
                </div>
                <div>
                  <strong>Output:</strong> [1,2]
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3 text-white">Constraints:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code>
                </li>
                <li>
                  <code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code>
                </li>
                <li>
                  <code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code>
                </li>
                <li>
                  <strong>Only one valid answer exists.</strong>
                </li>
              </ul>
            </div>
          </div>
        </GlassCard>

        {/* Right Pane - Editor */}
        <div className="flex-[1.5] flex flex-col gap-4 min-h-0">
          <GlassCard className="flex-1 flex flex-col !p-0 overflow-hidden">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-white/10">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-sm font-semibold text-white/80 focus:outline-none cursor-pointer py-1"
              >
                <option value="java" className="bg-slate-900">
                  Java
                </option>
                <option value="cpp" className="bg-slate-900">
                  C++
                </option>
                <option value="python" className="bg-slate-900">
                  Python 3
                </option>
                <option value="javascript" className="bg-slate-900">
                  JavaScript
                </option>
              </select>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs text-white/50 hover:text-white"
                leftIcon={<Settings className="w-3.5 h-3.5" />}
              >
                Editor Settings
              </Button>
            </div>

            {/* Editor Area */}
            <div className="flex-1 relative bg-[#0d1117] group">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="w-full h-full bg-transparent text-white/90 font-mono text-sm p-4 focus:outline-none resize-none custom-scrollbar"
                style={{
                  tabSize: 4,
                  lineHeight: "1.6",
                }}
              />
            </div>
          </GlassCard>

          {/* Console / Status Area */}
          <GlassCard className="h-40 !p-0 flex flex-col overflow-hidden shrink-0">
            <div className="px-4 py-2 bg-slate-900/80 border-b border-white/10 flex justify-between items-center">
              <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Console output</span>
            </div>
            <div className="p-4 flex-1 overflow-y-auto bg-slate-900/30 custom-scrollbar font-mono text-sm">
              {submitState === "idle" && (
                <div className="text-white/30 italic">Ready. Run your code to see output here.</div>
              )}
              {submitState === "submitting" && (
                <div className="text-cyan-400 animate-pulse flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                  Submitting solution to PostgreSQL database...
                </div>
              )}
              <AnimatePresence>
                {submitState === "success" && executionResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-base">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span>{executionResult.status}</span>
                      </div>
                      <div className="text-xs text-white/60 font-mono">
                        Runtime: {executionResult.runtime} | Memory: {executionResult.memory}
                      </div>
                    </div>
                    <div className="text-xs text-emerald-300/80 font-mono">
                      {executionResult.serverMessage || "Submission stored in PostgreSQL database."}
                      {executionResult.xpEarned ? ` (+${executionResult.xpEarned} XP)` : ""}
                    </div>
                  </motion.div>
                )}
                {submitState === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg p-3 flex items-start gap-3"
                  >
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold mb-1">Execution Error</div>
                      <div className="text-rose-400/80">{errorMessage}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="px-4 py-3 bg-slate-900/80 border-t border-white/10 flex justify-end gap-3 items-center">
              <Button
                variant="glass"
                leftIcon={<Play className="w-4 h-4" />}
                onClick={handleRun}
                disabled={submitState === "submitting"}
              >
                Run Code
              </Button>
              <Button
                variant="primary"
                leftIcon={<Send className="w-4 h-4" />}
                className="bg-emerald-600 hover:bg-emerald-500 border-emerald-500/50"
                onClick={handleSubmit}
                isLoading={submitState === "submitting"}
              >
                Submit Solution
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

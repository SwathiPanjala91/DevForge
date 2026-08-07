"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { EngineeringBranch, AcademicYear } from "@/types";
import { Sparkles, Code2, Globe, GraduationCap, ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function OnboardingPage() {
  const router = useRouter();
  const { completeOnboarding } = useAuth();
  const { showToast } = useToast();

  const [rollNumber, setRollNumber] = useState("");
  const [branch, setBranch] = useState<EngineeringBranch>("IT");
  const [year, setYear] = useState<AcademicYear>("3rd Year");
  const [section, setSection] = useState("A");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("React, TypeScript, Python, C++, DSA");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [leetcodeUrl, setLeetcodeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rollNumber) {
      showToast("Please enter your JNTUH UCEJ Roll Number", "warning");
      return;
    }
    setIsLoading(true);
    try {
      const skillsArray = skills.split(",").map((s) => s.trim()).filter(Boolean);
      await completeOnboarding({
        rollNumber: rollNumber.toUpperCase(),
        branch,
        year,
        section,
        department: `Department of ${branch}`,
        bio,
        skills: skillsArray,
        githubUrl,
        linkedinUrl,
        leetcodeUrl,
      });
      showToast("JNTUH UCEJ Student Profile Verified! +150 Bonus XP awarded!", "achievement");
      router.push("/dashboard");
    } catch (err: any) {
      showToast(err.message || "Failed to save college profile details", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl"
      >
        <GlassCard className="border border-primary/30 shadow-2xl p-8">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center border border-primary">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white">JNTUH UCEJ Student Profile Verification</h2>
              <p className="text-xs text-white/50 font-mono">Verify college credentials & initialize XP engine (+150 XP)</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="JNTUH UCEJ Roll Number"
                placeholder="22281A1201"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                required
                leftIcon={<GraduationCap className="w-4 h-4 text-primary" />}
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white/70">Engineering Branch</label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value as EngineeringBranch)}
                  className="bg-card/80 border border-border rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                >
                  <option value="IT">IT — Information Technology</option>
                  <option value="CSE">CSE — Computer Science & Engineering</option>
                  <option value="ECE">ECE — Electronics & Comm. Engg.</option>
                  <option value="EEE">EEE — Electrical & Electronics Engg.</option>
                  <option value="MECH">MECH — Mechanical Engineering</option>
                  <option value="CIVIL">CIVIL — Civil Engineering</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white/70">Academic Year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value as AcademicYear)}
                  className="bg-card/80 border border-border rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                >
                  <option value="1st Year">1st Year (Freshman)</option>
                  <option value="2nd Year">2nd Year (Sophomore)</option>
                  <option value="3rd Year">3rd Year (Junior)</option>
                  <option value="4th Year">4th Year (Senior)</option>
                </select>
              </div>

              <Input
                label="Section"
                placeholder="Section A / B"
                value={section}
                onChange={(e) => setSection(e.target.value)}
              />
            </div>

            <Textarea
              label="Developer Bio"
              placeholder="Passionate IT student interested in competitive programming, full-stack Next.js 15, and AI agents..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />

            <Input
              label="Technical Skills (Comma Separated)"
              placeholder="React, TypeScript, Python, PyTorch, C++, DSA"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <Input
                label="GitHub Profile"
                placeholder="https://github.com/user"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                leftIcon={<Code2 className="w-4 h-4 text-primary" />}
              />

              <Input
                label="LinkedIn Profile"
                placeholder="https://linkedin.com/in/user"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                leftIcon={<Globe className="w-4 h-4 text-primary" />}
              />

              <Input
                label="LeetCode Profile"
                placeholder="https://leetcode.com/user"
                value={leetcodeUrl}
                onChange={(e) => setLeetcodeUrl(e.target.value)}
                leftIcon={<Code2 className="w-4 h-4 text-amber-400" />}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="mt-4 w-full"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Verify Profile & Enter Student Dashboard
            </Button>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { GlassCard } from "@/components/ui/GlassCard";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Settings, User, Mail, Shield, Bell } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function SettingsPage() {
  const { profile } = useAuth();
  const { showToast } = useToast();
  const [name, setName] = useState(profile?.name || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock save
    setTimeout(() => {
      showToast("Settings updated successfully!", "success");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 flex items-center gap-3">
          <Settings className="w-10 h-10 text-primary" />
          Account <span className="text-gradient">Settings</span>
        </h1>
        <p className="text-white/60">Manage your profile preferences and security.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-2">
          <button className="w-full text-left px-4 py-2 bg-primary/10 text-primary rounded-lg font-semibold flex items-center gap-2">
            <User className="w-4 h-4" /> Profile
          </button>
          <button className="w-full text-left px-4 py-2 text-white/50 hover:bg-white/5 rounded-lg flex items-center gap-2 transition-colors">
            <Shield className="w-4 h-4" /> Security
          </button>
          <button className="w-full text-left px-4 py-2 text-white/50 hover:bg-white/5 rounded-lg flex items-center gap-2 transition-colors">
            <Bell className="w-4 h-4" /> Notifications
          </button>
        </div>

        <div className="md:col-span-3">
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
            <form onSubmit={handleSave} className="space-y-6">
              <Input 
                label="Display Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                leftIcon={<User className="w-4 h-4 text-white/50" />}
              />
              <Input 
                label="Email Address (Read Only)"
                value={profile?.email || ""}
                disabled
                leftIcon={<Mail className="w-4 h-4 text-white/50" />}
              />
              <div className="pt-4 border-t border-white/10 flex justify-end">
                <Button type="submit" variant="primary" isLoading={loading}>
                  Save Changes
                </Button>
              </div>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

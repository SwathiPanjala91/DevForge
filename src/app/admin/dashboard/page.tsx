"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Glass } from "@/components/ui/Glass";

export default function AdminDashboardPage() {
  const { profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && profile?.role !== "super_admin" && profile?.role !== "club_admin") {
      router.push("/dashboard");
    }
  }, [profile, loading, router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-6">
        <Glass className="p-8">
          <h2 className="text-xl font-semibold mb-4">Student Management</h2>
          <p className="text-white/60">View and manage student accounts, XP, and activity.</p>
        </Glass>
        <Glass className="p-8">
          <h2 className="text-xl font-semibold mb-4">Problem Management</h2>
          <p className="text-white/60">CRUD operations for coding problems.</p>
        </Glass>
      </div>
    </div>
  );
}

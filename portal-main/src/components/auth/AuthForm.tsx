"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export const AuthForm = ({ type }: { type: "login" | "signup" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { loginWithGoogle, signUp, login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (type === "signup") {
        await signUp(email, password, name);
      } else {
        await login(email, password);
      }
      router.push("/dashboard");
    } catch (error) {
      console.error("Auth error:", error);
      alert("Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {type === "signup" && (
        <Input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
      )}
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Processing..." : (type === "login" ? "Login" : "Sign Up")}
      </Button>
      
      <div className="text-center text-white/50 my-2">or</div>
      
      <Button type="button" variant="outline" className="w-full" onClick={async () => {
        setLoading(true);
        await loginWithGoogle();
        router.push("/dashboard");
      }}>
        Continue with Google
      </Button>
    </form>
  );
};

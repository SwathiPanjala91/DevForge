"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Bot, Send, Sparkles, Code, Cpu, Lightbulb, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  codeSnippet?: string;
  timestamp: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      sender: "ai",
      text: "Greetings! I am your AI Code Architect & Mentor. How can I assist your coding journey today?",
      timestamp: "Just now",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    { label: "Optimize Two Sum to O(N)", prompt: "How can I optimize Two Sum using a Hash Map?" },
    { label: "Debug Recursion Memory Limit", prompt: "Why is my recursive DFS causing StackOverflow?" },
    { label: "Recommend Next DSA Topic", prompt: "Based on my level 12 progress, what should I study next?" },
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let replyText = "Here is the optimal approach and solution explanation:";
      let codeSnippet: string | undefined = undefined;

      if (query.toLowerCase().includes("two sum") || query.toLowerCase().includes("hash map")) {
        replyText = "Using a Hash Map (Object/Map in JS) allows you to check for complement values in O(1) time complexity, reducing overall time complexity from O(N²) to O(N).";
        codeSnippet = `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const diff = target - nums[i];\n    if (map.has(diff)) return [map.get(diff), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}`;
      } else if (query.toLowerCase().includes("recursion") || query.toLowerCase().includes("overflow")) {
        replyText = "StackOverflow errors occur when recursion depth exceeds call stack limits. Ensure your base case is reachable, or memoize calls to prevent repeated execution.";
      } else {
        replyText = "Great question! I recommend practicing Graph Algorithms (BFS/DFS) next and trying the Cyber LRU Cache challenge to boost your XP points!";
      }

      const aiMsg: Message = {
        id: Math.random().toString(),
        sender: "ai",
        text: replyText,
        codeSnippet,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Code Assistant & Mentor" maxWidth="2xl">
      <div className="flex flex-col h-[520px]">
        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-2 border-b border-border no-scrollbar">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p.prompt)}
              className="text-xs bg-white/5 hover:bg-primary/20 text-cyan-300 hover:text-cyan-200 border border-primary/20 rounded-full px-3 py-1 whitespace-nowrap transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-primary" />
              {p.label}
            </button>
          ))}
        </div>

        {/* Chat Messages Window */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.sender === "ai" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-cyan-500/20">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                  m.sender === "user"
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-none shadow-lg"
                    : "glass border border-primary/20 text-white/90 rounded-tl-none"
                }`}
              >
                <p>{m.text}</p>
                {m.codeSnippet && (
                  <div className="mt-3 bg-card/80 rounded-xl p-3 border border-border font-mono text-xs overflow-x-auto text-cyan-300">
                    <pre>{m.codeSnippet}</pre>
                  </div>
                )}
                <span className="text-[10px] text-white/50 block mt-2 text-right">{m.timestamp}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-primary text-xs font-mono animate-pulse">
              <Bot className="w-4 h-4" />
              <span>AI is generating response...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="pt-3 mt-2 border-t border-border flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask AI anything about code, hints, or debugging..."
            leftIcon={<Sparkles className="w-4 h-4 text-primary" />}
          />
          <Button variant="primary" onClick={() => handleSend()} className="px-4 shrink-0">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Modal>
  );
};

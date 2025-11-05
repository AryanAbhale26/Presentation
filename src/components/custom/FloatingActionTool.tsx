import React, { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";

type FloatingActionToolProps = {
  position: { x: number; y: number } | null;
  onClose: () => void;
  loading: boolean;
  handleAiChange: (value: string) => void;
};

const FloatingActionTool = ({
  position,
  onClose,
  loading,
  handleAiChange,
}: FloatingActionToolProps) => {
  const [input, setInput] = useState("");

  if (!position) return null;

  return (
    <div
      className="fixed z-[9999] bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 shadow-2xl flex flex-col gap-2 w-64 animate-fadeIn"
      style={{
        top: position.y + 8,
        left: position.x,
        transform: "translateX(-50%)",
      }}
    >
      {/* Pointer */}
      <div className="absolute h-3 w-3 bg-zinc-900 border-l border-t border-zinc-700 rotate-45 -top-1 left-1/2 -translate-x-1/2"></div>

      <div className="flex items-start gap-2 bg-black border border-zinc-700 rounded-md px-2 py-1.5">
        <Sparkles size={16} className="text-purple-400 flex-shrink-0 mt-0.5" />
        <textarea
          value={input}
          placeholder="Ask AI to change..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && input.trim()) {
              e.preventDefault();
              handleAiChange(input);
              setInput("");
            }
          }}
          rows={2}
          className="bg-transparent text-white text-sm outline-none flex-1 placeholder:text-zinc-500 resize-none scrollbar-hide"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            if (!input.trim()) return;
            handleAiChange(input);
            setInput("");
          }}
          disabled={!input.trim()}
          className="text-xs bg-white text-black px-2 py-1.5 rounded-md hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
        >
          <ArrowRight size={14} />
        </button>

        <button
          onClick={onClose}
          className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1.5 rounded-md hover:bg-zinc-700 transition-colors"
        >
          ✕
        </button>
      </div>

      {loading && (
        <div className="flex items-center gap-2">
          <Sparkles size={12} className="text-purple-400 animate-pulse" />
          <span className="text-xs text-zinc-400">AI editing...</span>
        </div>
      )}
    </div>
  );
};

export default FloatingActionTool;

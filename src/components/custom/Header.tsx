import React from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import "./Hero.css";

const GetStarted = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden bg-black text-white">
      {/* 🌌 Animated Gradient Background */}
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-r from-violet-700 via-indigo-700 to-purple-800 opacity-30 bg-[length:400%_400%]" />

      {/* 🦄 Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 mt-32 space-y-6 max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
          From Idea to Presentation in One Click ⚡
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
          Generate sleek, editable PPT decks in minutes. AI handles slide
          design, formatting, and visuals — so you can focus on your message,
          impress your audience, and work smarter, not harder.
        </p>

        <div className="flex gap-4 mt-4">
          <Button className="cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 font-semibold shadow-md flex items-center gap-2 transition-all duration-300">
            <Play className="w-4 h-4 text-white" /> Watch Demo
          </Button>
          <Button className="cursor-pointer bg-white text-black font-semibold hover:bg-gray-200 shadow-md transition-all duration-300">
            Get Started
          </Button>
        </div>
      </section>

      {/* 🌙 Footer */}
      <footer className="w-full py-6 mt-16 text-center text-gray-400 text-sm border-t border-gray-800">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">AIPresentify</span>. All
          rights reserved.
        </p>
        <div className="flex justify-center gap-6 mt-2">
          <a href="#" className="hover:text-white transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition">
            Terms of Service
          </a>
          <a href="#" className="hover:text-white transition">
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
};

export default GetStarted;

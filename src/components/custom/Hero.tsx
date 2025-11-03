import React from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import "./Hero.css";
const GetStarted = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden">
      {/* 🔮 Animated Gradient Background */}
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 bg-[length:400%_400%]" />

      {/* 🦄 Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 mt-32 space-y-6 max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
          From Idea to Presentation in One Click ⚡
        </h1>
        <p className="text-xl text-gray-200 leading-relaxed max-w-2xl">
          Generate sleek, editable PPT decks in minutes. AI handles slide
          design, formatting, and visuals — so you can focus on your message,
          impress your audience, and work smarter, not harder.
        </p>

        <div className="flex gap-4 mt-4">
          <Button className="cursor-pointer bg-white text-black hover:bg-gray-100 font-semibold shadow-md flex items-center gap-2">
            <Play className="w-4 h-4 text-black" /> Watch Demo
          </Button>
          <Button className="cursor-pointer bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-md">
            Get Started
          </Button>
        </div>
      </section>

      {/* 🌙 Footer */}
      <footer className="w-full py-6 mt-16 text-center text-gray-200 text-sm border-t border-white/10">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">AIPresentify</span>. All rights
          reserved.
        </p>
        <div className="flex justify-center gap-6 mt-2 text-gray-300">
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

import React from "react";
import professionalBanner from "../../assets/professional.jpg";
import modernGradientBanner from "../../assets/modern-gradient.jpg";
import pastelBanner from "../../assets/pastel-ppt.jpg";
import techBanner from "../../assets/tech.jpg";
import darkBanner from "../../assets/dark.jpg";
import minimalBanner from "../../assets/Minimalist-White.jpg";
import aiBanner from "../../assets/ai.png";
import pptBanner from "../../assets/ppt.png";

export const DesignStyles = [
  {
    styleName: "Professional Blue 💼",
    colors: {
      primary: "#0A66C2",
      secondary: "#1C1C1C",
      accent: "#E8F0FE",
      background: "#FFFFFF",
      gradient: "linear-gradient(135deg, #0A66C2, #E8F0FE)",
    },
    designGuide:
      "🧠 Create a professional corporate-style presentation with blue and white tones, modern sans-serif fonts, clean layout, and minimal icons. Use subtle gradients and geometric backgrounds for a trustworthy business feel.",
    icon: "Briefcase",
    bannerImage: professionalBanner,
  },
  {
    styleName: "Minimal White ⚪",
    colors: {
      primary: "#1C1C1C",
      secondary: "#AAAAAA",
      accent: "#EDEDED",
      background: "#FFFFFF",
      gradient: "linear-gradient(135deg, #FFFFFF, #EDEDED)",
    },
    designGuide:
      "🧠 Generate a minimalist slide deck with white backgrounds, black text, and light grey accents. Keep layouts clean, use lots of whitespace, and apply simple typography for a calm, elegant aesthetic.",
    icon: "Square",
    bannerImage: minimalBanner,
  },
  {
    styleName: "Modern Gradient 🌈",
    colors: {
      primary: "#8A2BE2",
      secondary: "#00C9FF",
      accent: "#92FE9D",
      background: "#FFFFFF",
      gradient: "linear-gradient(135deg, #8A2BE2, #00C9FF, #92FE9D)",
    },
    designGuide:
      "🧠 Design a modern gradient-style PPT with vibrant gradient backgrounds, glassmorphism overlays, and smooth transitions. Use modern typography and bright gradients for an innovative, tech-savvy vibe.",
    icon: "Sparkles",
    bannerImage: modernGradientBanner,
  },
  {
    styleName: "Elegant Dark 🖤",
    colors: {
      primary: "#0D0D0D",
      secondary: "#1F1F1F",
      accent: "#FFD700",
      background: "#0D0D0D",
      gradient: "linear-gradient(135deg, #0D0D0D, #1F1F1F)",
    },
    designGuide:
      "🧠 Create a luxury-style dark presentation with black and gold accents, serif fonts, and subtle lighting effects. Keep it premium, cinematic, and elegant.",
    icon: "Star",
    bannerImage: darkBanner,
  },
  {
    styleName: "Creative Pastel 🎨",
    colors: {
      primary: "#F6D6FF",
      secondary: "#A0E7E5",
      accent: "#B4F8C8",
      background: "#FFFFFF",
      gradient: "linear-gradient(135deg, #F6D6FF, #A0E7E5, #B4F8C8)",
    },
    designGuide:
      "🧠 Build a creative pastel-style presentation with soft tones, rounded shapes, and hand-drawn illustrations. Ideal for design portfolios or fun workshops.",
    icon: "Palette",
    bannerImage: pastelBanner,
  },

  {
    styleName: "Futuristic Neon ⚡",
    colors: {
      primary: "#00FFFF",
      secondary: "#FF00FF",
      accent: "#0A0A0A",
      background: "#1A1A1A",
      gradient: "linear-gradient(135deg, #00FFFF, #FF00FF)",
    },
    designGuide:
      "🧠 Generate a futuristic neon-style PPT with glowing text, cyberpunk colors, and dark glass backgrounds. Use modern sans-serif fonts and motion-inspired visuals.",
    icon: "Zap",
    bannerImage: techBanner,
  },
];

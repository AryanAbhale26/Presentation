import { Button } from "../ui/button";
import { Play } from "lucide-react";
import vid from "../../assets/bg.mp4";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <section className="relative flex flex-col justify-between min-h-screen overflow-hidden text-white">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={vid}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disableRemotePlayback
        onCanPlay={(e) => e.currentTarget.play().catch(() => {})}
        onContextMenu={(e) => e.preventDefault()}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow text-center mt-20 px-4 sm:px-6 md:px-8 space-y-6 max-w-5xl mx-auto">
        <h2 className="font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight drop-shadow-lg">
          From Idea to Presentation in One Click ⚡
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed drop-shadow-md max-w-2xl">
          Generate sleek, editable PPT decks in minutes. AI handles slide
          design, formatting, and visual content so you can focus on your
          message, impress your audience, and work smarter — not harder.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
          {/* Watch Demo Button */}
          <a
            href="https://drive.google.com/file/d/1T4GgPth2w3eYvGR9zJHFvbX8BBWiYlwx/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="cursor-pointer flex items-center justify-center gap-2 text-sm sm:text-base bg-white text-black hover:bg-gray-100 font-semibold shadow-md">
              <Play className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
              Watch Demo
            </Button>
          </a>

          {/* Auth Buttons */}
          {user ? (
            <Button
              onClick={() => navigate("/workspace")}
              className="cursor-pointer text-sm sm:text-base bg-white text-black hover:bg-gray-100 font-semibold shadow-md"
            >
              Go to Workspace
            </Button>
          ) : (
            <SignInButton mode="modal">
              <Button className="cursor-pointer text-sm sm:text-base bg-white text-black hover:bg-gray-100 font-semibold shadow-md">
                Get Started
              </Button>
            </SignInButton>
          )}
        </div>
      </div>

      {/* Sticky Footer */}
      <footer className="relative z-10 w-full bg-black/40 backdrop-blur-md border-t border-white/10 text-center py-6 mt-auto">
        <p className="text-gray-300 text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">Sparta</span>. All rights
          reserved.
        </p>

        <div className="flex justify-center gap-6 mt-3 text-gray-400 text-sm">
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
    </section>
  );
};

export default Hero;

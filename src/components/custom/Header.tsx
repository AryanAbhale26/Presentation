import React from "react";
import logo from "../../assets/ai.png";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser, UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between w-full px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-b from-black to-[#0a0a0a] sticky top-0 z-50 border-b border-white/10">
      <div className="flex items-center gap-3">
        <img src={logo} alt="logo" className="h-10 w-10 sm:h-12 sm:w-12" />
        <h1 className="text-lg sm:text-xl font-semibold text-white tracking-wide">
          AIPresentify
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {!isSignedIn ? (
          <SignInButton mode="modal">
            <Button className="text-sm sm:text-base px-4 sm:px-6 bg-white text-black hover:bg-gray-200 font-semibold shadow-md">
              Sign In
            </Button>
          </SignInButton>
        ) : (
          <>
            <Button
              onClick={() => navigate("/workspace")}
              className="text-sm sm:text-base px-4 sm:px-6 bg-white text-black hover:bg-gray-200 font-semibold shadow-md"
            >
              Go to Workspace
            </Button>

            <div className="flex items-center justify-center">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox:
                      "w-10 h-10 border border-white/20 rounded-full hover:ring-2 hover:ring-white/30 transition",
                  },
                }}
              />
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

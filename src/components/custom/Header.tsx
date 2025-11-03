import React, { useContext } from "react";
import logo from "../../assets/ai.png";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser, UserButton } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react"; // clean diamond-style icon
import { UserDetailContext } from "@/config/context/UserDetailContex";

const Header = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { userDetails } = useContext(UserDetailContext);

  const credits = userDetails?.credits ?? 0;
  const isWorkspacePage = location.pathname.startsWith("/workspace");

  return (
    <header className="flex items-center justify-between w-full px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-b from-black to-[#0a0a0a] sticky top-0 z-50 border-b border-white/10">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="logo"
          className="h-10 w-10 sm:h-12 sm:w-12 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <h1 className="text-2xl sm:text-xl font-semibold text-white tracking-wide">
          Sparta
        </h1>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {!isSignedIn ? (
          <SignInButton mode="modal">
            <Button className="text-sm sm:text-base px-4 sm:px-6 bg-white text-black hover:bg-gray-200 font-semibold shadow-md">
              Sign In
            </Button>
          </SignInButton>
        ) : (
          <>
            {/* Show button when NOT on /workspace */}
            {!isWorkspacePage ? (
              <Button
                onClick={() => navigate("/workspace")}
                className="text-sm sm:text-base px-4 sm:px-6 bg-white text-black hover:bg-gray-200 font-semibold shadow-md cursor-pointer"
              >
                Go to Workspace
              </Button>
            ) : (
              // On workspace → Show credits + user icon
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                  <Sparkles size={18} className="text-yellow-400" />
                  <span className="text-white text-sm font-medium">
                    {credits} Credits
                  </span>
                </div>

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
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

import React, { useContext } from "react";
import logo from "../../assets/ai.png";
import { Button } from "../ui/button";
import { SignInButton, useUser, UserButton, useAuth } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { UserDetailContext } from "../../config/context/UserDetailContex";

const Header = () => {
  const { has } = useAuth();
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { userDetails } = useContext(UserDetailContext);
  const hasPremisumAccess = has && has({ plan: "pro_user" });
  console.log(hasPremisumAccess);
  const credits = userDetails?.credits ?? 0;
  const isWorkspacePage = location.pathname.startsWith("/workspace");
  const isAuthPage =
    location.pathname.startsWith("/sign-in") ||
    location.pathname.startsWith("/sign-up");

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

      {/* Right side */}
      <div className="flex items-center gap-4">
        {!isSignedIn ? (
          <>
            {!isAuthPage && (
              <Button
                className="text-sm sm:text-base px-4 sm:px-6 bg-white/10 text-white hover:bg-white/20 font-semibold shadow-sm"
                onClick={() => {}}
              >
                Pricing
              </Button>
            )}

            <SignInButton mode="modal">
              <Button className="text-sm sm:text-base px-4 sm:px-6 bg-white text-black hover:bg-gray-200 font-semibold shadow-md">
                Sign In
              </Button>
            </SignInButton>
          </>
        ) : (
          <>
            {/* ✅ Logged in & INSIDE Workspace */}
            {isWorkspacePage && (
              <div className="flex items-center gap-4">
                {/* Workspace Button ALWAYS show */}
                <Button
                  onClick={() => navigate("/workspace")}
                  className="text-sm sm:text-base px-4 sm:px-6 bg-white text-black hover:bg-gray-200 font-semibold shadow-md cursor-pointer"
                >
                  Workspace
                </Button>

                {/* Pricing (disabled now) */}
                <Button
                  className="text-sm sm:text-base px-4 sm:px-6 bg-white/10 text-white hover:bg-white/20 font-semibold shadow-sm"
                  onClick={() => navigate("/workspace/pricing")}
                >
                  Pricing
                </Button>

                {/* Credits */}

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

            {!isWorkspacePage && (
              <>
                <Button
                  className="text-sm sm:text-base px-4 sm:px-6 bg-white/10 text-white hover:bg-white/20 font-semibold shadow-sm"
                  onClick={() => navigate("/workspace/pricing")}
                >
                  Pricing
                </Button>

                <Button
                  onClick={() => navigate("/workspace")}
                  className="text-sm sm:text-base px-4 sm:px-6 bg-white text-black hover:bg-gray-200 font-semibold shadow-md cursor-pointer"
                >
                  Go to Workspace
                </Button>

                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-10 h-10 border border-white/20 rounded-full hover:ring-2 hover:ring-white/30 transition",
                    },
                  }}
                />
              </>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

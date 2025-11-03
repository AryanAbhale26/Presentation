import { useUser, SignInButton } from "@clerk/clerk-react";
import React from "react";
import { Outlet } from "react-router-dom";

const Workspace = () => {
  const { user } = useUser();

  // If not logged in — show a centered sign-in prompt
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center px-4">
        <h1 className="text-3xl font-bold mb-4">You’re not signed in</h1>
        <p className="text-gray-400 mb-6">
          Please sign in to access your workspace and projects.
        </p>

        <SignInButton mode="modal">
          <button className="bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-200 transition">
            Sign In
          </button>
        </SignInButton>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Workspace</h1>
      <Outlet />
    </div>
  );
};

export default Workspace;

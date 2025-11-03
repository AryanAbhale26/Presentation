import Header from "../components/custom/Header";
import PromptBox from "../components/custom/PromptBox";
import { UserDetailContext } from "../config/context/UserDetailContex";
import { firebaseDb } from "../config/FirebaseConfig";
import { useUser, SignInButton } from "@clerk/clerk-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const Workspace = () => {
  const { user } = useUser();
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const location = useLocation();

  useEffect(() => {
    user && CreateNewUser();
  }, [user]);

  const CreateNewUser = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    const email = user.primaryEmailAddress.emailAddress;
    const docRef = doc(firebaseDb, "users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserDetails(docSnap.data());
    } else {
      // Create new user document
      const data = {
        fullName: user.fullName,
        email: email,
        createdAt: new Date(),
        credits: 2,
      };
      await setDoc(docRef, {
        ...data,
      });
      setUserDetails(data);
      console.log("New user ");
    }
  };

  // Run when user logs in
  useEffect(() => {
    if (user) {
      CreateNewUser();
    }
  }, [user]);

  // If not logged in — show sign-in prompt
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

  // If logged in — show workspace
  return (
    <>
      <Header />
      <div className="min-h-screen bg-black text-white flex flex-col items-center ">
        {location.pathname === "/workspace" && <PromptBox />}
        <Outlet />
      </div>
    </>
  );
};

export default Workspace;

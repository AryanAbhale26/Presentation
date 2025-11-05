import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Workspace from "./workspace/temp.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { UserDetailContext } from "./config/context/UserDetailContex.tsx";
import Outline from "./workspace/project/outline/temp.tsx";
import Editor from "./workspace/project/editor/temp.tsx";
import Pricing from "./workspace/Pricing/temp.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "/workspace",
    element: <Workspace />,
    children: [
      { path: "project/:projectId/outline", element: <Outline /> },
      { path: "project/:projectId/editor", element: <Editor /> },
      { path: "pricing", element: <Pricing /> },
    ],
  },
]);

function Root() {
  const [userDetails, setUserDetails] = useState();
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
        <RouterProvider router={router} />
      </UserDetailContext.Provider>
    </ClerkProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);

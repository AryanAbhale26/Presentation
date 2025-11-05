import { useState } from "react";
import { Loader2Icon, Send } from "lucide-react";
import MyProject from "./MyProject";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { firebaseDb } from "../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const PromptBox = () => {
  const [userInput, setUserInput] = useState("");
  const [numSlides, setNumSlides] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const opt = [5, 8, 10, 12, 15, 16, 20];
  const createSaveProj = async () => {
    //Save Proj to database
    const projectId = uuidv4();
    setLoading(true);
    await setDoc(doc(firebaseDb, "project", projectId), {
      projectId: projectId,
      userInputPrompt: userInput,
      noOfSlider: numSlides,
      createdBy: user?.primaryEmailAddress?.emailAddress,

      createdAt: Date.now(),
    });
    setLoading(false);
    navigate("/workspace/project/" + projectId + "/outline");
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto">
        {/* Prompt Section */}
        <div className="bg-zinc-900 rounded-2xl p-12 mb-8 border border-zinc-800">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-2">
              Describe your topic, we'll design the slides!
            </h2>
            <p className="text-zinc-400 text-sm">
              Your design will be saved as new project!
            </p>
          </div>

          {/* Input Box */}
          <div className="bg-black border border-zinc-700 rounded-xl p-4 relative">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter your topic here..."
              className="w-full bg-transparent text-white outline-none placeholder-zinc-500 py-2 resize-none hide-scrollbar"
              rows={1}
              style={{
                minHeight: "2.5rem",
                maxHeight: "12rem",
                overflow: "hidden",
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                const newHeight = Math.min(target.scrollHeight, 192);
                target.style.height = newHeight + "px";
              }}
            />

            {/* Bottom Controls */}
            <div className="flex items-center justify-between mt-2 pt-3 border-t border-zinc-800">
              <select
                value={numSlides}
                onChange={(e) => setNumSlides(e.target.value)}
                className="bg-transparent border border-zinc-700 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-zinc-500 text-zinc-400"
              >
                <option value="" className="bg-zinc-900">
                  No. of Slides
                </option>
                {opt.map((ele, i) => {
                  return (
                    <option value={ele} key={i} className="bg-zinc-900">
                      {ele}
                    </option>
                  );
                })}
              </select>

              <button
                onClick={createSaveProj}
                className="bg-white text-black rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-zinc-200 transition-colors cursor-pointer"
                disabled={!userInput}
              >
                {loading ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* My Project Section */}

        <MyProject />
      </div>
    </div>
  );
};

export default PromptBox;

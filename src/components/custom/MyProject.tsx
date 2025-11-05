import React, { useEffect, useState } from "react";
import { Folder } from "lucide-react";
import type { Project } from "../../workspace/project/outline/Index";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firebaseDb } from "../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-react";
import PPTicon from "../../assets/ppt.png";
import { Link } from "react-router-dom";

const MyProject = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) GetProjects();
  }, [user]);

  const GetProjects = async () => {
    try {
      const q = query(
        collection(firebaseDb, "project"),
        where("createdBy", "==", user?.primaryEmailAddress?.emailAddress)
      );

      const querySnapShot = await getDocs(q);

      const projList: Project[] = [];
      querySnapShot.forEach((doc) => {
        projList.push({ ...(doc.data() as Project), projectId: doc.id });
      });

      setProjects(projList);
    } catch (err) {
      console.error("Error fetching projects: ", err);
    }
  };

  return (
    <div className="bg-black min-h-screen p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">My Project</h3>
        <button className="border border-zinc-700 rounded-lg px-4 py-2 text-sm hover:bg-zinc-900 transition-colors text-white">
          + Create New PPT
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-zinc-900 rounded-2xl p-6 mb-4">
            <Folder size={48} className="text-white" />
          </div>
          <h4 className="text-lg font-semibold text-white mb-2">
            No Projects Yet
          </h4>
          <p className="text-zinc-500 text-sm mb-6 max-w-xs">
            You haven't created any projects yet.
            <br />
            Get started by creating your first project.
          </p>
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors font-medium">
            Create Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <Link
              key={index}
              to={`/workspace/project/${project.projectId}/editor`}
            >
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 aspect-[4/3] hover:border-zinc-600 transition-all cursor-pointer flex flex-col items-center justify-center hover:scale-[1.03]">
                <img
                  src={PPTicon}
                  alt="ppt"
                  className="w-14 h-14 sm:w-20 sm:h-20 mb-3 object-contain"
                />

                <p className="text-white text-sm text-center font-medium truncate w-full">
                  {project.userInputPrompt || "Untitled Project"}
                </p>

                <p className="text-xs text-zinc-500 mt-1">
                  {project.createdAt
                    ? new Date(project.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProject;

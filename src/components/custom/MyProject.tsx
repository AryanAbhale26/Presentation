import React, { useState } from "react";
import { Folder } from "lucide-react";

const MyProject = () => {
  const [projects, setProjects] = useState([]);

  return (
    <div className="bg-black min-h-screen p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">My Project</h3>
        <button className="border border-zinc-700 rounded-lg px-4 py-2 text-sm hover:bg-zinc-900 transition-colors text-white">
          + Create New PPT
        </button>
      </div>

      {/* Project Cards or Empty State */}
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
          <div className="flex gap-3">
            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors font-medium">
              Create Project
            </button>
            <button className="border border-zinc-700 hover:bg-zinc-800 text-white px-6 py-2 rounded-lg transition-colors">
              Import Project
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-zinc-800 rounded-xl aspect-square hover:border-zinc-600 transition-colors cursor-pointer"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProject;

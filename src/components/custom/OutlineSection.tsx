import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Edit, X } from "lucide-react";
import type { outLine } from "../../workspace/project/outline/temp";

type Props = {
  loading: boolean;
  outline: outLine[] | null;
  onUpdate?: (index: number, updatedOutline: outLine) => void;
};

const OutlineSection = ({ loading, outline, onUpdate }: Props) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editSlideNo, setEditSlideNo] = useState("");
  const [editSlidePoint, setEditSlidePoint] = useState("");
  const [editOutline, setEditOutline] = useState("");

  const handleEdit = (index: number, item: outLine) => {
    setEditingIndex(index);
    setEditSlideNo(item.slideNo);
    setEditSlidePoint(item.slidePoint);
    setEditOutline(item.outline);
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    if (editingIndex !== null && onUpdate) {
      onUpdate(editingIndex, {
        slideNo: editSlideNo,
        slidePoint: editSlidePoint,
        outline: editOutline,
      });
    }
    handleCancel();
  };

  const handleCancel = () => {
    setShowEditModal(false);
    setEditingIndex(null);
  };

  return (
    <div className="mt-10 text-white relative">
      <h2 className="font-bold text-2xl mb-5">Slide Outline</h2>

      {/* Skeleton when loading */}
      {loading ? (
        <div className={`space-y-3 ${showEditModal ? "blur-sm" : ""}`}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="flex flex-col gap-2 bg-zinc-900 border border-zinc-800 rounded-lg p-4"
            >
              <Skeleton className="h-3 w-full bg-zinc-800 rounded-md" />
              <Skeleton className="h-3 w-4/5 bg-zinc-800 rounded-md" />
            </div>
          ))}
        </div>
      ) : outline && outline.length > 0 ? (
        <div className={`space-y-3 ${showEditModal ? "blur-sm" : ""}`}>
          {outline.map((item, index) => (
            <div
              key={index}
              className="flex items-start justify-between bg-zinc-900 border border-zinc-800 rounded-lg p-5 hover:border-zinc-700 transition group"
            >
              <div className="flex gap-5 flex-1 items-center">
                <div className="bg-gray-600 p-3 py-2 rounded">
                  {" "}
                  <span className="font-bold text-white text-lg flex-shrink-0 min-w-[32px] ">
                    {item.slideNo}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-2 text-lg">
                    {item.slidePoint}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {item.outline}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleEdit(index, item)}
                className="flex-shrink-0 ml-6 p-2 hover:bg-zinc-800 rounded transition-colors"
                disabled={showEditModal}
              >
                <Edit size={20} className="text-zinc-500 hover:text-white" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-400 text-center mt-4">
          No outlines generated yet.
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-xl mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Edit Slide Content</h2>
              <button
                onClick={handleCancel}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-zinc-400 mb-2 block">
                  Slide Title
                </label>
                <input
                  type="text"
                  value={editSlidePoint}
                  onChange={(e) => setEditSlidePoint(e.target.value)}
                  className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white outline-none focus:border-zinc-500"
                />
              </div>

              {/* Outline Textarea */}
              <div>
                <label className="text-sm text-zinc-400 mb-2 block">
                  Outline
                </label>
                <textarea
                  value={editOutline}
                  onChange={(e) => setEditOutline(e.target.value)}
                  rows={8}
                  className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white outline-none focus:border-zinc-500 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end pt-4">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 border border-zinc-700 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-6 py-2 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition-colors"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutlineSection;

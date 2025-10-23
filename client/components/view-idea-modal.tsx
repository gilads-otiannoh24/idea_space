"use client";

import { X, Edit2, Trash2, ArrowLeft } from "lucide-react";
import type { Idea } from "../types/idea";
import { getCategoryColor, getStatusColor } from "../lib/colors";

interface ViewIdeaModalProps {
  idea: Idea;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ViewIdeaModal({
  idea,
  onClose,
  onEdit,
  onDelete,
}: ViewIdeaModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-300 transition-colors"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
          >
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Title */}
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-magenta-400 mb-2">
              {idea.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span>{idea.createdDate.toLocaleDateString()}</span>
              <span>•</span>
              <span>ID: {idea.id}</span>
            </div>
          </div>

          {/* Status and Category */}
          <div className="flex flex-wrap gap-3">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                idea.status
              )}`}
            >
              {idea.status.charAt(0).toUpperCase() + idea.status.slice(1)}
            </span>
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${getCategoryColor(
                idea.category
              )}`}
            >
              {idea.category}
            </span>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-slate-300 mb-3">
              Description
            </h2>
            <p className="text-slate-400 leading-relaxed text-base whitespace-pre-wrap">
              {idea.description}
            </p>
          </div>

          {/* Tags */}
          {idea.tags.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-slate-300 mb-3">
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {idea.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-sm bg-slate-800/50 text-slate-300 border border-slate-700/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t border-slate-700/50">
            <button
              onClick={onEdit}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 font-medium transition-colors"
            >
              <Edit2 size={20} />
              Edit
            </button>
            <button
              onClick={onDelete}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 font-medium transition-colors"
            >
              <Trash2 size={20} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

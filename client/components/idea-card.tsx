"use client";

import { useState } from "react";
import { Trash2, Edit2, Eye } from "lucide-react";
import type { Idea } from "../types/idea";
import { getCategoryColor, getStatusColor } from "../lib/colors";

interface IdeaCardProps {
  idea: Idea;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function IdeaCard({ idea, onSelect, onEdit, onDelete }: IdeaCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative h-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
    >
      {/* Glowing border effect */}
      <div
        className={`absolute inset-0 rounded-xl bg-linear-to-r from-cyan-500/20 via-magenta-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`}
      />

      {/* Card */}
      <div className="relative h-full p-6 rounded-xl bg-slate-900/50 backdrop-blur-md border border-slate-700/50 group-hover:border-cyan-500/50 transition-all duration-300 flex flex-col">
        {/* Status Badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
              idea.status
            )}`}
          >
            {idea.status.charAt(0).toUpperCase() + idea.status.slice(1)}
          </span>
          <span className="text-xs text-slate-500">
            {idea.createdDate.toLocaleDateString()}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors">
          {idea.title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-sm mb-4 line-clamp-3 grow">
          {idea.description}
        </p>

        {/* Category and Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(
              idea.category
            )}`}
          >
            {idea.category}
          </span>
          {idea.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded text-xs bg-slate-800/50 text-slate-300 border border-slate-700/50"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons - Show on hover */}
        <div
          className={`flex gap-2 pt-4 border-t border-slate-700/50 transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-sm font-medium transition-colors"
          >
            <Eye size={16} />
            View
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 text-sm font-medium transition-colors"
          >
            <Edit2 size={16} />
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-sm font-medium transition-colors"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

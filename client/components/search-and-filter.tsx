"use client";

import { Search, Plus } from "lucide-react";

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  categories: string[];
  onAddClick: () => void;
}

export function SearchAndFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  onAddClick,
}: SearchAndFilterProps) {
  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          size={20}
        />
        <input
          type="text"
          placeholder="Search ideas by title or description..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-900/50 backdrop-blur-md border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
        />
      </div>

      {/* Filter Chips and Add Button */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === null
              ? "bg-cyan-500/30 text-cyan-300 border border-cyan-500/50"
              : "bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-slate-600/50"
          }`}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              onCategoryChange(selectedCategory === category ? null : category)
            }
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? "bg-magenta-500/30 text-magenta-300 border border-magenta-500/50"
                : "bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-slate-600/50"
            }`}
          >
            {category}
          </button>
        ))}

        <div className="grow" />

        <button
          onClick={onAddClick}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-cyan-500 to-magenta-500 hover:from-cyan-400 hover:to-magenta-400 text-white font-medium transition-all hover:shadow-lg hover:shadow-cyan-500/50"
        >
          <Plus size={20} />
          New Idea
        </button>
      </div>
    </div>
  );
}

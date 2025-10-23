"use client";

import { useState } from "react";
import { IdeasGrid } from "../components/ideas-grid";
import { IdeaModal } from "../components/idea-modal";
import { ViewIdeaModal } from "../components/view-idea-modal";
import { SearchAndFilter } from "../components/search-and-filter";
import type { Idea } from "../types/idea";

const MOCK_IDEAS: Idea[] = [
  {
    id: "1",
    title: "AI-Powered Code Review System",
    description:
      "Automated code review tool that uses machine learning to identify bugs, security vulnerabilities, and suggest optimizations.",
    category: "AI/ML",
    tags: ["automation", "code-quality", "machine-learning"],
    status: "in-progress",
    createdDate: new Date("2025-01-15"),
  },
  {
    id: "2",
    title: "Real-time Collaboration Platform",
    description:
      "Web-based platform for real-time collaborative engineering with live code editing, video conferencing, and shared whiteboards.",
    category: "Web",
    tags: ["collaboration", "real-time", "web"],
    status: "ideation",
    createdDate: new Date("2025-01-10"),
  },
  {
    id: "3",
    title: "IoT Sensor Network Dashboard",
    description:
      "Comprehensive dashboard for monitoring and managing distributed IoT sensors with predictive analytics and alerts.",
    category: "IoT",
    tags: ["iot", "monitoring", "analytics"],
    status: "completed",
    createdDate: new Date("2025-01-05"),
  },
  {
    id: "4",
    title: "Quantum Algorithm Simulator",
    description:
      "Educational simulator for quantum computing algorithms with visual representation and step-by-step execution.",
    category: "Research",
    tags: ["quantum", "education", "simulation"],
    status: "ideation",
    createdDate: new Date("2024-12-28"),
  },
  {
    id: "5",
    title: "Autonomous Drone Fleet Manager",
    description:
      "System for coordinating and managing multiple autonomous drones with collision avoidance and mission planning.",
    category: "Robotics",
    tags: ["robotics", "autonomous", "coordination"],
    status: "in-progress",
    createdDate: new Date("2024-12-20"),
  },
];

export default function Home() {
  const [ideas, setIdeas] = useState<Idea[]>(MOCK_IDEAS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [editingIdea, setEditingIdea] = useState<Idea | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredIdeas = ideas.filter((idea) => {
    const matchesSearch =
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || idea.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddIdea = (newIdea: Omit<Idea, "id" | "createdDate">) => {
    const idea: Idea = {
      ...newIdea,
      id: Date.now().toString(),
      createdDate: new Date(),
    };
    setIdeas([idea, ...ideas]);
    setIsAddModalOpen(false);
  };

  const handleUpdateIdea = (updatedIdea: Idea) => {
    setIdeas(
      ideas.map((idea) => (idea.id === updatedIdea.id ? updatedIdea : idea))
    );
    setEditingIdea(null);
    setSelectedIdea(updatedIdea);
  };

  const handleDeleteIdea = (id: string) => {
    setIdeas(ideas.filter((idea) => idea.id !== id));
    setSelectedIdea(null);
  };

  const categories = Array.from(new Set(ideas.map((idea) => idea.category)));

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-magenta-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-magenta-400 to-orange-400 mb-2">
            Engineering Ideas Lab
          </h1>
          <p className="text-slate-400 text-lg">
            Capture, organize, and develop your innovative project concepts
          </p>
        </div>

        {/* Search and Filter */}
        <SearchAndFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
          onAddClick={() => setIsAddModalOpen(true)}
        />

        {/* Ideas Grid */}
        <IdeasGrid
          ideas={filteredIdeas}
          onSelectIdea={setSelectedIdea}
          onEditIdea={(idea) => {
            setEditingIdea(idea);
            setIsAddModalOpen(true);
          }}
          onDeleteIdea={handleDeleteIdea}
        />

        {/* Empty State */}
        {filteredIdeas.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">
              No ideas found. Create one to get started!
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      <IdeaModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingIdea(null);
        }}
        // @ts-ignore
        onSubmit={editingIdea ? handleUpdateIdea : handleAddIdea}
        initialIdea={editingIdea}
      />

      {selectedIdea && (
        <ViewIdeaModal
          idea={selectedIdea}
          onClose={() => setSelectedIdea(null)}
          onEdit={() => {
            setEditingIdea(selectedIdea);
            setIsAddModalOpen(true);
            setSelectedIdea(null);
          }}
          onDelete={() => handleDeleteIdea(selectedIdea.id)}
        />
      )}
    </main>
  );
}

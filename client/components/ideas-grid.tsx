"use client";

import { IdeaCard } from "./idea-card";
import type { Idea } from "../types/idea";

interface IdeasGridProps {
  ideas: Idea[];
  onSelectIdea: (idea: Idea) => void;
  onEditIdea: (idea: Idea) => void;
  onDeleteIdea: (id: string) => void;
}

export function IdeasGrid({
  ideas,
  onSelectIdea,
  onEditIdea,
  onDeleteIdea,
}: IdeasGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
      {ideas.map((idea, index) => (
        <div
          key={idea.id}
          style={{
            animation: `slideUp 0.5s ease-out ${index * 0.1}s both`,
          }}
        >
          <IdeaCard
            idea={idea}
            onSelect={() => onSelectIdea(idea)}
            onEdit={() => onEditIdea(idea)}
            onDelete={() => onDeleteIdea(idea.id)}
          />
        </div>
      ))}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

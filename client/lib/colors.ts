export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    Web: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50",
    "AI/ML": "bg-magenta-500/20 text-magenta-300 border border-magenta-500/50",
    IoT: "bg-orange-500/20 text-orange-300 border border-orange-500/50",
    Robotics: "bg-purple-500/20 text-purple-300 border border-purple-500/50",
    Research: "bg-blue-500/20 text-blue-300 border border-blue-500/50",
    Mobile: "bg-pink-500/20 text-pink-300 border border-pink-500/50",
  }
  return colors[category] || "bg-slate-800/50 text-slate-300 border border-slate-700/50"
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    ideation: "bg-blue-500/20 text-blue-300 border border-blue-500/50",
    "in-progress": "bg-yellow-500/20 text-yellow-300 border border-yellow-500/50",
    completed: "bg-green-500/20 text-green-300 border border-green-500/50",
  }
  return colors[status] || "bg-slate-800/50 text-slate-300 border border-slate-700/50"
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  status: "ideation" | "in-progress" | "completed";
  createdDate: Date;
}

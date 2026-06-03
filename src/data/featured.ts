import crypthubDemo from "../featured/crypthub/demo.png";
import expenseTrackerDemo from "../featured/expense-tracker-ai/demo.png";
import ragDemo from "../featured/rag-chat/demo.png";
import data from "./featured.json";

export interface FeaturedProject {
  title: string;
  cover: string;
  github?: string[];
  external: string;
  tech: string[];
  html: string;
  video?: string;
}

// Order matches featured.json: RAG Agent, Expense Tracker, Code Reviewer, Crypthub
// TODO: add src/featured/code-reviewer/demo.png and import it for index 2
const covers = [ragDemo, expenseTrackerDemo, crypthubDemo, crypthubDemo];

export const featuredProjects: FeaturedProject[] = data.map((item, i) => ({
  ...item,
  cover: covers[i],
}));

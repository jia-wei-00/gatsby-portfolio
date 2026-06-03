import expenseTrackerDemo from "../featured/expense-tracker-ai/demo.png";
import ragDemo from "../featured/rag-chat/demo.png";
import codeReviewDemo from "../featured/code-reviewer/demo.png";
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

// Order matches featured.json: RAG Agent, Expense Tracker, Code Reviewer
const covers = [ragDemo, expenseTrackerDemo, codeReviewDemo];

export const featuredProjects: FeaturedProject[] = data.map((item, i) => ({
  ...item,
  cover: covers[i],
}));

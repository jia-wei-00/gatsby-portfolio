import crypthubDemo from '../featured/crypthub/demo.png';
import gamefiDemo from '../featured/gamefi/demo.png';
import expenseTrackerDemo from '../featured/expense-tracker-ai/demo.png';
import data from './featured.json';

export interface FeaturedProject {
  title: string;
  cover: string;
  github?: string[];
  external: string;
  tech: string[];
  html: string;
  video?: string;
}

const covers = [expenseTrackerDemo, crypthubDemo, gamefiDemo];

export const featuredProjects: FeaturedProject[] = data.map((item, i) => ({
  ...item,
  cover: covers[i],
}));

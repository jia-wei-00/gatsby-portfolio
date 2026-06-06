import data from "./featured.json";

const covers = import.meta.glob<{ default: string }>(
  "../featured/*/demo.png",
  { eager: true },
);

export interface FeaturedProject {
  title: string;
  cover: string;
  github?: string[];
  external: string;
  tech: string[];
  html: string;
  video?: string;
}

export const featuredProjects: FeaturedProject[] = data.map((item) => ({
  ...item,
  cover: covers[item.cover]?.default ?? "",
}));

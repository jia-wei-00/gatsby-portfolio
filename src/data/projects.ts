import data from "./projects.json";

export interface Project {
  title: string;
  github?: string[];
  video?: string;
  external: string;
  tech: string[];
  html: string;
}

export const projects: Project[] = data;

import data from './jobs.json';

export interface Job {
  date: string;
  title: string;
  company: string;
  location: string;
  range: string;
  url: string;
  html: string;
}

export const jobs: Job[] = data;

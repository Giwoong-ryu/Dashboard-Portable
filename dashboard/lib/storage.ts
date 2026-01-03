import { Project } from './types';

const STORAGE_KEY = 'project-dashboard-data';

export const loadProjects = (): Project[] => {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const saveProjects = (projects: Project[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

export const exportData = (): string => {
  const projects = loadProjects();
  return JSON.stringify(projects, null, 2);
};

export const importData = (jsonString: string): Project[] => {
  try {
    const projects = JSON.parse(jsonString);
    saveProjects(projects);
    return projects;
  } catch (error) {
    throw new Error('Invalid JSON format');
  }
};

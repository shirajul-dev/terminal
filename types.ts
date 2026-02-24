import { ReactNode } from 'react';

export interface Command {
  cmd: string;
  output: ReactNode;
  time: string;
  path: string;
  host: string;
}

export enum CommandType {
  LS = 'ls',
  CD = 'cd',
  CAT = 'cat',
  CLEAR = 'clear',
  HELP = 'help',
  WHOAMI = 'whoami',
  MATRIX = 'matrix',
  THEME = 'theme',
  TOP = 'top',
  // Executables
  ABOUT = 'about',
  SKILLS = 'skills',
  PROJECTS = 'projects',
  EXPERIENCE = 'experience',
  EDUCATION = 'education',
  CONTACT = 'contact',
  SOCIAL = 'social',
  TESTIMONIALS = 'testimonials',
  UNKNOWN = 'unknown',
}

export interface FileSystemNode {
  type: 'file' | 'dir' | 'exec';
  content?: ReactNode | string;
  children?: { [key: string]: FileSystemNode };
  description?: string; // For 'ls -l' simulation if we wanted
}

export type ThemeName = 'green' | 'amber' | 'blue' | 'pink' | 'matrix';

export interface Project {
  name: string;
  description: string;
  stack: string[];
  features: string[];
  type: 'Mobile' | 'Web' | 'Backend' | 'System';
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Backend' | 'Frontend' | 'DevOps' | 'Database';
  processId: number;
  cpu: number;
  mem: number;
}

export interface Experience {
    role: string;
    company: string;
    period: string;
    description: string[];
    tech: string[];
}

export interface Education {
    degree: string;
    institution: string;
    year: string;
    details: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
}

export interface Social {
  platform: string;
  url: string;
  user: string;
}
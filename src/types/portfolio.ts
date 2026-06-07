export interface Project {
  id: number;
  title: string;
  desc: string;
  category: "frontend" | "fullstack";
  tags: string[];
  githubUrl: string;
  demoUrl: string;
  imageUrl: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  date: string;
  highlights: string[];
}

export interface Achievement {
  id: number;
  title: string;
  issuer: string;
  date: string;
  desc: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  iconName: string;
  skills: Skill[];
}

export interface Education {
  institution: string;
  degree: string;
  location: string;
  graduationYear: string;
}

export interface FocusArea {
  iconName: string;
  title: string;
  desc: string;
}

export interface Profile {
  name: string;
  role: string;
  headline: string;
  subHeadline: string;
  bioParagraphs: string[];
  education: Education;
  focusAreas: FocusArea[];
  coursework: string[];
  profileImage: string;
}

export interface SocialLink {
  name: string;
  url: string;
  iconName: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  ogImage: string;
  twitterHandle: string;
  email: string;
  phone: string;
  availability: {
    isAvailable: boolean;
    statusText: string;
    categories: string[];
  };
  heroVideo: string;
  resumePath: string;
}

export interface CaseStudy {
  projectId: number;
  overview: string;
  problemStatement: string;
  whyIBuiltIt: string;
  systemArchitecture: {
    description: string;
    diagramSteps: { title: string; desc: string }[];
  };
  features: { title: string; desc: string }[];
  technicalChallenges: { challenge: string; solution: string }[];
  lessonsLearned: string[];
  futureImprovements: string[];
  screenshots?: { src: string; caption: string }[];
  metrics?: { label: string; value: string; desc: string }[];
}

import { SkillCategory } from "../types/portfolio";

// List your technical skills here.
// Valid iconName values: 'Code' | 'BarChart2' | 'Globe' | 'Terminal' | 'Settings'
export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    title: "Programming",
    iconName: "Code",
    skills: [
      { name: "Python", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "SQL", level: 88 },
    ],
  },
  {
    id: "data",
    title: "Data Analytics",
    iconName: "BarChart2",
    skills: [
      { name: "Power BI", level: 92 },
      { name: "Looker Studio", level: 85 },
      { name: "Microsoft Excel", level: 90 },
      { name: "PostgreSQL", level: 85 },
      { name: "Exploratory Data Analysis (EDA)", level: 88 },
      { name: "KPI Monitoring", level: 85 },
      { name: "Data Cleaning", level: 90 },
    ],
  },
  {
    id: "web",
    title: "Web Development",
    iconName: "Globe",
    skills: [
      { name: "React", level: 88 },
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "REST APIs", level: 88 },
      { name: "HTML & CSS", level: 92 },
    ],
  },
  {
    id: "tools",
    title: "Tools & Platforms",
    iconName: "Terminal",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "Jupyter Notebook", level: 90 },
      { name: "Google Colab", level: 85 },
    ],
  },
];

export const currentlyExploring: string[] = [
  "Advanced React Patterns",
  "Full Stack Architecture",
  "Data Analytics",
  "AI Applications",
  "Modern Web Performance"
];

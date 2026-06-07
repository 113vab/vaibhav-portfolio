export interface Repository {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  tags: string[];
  url: string;
  updatedAt: string;
}

export const repositories: Repository[] = [
  {
    name: "campus-connect",
    description: "A full-stack university peer collaboration platform. Integrates community forums, real-time peer messaging, and a student-to-student marketplace into a single workspace.",
    stars: 12,
    forks: 4,
    language: "TypeScript",
    tags: ["React", "Express", "MongoDB", "PostgreSQL", "Socket.io"],
    url: "https://github.com/113vab/campus-connect",
    updatedAt: "June 2026",
  },
  {
    name: "sih-heritage-tourism",
    description: "Developed for Smart India Hackathon 2024. An interactive tourism exploration platform featuring location mapping, historical cultural timelines, and local artisan connections.",
    stars: 8,
    forks: 2,
    language: "JavaScript",
    tags: ["React", "Leaflet", "CSS", "REST APIs"],
    url: "https://github.com/113vab/sih-heritage-tourism",
    updatedAt: "May 2026",
  },
  {
    name: "data-analytics-insights",
    description: "Comprehensive data analytics projects containing exploratory data analysis (EDA), KPI monitoring dashboards, and PostgreSQL analytics scripts.",
    stars: 6,
    forks: 1,
    language: "Python",
    tags: ["Pandas", "Jupyter", "SQL", "Power BI", "Looker Studio"],
    url: "https://github.com/113vab/data-analytics-insights",
    updatedAt: "April 2026",
  },
  {
    name: "advanced-react-performance",
    description: "Modern web performance studies including virtualized lists, custom lazy loaders, component rendering optimization, and Framer Motion spring setups.",
    stars: 5,
    forks: 0,
    language: "TypeScript",
    tags: ["React", "Next.js", "Web Vitals", "Framer Motion"],
    url: "https://github.com/113vab/advanced-react-performance",
    updatedAt: "March 2026",
  }
];

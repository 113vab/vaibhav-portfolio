import { Project } from "../types/portfolio";

// Add, remove, or modify projects in this array.
// Categories should be either "fullstack" or "frontend".
export const projects: Project[] = [
  {
    id: 1,
    title: "Campus Connect",
    desc: "A full-stack college community platform enabling seamless student collaboration. Features include sub-community creation, real-time peer messaging, support forums, campus updates, and a student marketplace.",
    category: "fullstack",
    tags: ["React", "Node.js", "Express", "MongoDB", "PostgreSQL", "REST APIs"],
    githubUrl: "https://github.com/113vab",
    demoUrl: "https://github.com/113vab",
    // Color gradient backdrop for project card visual
    imageUrl: "bg-gradient-to-br from-red-100 via-rose-50 to-orange-100",
  },
  {
    id: 2,
    title: "SIH 2024 Heritage Tourism Platform",
    desc: "Developed for the Smart India Hackathon 2024, this interactive web platform helps travelers discover historical landmarks, local cuisines, lodging, transit details, and regional cultural insights.",
    category: "frontend",
    tags: ["React", "CSS", "REST APIs", "Map Integration", "Responsive Design"],
    githubUrl: "https://github.com/113vab",
    demoUrl: "https://github.com/113vab",
    // Color gradient backdrop for project card visual
    imageUrl: "bg-gradient-to-br from-pink-100 via-rose-50 to-amber-100",
  },
];

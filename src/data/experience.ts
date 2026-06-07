import { Experience, Achievement } from "../types/portfolio";

// List your professional work experiences and internships here.
export const experiences: Experience[] = [
  {
    id: 1,
    role: "Data Analyst Intern",
    company: "Elevate Labs",
    date: "October 2025",
    highlights: [
      "Monitored key performance indicators (KPIs) to identify business growth trends",
      "Analyzed core sales datasets to extract actionable operational metrics",
      "Built interactive Power BI dashboards to democratize data visibility",
      "Performed data cleaning and pipeline consolidation to maintain data hygiene",
      "Executed Exploratory Data Analysis (EDA) on user retention and engagement",
      "Authored professional business insights reports for cross-functional stakeholders",
    ],
  },
  {
    id: 2,
    role: "Data Visualisation Associate",
    company: "Excelerate (Powered by St. Louis University)",
    date: "June 2025",
    highlights: [
      "Wrote complex PostgreSQL queries to fetch, aggregate, and process relational data",
      "Designed real-time Looker Studio dashboards for team performance metrics",
      "Produced structured data reporting summaries to optimize resource allocation",
      "Assisted in business analytics audits to identify process bottlenecks",
      "Collaborated across design and tech departments to implement analytical standards",
    ],
  },
];

// List your awards, hackathons, and certifications here.
export const achievements: Achievement[] = [
  {
    id: 1,
    title: "Smart India Hackathon 2024 Participant",
    issuer: "Ministry of Education, Govt. of India",
    date: "2024",
    desc: "Represented Sanskriti University in developing the Heritage Tourism Platform, an interactive portal promoting regional tourism, historical site discovery, and local cultural insights.",
  },
];

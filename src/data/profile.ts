import { Profile } from "../types/portfolio";

export const profile: Profile = {
  // Your full name
  name: "Vaibhav Vishal",
  
  // Your professional role/descriptor
  role: "Computer Science Engineering Student",
  
  // Hero section main headline (first line)
  headline: "Turning Data Into Insights.",
  
  // Hero section secondary headline (gradient line)
  subHeadline: "Building Solutions That Matter.",
  
  // Biographical paragraphs rendered in the About section
  bioParagraphs: [
    "I am a Computer Science Engineering student with hands-on experience in Data Analytics, Business Intelligence, and Full-Stack Web Development. I am deeply passionate about building scalable software solutions, analyzing raw data, and solving real-world challenges through technology.",
    "By bridging the gap between web development and data tools, I construct software that is clean, practical, and insight-driven. I enjoy transforming complex problems into elegant code and helping organizations make informed, data-backed decisions."
  ],
  
  // Education coordinates
  education: {
    institution: "Sanskriti University",
    degree: "Bachelor of Technology (B.Tech) in Computer Science Engineering",
    location: "Uttar Pradesh, India",
    graduationYear: "2027",
  },
  
  // Core Focus areas cards displayed in the About section
  // Valid iconName values: 'Cpu' | 'Globe' | 'Rocket' | 'Compass' | 'Heart'
  focusAreas: [
    {
      iconName: "Cpu",
      title: "Full-Stack Web Dev",
      desc: "Designing and building scalable client-server architectures with modern web frameworks like React, Node.js, and Express.",
    },
    {
      iconName: "Globe",
      title: "Data Analytics & BI",
      desc: "Creating business intelligence reports, KPI monitoring systems, and interactive dashboards with Power BI and Looker Studio.",
    },
    {
      iconName: "Rocket",
      title: "Problem Solving",
      desc: "Passionate about algorithms, structured data query optimization, and engineering solutions to real-world challenges.",
    },
  ],
  
  // Academic coursework badges displayed in the About section
  coursework: [
    "Data Structures & Algorithms",
    "DBMS",
    "Operating Systems",
    "Computer Networks",
    "OOP",
    "Software Engineering",
    "Web Technologies",
    "Cloud Computing",
    "Artificial Intelligence",
  ],
  
  // Path to your profile portrait photo (placed in public/images/ folder)
  // Replace this file in public/images/profile.jpg to update your photo.
  profileImage: "/images/profile.jpg",
};

import { SiteConfig } from "../types/portfolio";

export const siteConfig: SiteConfig = {
  // Website title used in browser tab and SEO metadata
  title: "Vaibhav Vishal | Portfolio | Computer Science Student",
  
  // Website description used in SEO meta tags
  description: "Explore the personal portfolio of Vaibhav Vishal, a Computer Science Engineering Student passionate about software development, artificial intelligence, and cybersecurity.",
  
  // SEO Keywords for search engine discoverability
  keywords: [
    "Vaibhav Vishal",
    "Portfolio",
    "Computer Science Student",
    "CSE Student",
    "AI Learner",
    "Cybersecurity Student",
    "Software Developer Portfolio",
  ],
  
  // Author name
  author: "Vaibhav Vishal",
  
  // Path to the open graph image for social sharing (placed in public/images/ folder)
  ogImage: "/images/og-image.png",
  
  // Twitter handle
  twitterHandle: "@vaibhavvishal",

  // Direct contact details
  email: "vishalvaibhav004@gmail.com",
  phone: "+91-7488437809",

  // Availability status configuration
  availability: {
    isAvailable: true,
    statusText: "Available for opportunities",
    categories: ["Internships", "Freelance Projects", "Work Opportunities"],
  },

  // Configuration for the Hero section background video.
  // Can be a local path (e.g. "/videos/hero-background.mp4") or an external URL.
  // Replace this URL to change the animated background video of the Hero section.
  heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-loop-42217-large.mp4",

  // Path to the download resume PDF file (placed in public/resume/ folder)
  // Replace this file in public/resume/ to update your resume document.
  resumePath: "/resume/Vaibhav_Vishal_Resume.pdf",
};

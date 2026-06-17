"use client";

import { useState, useEffect } from "react";
import BackgroundGlow from "../components/BackgroundGlow";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import RecruiterSummary from "../components/RecruiterSummary";
import About from "../components/About";
import TimelineSection from "../components/Timeline";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import GithubSection from "../components/Github";
import Certifications from "../components/Certifications";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import RecruiterDashboard from "../components/RecruiterDashboard";
import CommandPalette from "../components/CommandPalette";
import DashboardVisualizations from "../components/DashboardVisualizations";

export default function Home() {
  const [recruiterMode, setRecruiterMode] = useState(false);

  useEffect(() => {
    // Check if '?recruiter=true' is in the URL search params on mount
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("recruiter") === "true") {
        setRecruiterMode(true);
      }
    }
  }, []);

  const handleExitRecruiterMode = () => {
    setRecruiterMode(false);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("recruiter");
      window.history.pushState({}, "", url.toString());
    }
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Vaibhav Vishal",
    "jobTitle": "Computer Science Engineering Student",
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Sanskriti University"
    },
    "sameAs": [
      "https://github.com/113vab"
    ],
    "email": "vaibhavvishal289@gmail.com"
  };

  return (
    <>
      {/* Person Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* Command Palette for Quick Search / Actions */}
      <CommandPalette recruiterMode={recruiterMode} setRecruiterMode={setRecruiterMode} />

      {/* Background Animated Atmosphere */}
      <BackgroundGlow />

      {/* Floating Header Navigation */}
      <Navbar recruiterMode={recruiterMode} setRecruiterMode={setRecruiterMode} />

      {/* Conditionally Render Recruiter Dashboard or Standard Portfolio Sections */}
      {recruiterMode ? (
        <RecruiterDashboard onExit={handleExitRecruiterMode} />
      ) : (
        <main className="flex-1 w-full max-w-7xl mx-auto z-10 flex flex-col">
          {/* Hero Section */}
          <Hero />

          {/* Recruiter-friendly summary card */}
          <RecruiterSummary />

          {/* About Section */}
          <About />

          {/* Career Timeline Section */}
          <TimelineSection />

          {/* Skills Section */}
          <Skills />

          {/* Projects Section */}
          <Projects />

          {/* Performance analytics & live data visualizations */}
          <DashboardVisualizations />

          {/* GitHub Repositories Showcase */}
          <GithubSection />

          {/* Certifications Section */}
          <Certifications />

          {/* Contact Section */}
          <Contact />
        </main>
      )}

      {/* Footer */}
      <Footer />
    </>
  );
}









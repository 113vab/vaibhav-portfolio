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
import AskVaibhavAI from "../components/AskVaibhavAI";
import Footer from "../components/Footer";

export default function Home() {
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

      {/* Background Animated Atmosphere */}
      <BackgroundGlow />

      {/* Floating Header Navigation */}
      <Navbar />

      {/* Single Page Layout Sections */}
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

        {/* GitHub Repositories Showcase */}
        <GithubSection />

        {/* Certifications Section */}
        <Certifications />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Floating AI Assistant Chatbox */}
      <AskVaibhavAI />

      {/* Footer */}
      <Footer />
    </>
  );
}

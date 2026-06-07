import { Metadata } from "next";
import { projects } from "../../../data/projects";
import { caseStudies } from "../../../data/caseStudies";
import CaseStudyClient from "./CaseStudyClient";
import { notFound } from "next/navigation";

// Generate static params for dynamic rendering at build time
export async function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" }
  ];
}

// Generate dynamic metadata for SEO, OpenGraph and Twitter
export async function generateMetadata(
  props: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const projectId = parseInt(params.id, 10);
  const project = projects.find((p) => p.id === projectId);
  
  if (!project) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${project.title} | Vaibhav Vishal Case Study`,
    description: project.desc,
    openGraph: {
      title: `${project.title} - Vaibhav Vishal Portfolio`,
      description: project.desc,
      url: `https://github.com/113vab/projects/${projectId}`,
      type: "website",
      images: [
        {
          url: "/images/profile.jpg",
          width: 800,
          height: 600,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} - Vaibhav Vishal Portfolio`,
      description: project.desc,
      images: ["/images/profile.jpg"],
    },
  };
}

export default async function CaseStudyPage(
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const projectId = parseInt(params.id, 10);
  const project = projects.find((p) => p.id === projectId);
  const study = caseStudies.find((s) => s.projectId === projectId);

  if (!project || !study) {
    notFound();
  }

  return <CaseStudyClient projectId={projectId} />;
}

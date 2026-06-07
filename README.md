This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## How to Update Portfolio Content

This portfolio is fully content-driven and designed for ease of maintenance. You can customize all information without touching the React/Next.js component code. 

All content schemas are defined by TypeScript interfaces located in [src/types/portfolio.ts](file:///C:/Users/visha/personal-portfolio/src/types/portfolio.ts).

### 1. General Site Configuration & Contact
To update details like website metadata, email, phone number, current availability status, background video, and resume link, modify [src/data/siteConfig.ts](file:///C:/Users/visha/personal-portfolio/src/data/siteConfig.ts).

*   **Change Hero Video**: Set the `heroVideo` variable in `siteConfig.ts` to a local video path (e.g., `/videos/new-bg.mp4`) or any public streaming link.
*   **Update Resume**: Drop your new resume PDF file into `public/resume/` and update `resumePath` in `siteConfig.ts` to point to it (e.g., `/resume/My_New_Resume.pdf`).

### 2. Profile Details & Bio
To change your name, professional title, headline text, bio paragraphs, university education records, focus areas, and academic coursework list, update [src/data/profile.ts](file:///C:/Users/visha/personal-portfolio/src/data/profile.ts).

*   **Update Profile Photo**: Drop your portrait photo named `profile.jpg` into `public/images/`. The website's welcome experience will load it dynamically via the `profileImage` configuration key in `profile.ts`. If this file is missing or invalid, a premium silhouette silhouette avatar will automatically display as a fallback.

### 3. Adding or Updating Projects
To add or modify projects displayed in the work grid, edit [src/data/projects.ts](file:///C:/Users/visha/personal-portfolio/src/data/projects.ts).
*   Each project matches the `Project` interface. You can set the category to `"fullstack"` or `"frontend"` to support automatic tab filtering.

### 4. Professional Experience & Achievements
To add internship details or award/hackathon listings, edit [src/data/experience.ts](file:///C:/Users/visha/personal-portfolio/src/data/experience.ts).
*   Add achievements under the `achievements` array (e.g., hackathons, national finals, certifications).
*   Add jobs/internships under the `experiences` array, detailing their key deliverables as a list of bullet strings.

### 5. Technical Skills & Proficiencies
To adjust your technical skills categories, lists, and level percentages, edit [src/data/skills.ts](file:///C:/Users/visha/personal-portfolio/src/data/skills.ts).
*   Allowed icon values for categories are `'Code'`, `'BarChart2'`, `'Globe'`, `'Terminal'`, and `'Settings'`.

### 6. Social Links
To modify your socials (GitHub, LinkedIn, etc.) across the website, edit [src/data/socials.ts](file:///C:/Users/visha/personal-portfolio/src/data/socials.ts).
*   Allowed icon names are `'Github'` and `'LinkedIn'`.

